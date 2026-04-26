from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # ── Email (Gmail SMTP) ────────────────────────────────────────────────────
    # The Gmail address you'll use to SEND notifications
    SMTP_SENDER: str

    # Gmail App Password (NOT your real Gmail password).
    # Generate at: https://myaccount.google.com/apppasswords
    SMTP_PASSWORD: str

    # The clinic's email address that RECEIVES the notifications
    CLINIC_EMAIL: str

    # ── Google Sheets ─────────────────────────────────────────────────────────
    # Path to the service-account JSON key file you downloaded from GCP
    GOOGLE_SERVICE_ACCOUNT_FILE: str = "service_account.json"

    # The ID from your Google Sheet URL:
    # https://docs.google.com/spreadsheets/d/<THIS_PART>/edit
    GOOGLE_SHEET_ID: str

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
