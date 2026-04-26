import asyncio
from datetime import datetime

import gspread
from google.oauth2.service_account import Credentials

from config import settings

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

    # Auto-create header row if the sheet is empty
    if worksheet.row_count == 0 or worksheet.cell(1, 1).value != "Timestamp":
        worksheet.insert_row(HEADERS, index=1)

    return worksheet


def _append_sync(form: dict):
    sheet = _get_sheet()
    row = [
        datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        form["name"],
        form["email"],
         "'" + form["phone"],
        form.get("service") or "Not specified",
        form["message"],
    ]
    sheet.append_row(row, value_input_option="USER_ENTERED")


async def append_to_sheet(form: dict):
    """Non-blocking Google Sheets append using a thread pool."""
    loop = asyncio.get_event_loop()
    await loop.run_in_executor(None, _append_sync, form)
