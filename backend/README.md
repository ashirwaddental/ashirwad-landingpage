# Ashirwad Dental Clinic — Contact Form Backend

FastAPI backend that accepts contact form submissions, sends email notifications, and logs entries to Google Sheets.

---

## Project Structure

```
ashirwad-backend/
├── main.py                  # FastAPI app & routes
├── config.py                # Env-var settings (pydantic-settings)
├── services/
│   ├── email_service.py     # Gmail SMTP notification
│   └── sheets_service.py    # Google Sheets append
├── service_account.json     # GCP service-account key (YOU create this, never commit)
├── .env                     # Your secrets (YOU create this, never commit)
├── .env.example             # Template — safe to commit
└── requirements.txt
```

---

## Setup Guide

### 1. Install dependencies

```bash
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configure Gmail (SMTP)

1. Enable **2-Step Verification** on your Google account.
2. Go to https://myaccount.google.com/apppasswords
3. Create an App Password → select **Mail** → copy the 16-character password.
4. Use that Gmail address as `SMTP_SENDER` and the app password as `SMTP_PASSWORD`.

### 3. Set up Google Sheets API

1. Go to https://console.cloud.google.com/
2. Create a project (or reuse one).
3. Enable **Google Sheets API** and **Google Drive API**.
4. Create a **Service Account** → download the JSON key → save it as `service_account.json` in this folder.
5. Open your Google Sheet → **Share** it with the service account email (looks like `xxx@xxx.iam.gserviceaccount.com`) with **Editor** access.
6. Copy the Sheet ID from the URL and set it as `GOOGLE_SHEET_ID`.

### 4. Create your .env file

```bash
cp .env.example .env
# Now edit .env with your real values
```

### 5. Run the server

```bash
uvicorn main:app --reload --port 8000
```

Visit http://localhost:8000/docs for the interactive API docs.

---

## API

### POST /contact

**Request body:**
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "phone": "+91 98765 43210",
  "message": "I'd like to book an appointment.",
  "service": "Teeth Whitening"    // optional
}
```

**Success response (200):**
```json
{
  "success": true,
  "message": "Thank you! We'll get back to you shortly."
}
```

---

## Connecting your Next.js Frontend

In your `app/contact/page.tsx` (or wherever your form lives), call:

```ts
const res = await fetch("https://your-backend-url.com/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, phone, message, service }),
});
const data = await res.json();
```

Update `ALLOWED_ORIGINS` in `main.py` with your deployed frontend URL.

---

## Deployment

You can deploy this on **Railway**, **Render**, or **Fly.io** for free:

- Set all `.env` variables as environment variables in the platform dashboard.
- Upload `service_account.json` as a secret file or encode it as a base64 env var.
- Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
