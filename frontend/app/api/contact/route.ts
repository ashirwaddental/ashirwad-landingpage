import { NextRequest, NextResponse } from "next/server"
import { JWT } from "google-auth-library"
import { Resend } from "resend"

// This route replaces the old FastAPI/Render backend. It runs on Vercel as part
// of the Next.js deployment, so there's no separate server to spin down (no cold
// start) and no CORS. It does two things, mirroring the old backend:
//   1. Append the submission to Google Sheets (primary store — hard failure).
//   2. Send an email notification via Resend (best-effort — must not lose lead).
//
// Email goes through Resend's HTTPS API instead of Gmail SMTP because serverless
// hosts (Render free tier, Vercel) block outbound SMTP ports (465/587), which is
// why notifications silently stopped arriving in production.

export const runtime = "nodejs" // google-auth-library + Resend need Node, not Edge
export const dynamic = "force-dynamic"

interface ContactForm {
  name: string
  email?: string
  phone: string
  service?: string
  message: string
}

const SHEET_HEADERS = ["Timestamp", "Name", "Email", "Phone", "Service", "Message"]
// The frontend sends this when the (optional) email field is left blank.
const PLACEHOLDER_EMAIL = "noemail@placeholder.com"

// ─── Google Sheets ──────────────────────────────────────────────────────────
function getJwt(): JWT {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  // Vercel/.env store the key on one line with literal "\n"; restore real newlines.
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n")
  if (!email || !key) {
    throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY")
  }
  return new JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  })
}

function istTimestamp(): string {
  // Match the old backend's "%Y-%m-%d %H:%M:%S" in India time.
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date())
  const p = (t: string) => parts.find((x) => x.type === t)?.value ?? "00"
  return `${p("year")}-${p("month")}-${p("day")} ${p("hour")}:${p("minute")}:${p("second")}`
}

// Google's APIs are occasionally slow to connect from local dev (an IPv6/connect
// stall can blow past fetch's default 10s connect timeout). Retry transient
// network failures with a per-attempt timeout so one blip doesn't fail the lead.
async function fetchWithRetry(
  url: string,
  init: RequestInit,
  attempts = 3,
): Promise<Response> {
  let lastErr: unknown
  for (let i = 1; i <= attempts; i++) {
    try {
      return await fetch(url, { ...init, signal: AbortSignal.timeout(9000) })
    } catch (err) {
      lastErr = err
      console.warn(`[contact] Sheets request attempt ${i}/${attempts} failed:`, (err as Error)?.message)
      if (i < attempts) await new Promise((r) => setTimeout(r, 400 * i))
    }
  }
  throw lastErr
}

async function appendToSheet(form: ContactForm): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEET_ID
  if (!sheetId) throw new Error("Missing GOOGLE_SHEET_ID")

  const jwt = getJwt()
  const { token } = await jwt.getAccessToken()
  if (!token) throw new Error("Failed to obtain Google access token")

  const base = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}`
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  }

  // Ensure the header row exists (a brand-new sheet has an empty A1).
  const a1Res = await fetchWithRetry(`${base}/values/A1`, { headers })
  if (!a1Res.ok) {
    throw new Error(`Sheets read failed: ${a1Res.status} ${await a1Res.text()}`)
  }
  const a1 = (await a1Res.json()) as { values?: string[][] }
  if (a1.values?.[0]?.[0] !== "Timestamp") {
    const headerRes = await fetchWithRetry(
      `${base}/values/A1:F1?valueInputOption=USER_ENTERED`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify({ values: [SHEET_HEADERS] }),
      },
    )
    if (!headerRes.ok) {
      throw new Error(`Sheets header write failed: ${headerRes.status} ${await headerRes.text()}`)
    }
  }

  const hasRealEmail = form.email && form.email !== PLACEHOLDER_EMAIL
  const row = [
    istTimestamp(),
    form.name,
    hasRealEmail ? form.email : "",
    "'" + form.phone, // leading apostrophe keeps the phone number as text
    form.service || "Not specified",
    form.message,
  ]

  const appendRes = await fetchWithRetry(
    `${base}/values/A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ values: [row] }),
    },
  )
  if (!appendRes.ok) {
    throw new Error(`Sheets append failed: ${appendRes.status} ${await appendRes.text()}`)
  }
}

// ─── Email (Resend) ─────────────────────────────────────────────────────────
function buildHtml(form: ContactForm): string {
  const serviceRow = `<tr style="background:#f4f8ff;"><td style="padding:10px;"><b>Service Enquiry</b></td><td style="padding:10px;">${form.service || "Not specified"}</td></tr>`
  const emailDisplay =
    form.email && form.email !== PLACEHOLDER_EMAIL ? form.email : "Not provided"
  return `
  <html><body style="font-family: Arial, sans-serif; color: #333;">
    <div style="max-width:600px;margin:auto;border:1px solid #ddd;border-radius:8px;overflow:hidden;">
      <div style="background:#1a6eb5;padding:20px;text-align:center;">
        <h2 style="color:white;margin:0;">🦷 New Contact Form Submission</h2>
        <p style="color:#cce4ff;margin:4px 0 0;">Ashirwad Dental Clinic</p>
      </div>
      <div style="padding:24px;">
        <p>You have received a new enquiry. Details below:</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px;width:35%;"><b>Name</b></td><td style="padding:10px;">${form.name}</td></tr>
          <tr style="background:#f4f8ff;"><td style="padding:10px;"><b>Email</b></td><td style="padding:10px;">${emailDisplay}</td></tr>
          <tr><td style="padding:10px;"><b>Phone</b></td><td style="padding:10px;"><a href="tel:${form.phone}">${form.phone}</a></td></tr>
          ${serviceRow}
          <tr><td style="padding:10px;"><b>Message</b></td><td style="padding:10px;">${form.message}</td></tr>
          <tr style="background:#f4f8ff;"><td style="padding:10px;"><b>Received At</b></td><td style="padding:10px;">${istTimestamp()} IST</td></tr>
        </table>
      </div>
      <div style="background:#f0f0f0;padding:12px;text-align:center;font-size:12px;color:#888;">
        This email was auto-generated by the Ashirwad Dental Clinic contact form.
      </div>
    </div>
  </body></html>`
}

async function sendEmail(form: ContactForm): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error("Missing RESEND_API_KEY")
  const to = process.env.CONTACT_TO
  if (!to) throw new Error("Missing CONTACT_TO")
  const from = process.env.CONTACT_FROM || "Ashirwad Dental <onboarding@resend.dev>"

  const hasRealEmail = form.email && form.email !== PLACEHOLDER_EMAIL
  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: hasRealEmail ? form.email : undefined,
    subject: `New Contact Enquiry from ${form.name} – Ashirwad Dental`,
    html: buildHtml(form),
  })
  if (error) throw new Error(`Resend error: ${JSON.stringify(error)}`)
}

// ─── Route ──────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let form: ContactForm
  try {
    form = (await req.json()) as ContactForm
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 },
    )
  }

  if (!form?.name?.trim() || !form?.phone?.trim() || !form?.message?.trim()) {
    return NextResponse.json(
      { success: false, message: "Name, phone, and message are required." },
      { status: 400 },
    )
  }

  // 1. Save to Google Sheets (primary storage — must succeed).
  try {
    await appendToSheet(form)
  } catch (err) {
    console.error("[contact] Google Sheets storage FAILED:", err)
    return NextResponse.json(
      {
        success: false,
        message:
          "We couldn't save your request right now. Please try again or call us directly.",
      },
      { status: 500 },
    )
  }

  // 2. Send email notification (best-effort — failure must not lose the lead).
  let emailOk = true
  try {
    await sendEmail(form)
  } catch (err) {
    emailOk = false
    console.error("[contact] Email notification FAILED:", err)
  }

  return NextResponse.json({
    success: true,
    message: "Thank you! We'll get back to you shortly.",
    warnings: emailOk ? null : ["Email notification could not be sent."],
  })
}
