import asyncio
import logging
from datetime import datetime

import gspread
from google.oauth2.service_account import Credentials

from config import settings

logger = logging.getLogger("ashirwad.sheets")

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
]

# Column headers — must match the order in _build_row()
HEADERS = ["Timestamp", "Name", "Email", "Phone", "Service", "Message"]


def _get_sheet():
    creds = Credentials.from_service_account_file(
        settings.GOOGLE_SERVICE_ACCOUNT_FILE, scopes=SCOPES
    )
    client = gspread.authorize(creds)
    spreadsheet = client.open_by_key(settings.GOOGLE_SHEET_ID)
    worksheet = spreadsheet.sheet1

    # Auto-create the header row if it isn't there yet. A brand-new sheet has an
    # empty A1, so we check the actual value rather than row_count (which gspread
    # reports as 1000 for a fresh sheet, never 0).
    if worksheet.acell("A1").value != "Timestamp":
        worksheet.insert_row(HEADERS, index=1)

    return worksheet


def _append_sync(form: dict):
    sheet = _get_sheet()
    row = [
        datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        form["name"],
        form["email"],
        "'" + form["phone"],  # leading apostrophe keeps phone as text in Sheets
        form.get("service") or "Not specified",
        form["message"],
    ]
    sheet.append_row(row, value_input_option="USER_ENTERED")
    logger.info("Appended row to Google Sheet %s", settings.GOOGLE_SHEET_ID)


async def append_to_sheet(form: dict):
    """Non-blocking Google Sheets append using a thread pool."""
    loop = asyncio.get_event_loop()
    await loop.run_in_executor(None, _append_sync, form)
