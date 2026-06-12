import logging

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import uvicorn

from services.email_service import send_email_notification
from services.sheets_service import append_to_sheet

# ─── LOGGING ───────────────────────────────────────────────────────────────────
# Without this, every email/Sheets failure was swallowed silently, which is why
# submissions "disappeared" with no trace. Now the real cause shows up in logs.
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger("ashirwad.contact")

app = FastAPI(
    title="Ashirwad Dental Clinic - Contact API",
    description="Backend API for handling contact form submissions",
    version="1.0.0"
)

# ─── CORS ────────────────────────────────────────────────────────────────────
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://ashirwaddentalclinic.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,  # ← use the variable, not a raw URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── MODELS ──────────────────────────────────────────────────────────────────
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str
    service: str | None = None   # optional: which service they're enquiring about


# ─── ROUTES ──────────────────────────────────────────────────────────────────
@app.get("/")
def health_check():
    return {"status": "ok", "message": "Ashirwad Dental Clinic API is running"}


@app.post("/contact")
async def submit_contact(form: ContactForm):
    """
    Accepts contact form data.

    The Google Sheet is the system of record (where the submission is *stored*),
    so a Sheets failure is treated as a hard failure and reported back to the
    client. The email is a best-effort notification: if it fails we log it but
    still consider the submission successful as long as it was stored.
    """
    payload = form.model_dump()
    logger.info("New contact submission from %s <%s>", payload["name"], payload["email"])

    # 1. Save to Google Sheets (primary storage — must succeed).
    try:
        await append_to_sheet(payload)
        logger.info("Stored submission in Google Sheets for %s", payload["email"])
    except Exception:
        # exc_info=True logs the full traceback so the real root cause is visible
        # (bad credentials, sheet not shared with the service account, wrong
        #  GOOGLE_SHEET_ID, Sheets/Drive API not enabled, quota, etc.).
        logger.exception("Google Sheets storage FAILED for %s", payload["email"])
        raise HTTPException(
            status_code=500,
            detail="We couldn't save your request right now. Please try again or call us directly.",
        )

    # 2. Send email notification (best-effort — failure must not lose the lead).
    email_ok = True
    try:
        await send_email_notification(payload)
        logger.info("Sent email notification for %s", payload["email"])
    except Exception:
        email_ok = False
        logger.exception("Email notification FAILED for %s", payload["email"])

    return {
        "success": True,
        "message": "Thank you! We'll get back to you shortly.",
        "warnings": None if email_ok else ["Email notification could not be sent."],
    }


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
