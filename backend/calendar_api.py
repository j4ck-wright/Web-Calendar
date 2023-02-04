import datetime
import json
import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

#[calendar name: calendar id] dict
cal_name_id_storage = {}

SCOPES = ['https://www.googleapis.com/auth/calendar']

def authenticate():
    if os.path.exists('token.json'):
        creds = get_credentials()
    # User login:
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Saving credentials:
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

def get_credentials():
    return Credentials.from_authorized_user_file('token.json', SCOPES)

def get_events(end_date, start_date = datetime.datetime.now(), max_results = 50, calendar_id="primary"):
    """Gets events from a single calendar (default the users primary calendar)

    Args:
        end_date (datetime): ending datetime of results.
        start_date (datetime, optional): starting datetime of results. Defaults to datetime.datetime.now().
        max_results (integer, optional): maximum number of results to display. Defaults to 100.
        calendar_id (integer, string, optional): calendar id to fetch events. Defaults to 'Primary'.
    
    Returns:
        list: a list of event objects
    """

    try:
        service = build('calendar', 'v3', credentials=get_credentials())

        print(start_date)
        print(end_date)
        print("=============")

        events_result = service.events().list( calendarId='primary',
                                               timeMin=start_date,
                                               timeMax=end_date,
                                               maxResults=max_results,
                                               singleEvents=True,
                                               orderBy='startTime').execute()

        events = events_result.get('items', [])

        if not events:
            print('No upcoming events found.')
            return {}
        
        event_dic = {}

        for event in events:
            try:
                event_dic[event['id']] = {
                                            'title': event['summary'],
                                            'location:': event.get('location', None),
                                            'start': event.get('start', None),
                                            'end': event.get('end', None)
                                            }
            except Exception as e:
                print("Failed compiling event into event_dic")
        
        event_json = json.dumps(event_dic)
        return event_json
    except HttpError as error:
        print('An error occurred: %s' % error)
    except Exception as e:
        print(f'Failed to get events: {repr(e)}')

def get_grouped_events(calendar_ids, end_date, start_date = datetime.datetime.now(), max_results = 50):
    """Gets events from a collection of calendars, <calendar_ids>

    Args:
        calendar_ids (dict): dictionary of calendar ids to fetch events.
        end_date (datetime): ending datetime of results.
        start_date (datetime, optional): starting datetime of results. Defaults to datetime.datetime.now().
        max_results (int, optional): maximum number of results to display. Defaults to 50.
    
    Returns:
        list: a list of event objects
    """
   
def get_calendar_id_from_name(name):
    if (cal_name_id_storage.get(name, False)):
        return cal_name_id_storage[name]
    print(f"{name} is not a valid calendar dictionary")
    return

def get_calendar_names():
    try:
        service = build('calendar', 'v3', credentials=get_credentials())
        calendar_list = service.calendarList().list().execute()
        for cal in calendar_list['items']:
            cal_name, cal_id = cal['summary'], cal['id']
            cal_name_id_storage[cal_name] = cal_id
    except Exception as e:
        print(f"Something went wrong fetching calendar names: \n {repr(e)}")

if __name__ == '__main__':
    print(("=" * 10) + " CALENDAR API " + ("=" * 10))
    print("This module should not be ran from main!!\nFor backend hosting, run <server.py> to open Flask routing\nFor more info, read the README")
    print("=" * 34)