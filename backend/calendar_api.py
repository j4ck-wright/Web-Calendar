import os.path
import datetime

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SCOPES = ["https://www.googleapis.com/auth/calendar"]

calendar_names_to_IDs = (
    {}
)  # Pairing -> {"Holidays in United Kingdom": "en.uk#holiday@group.v.calendar.google.com", ...}


def authenticate() -> None:
    """
    Authenticates user to Calendar API for first time use when token.js is added
    Will create a new file, token.js to directory
    """
    creds = None
    if os.path.exists("token.json"):
        creds = get_credentials()
    # User login:
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
            creds = flow.run_local_server(port=0)
        # Saving credentials:
        with open("token.json", "w") as token:
            token.write(creds.to_json())


def get_credentials() -> Credentials:
    return Credentials.from_authorized_user_file("token.json", SCOPES)


def sanitise_time(time_string: str) -> str:
    """
    Check timings are in correct RCF3339 format
    """
    if type(time_string) != str:
        raise TypeError("Time must be a string to be converted into RCF3339 standard")

    time = datetime.datetime.strptime(time_string, "%Y-%m-%dT%H:%M:%S")
    return time.isoformat() + "Z"


def sanitise_calendar_data(ctx: dict) -> dict:
    """
    Only include relevent data to be returned from event data
    """
    output = {}

    output["id"] = ctx.get("id", None)
    output["title"] = ctx.get("summary", None)
    output["location"] = ctx.get("location", None)

    start = ctx.get("start", None)
    if start:
        if start.get("dateTime"):
            output["start"] = ctx["start"]["dateTime"]
        elif start["date"]:
            output["start"] = ctx["start"]["date"]

    return output


def get_all_calendar_names() -> dict[str, str]:
    """
    Puts names of calendars and their id in dictionary, calendar_names_to_IDs
    """
    try:
        service = build("calendar", "v3", credentials=get_credentials())
        calendar_list = service.calendarList().list().execute()
        for cal in calendar_list["items"]:
            calendar_names_to_IDs[cal["summary"]] = cal["id"]
    except Exception as e:
        raise RuntimeError(
            f"Something went wrong fetching calendar names: \n {repr(e)}"
        )

    return calendar_names_to_IDs


def get_events_from_calendar(
    calendar_id: int, start: str, end: str, max_results
) -> list[dict]:
    """
    Fetches event data from Google Calendar API
    """

    # Get Calendar Data
    try:
        service = build("calendar", "v3", credentials=get_credentials())

        events_result = (
            service.events()
            .list(
                calendarId=calendar_id,
                timeMin=start,
                timeMax=end,
                maxResults=max_results,
                singleEvents=True,
                orderBy="startTime",
            )
            .execute()
        )

        events = events_result.get("items", [])
    except HttpError as httpErr:
        raise HttpError(f"Http Error: {repr(httpErr)}")
    except Exception as exceptionErr:
        raise Exception(f"Failed to get events: {repr(exceptionErr)}")

    if not events:
        return  # No events found

    output = []

    for event in events:
        desired_output = sanitise_calendar_data(event)
        output.append(desired_output)

    return output


def compile_calendar_events(
    calendars: list[str], start_time: str, end_time: str, max_results=50
) -> list[dict]:
    """
    Entry point, takes list of calendar names and processes each calendar
    Returns list of events in order of date, items with no start date (i.e "All day" events, are at the top)
    """
    if len(calendar_names_to_IDs) == 0:
        get_all_calendar_names()

    compiled_calendars = []

    for calendar in calendars:
        id = calendar_names_to_IDs.get(calendar)
        if not id:
            raise RuntimeError(
                f"Attempting to fetch a calendar that cannot be found ({calendar})"
            )

        start = sanitise_time(start_time)
        end = sanitise_time(end_time)

        output = get_events_from_calendar(id, start, end, max_results)
        if (output != None):
            compiled_calendars.append(output)

    flat_list = [item for sublist in compiled_calendars for item in sublist]
    flat_list.sort(key=lambda x: x["start"])

    return flat_list


if __name__ == "__main__":
    response = input("\nCalendar API\nAuthenticate OAuth token? (y/n): ")
    if response.lower() == "y":
        authenticate()
