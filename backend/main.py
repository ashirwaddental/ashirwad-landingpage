from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import uvicorn

from services.email_service import send_email_notification
from services.sheets_service import append_to_sheet

app = FastAPI(
    title="Ashirwad Dental Clinic - Contact API",
    description="Backend API for handling contact form submissions",
    version="1.0.0"
)

# ─── CORS ────────────────────────────────────────────────────────────────────
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://ashirwaddentalclinic.vercel.app",  # <-- Replace with your frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
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
    Accepts contact form data, sends an email notification to the clinic,
    and appends the entry to Google Sheets.
    """
    errors = []

    # 1. Send email notification
    try:
        await send_email_notification(form.model_dump())
    except Exception as e:
        errors.append(f"Email notification failed: {str(e)}")

    # 2. Save to Google Sheets
    try:
        await append_to_sheet(form.model_dump())
    except Exception as e:
        errors.append(f"Google Sheets update failed: {str(e)}")

    # If both failed, raise 500
    if len(errors) == 2:
        raise HTTPException(
            status_code=500,
            detail="Failed to process your request. Please try again later."
        )

    return {
        "success": True,
        "message": "Thank you! We'll get back to you shortly.",
        "warnings": errors if errors else None
    }


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
