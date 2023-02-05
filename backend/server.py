from flask import Flask, request
import calendar_api as cal_api
import datetime

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello World!"

@app.route('/get_event')
def get_event():
    cal = request.args['calendarId']
    start_date = request.args['startDate']  
    end_date = request.args['endDate']
    max_results = request.args['maxResults']

    cal_api.get_calendar_names()
    id = cal_api.get_calendar_id_from_name('Amy')
    print(id)


    #Sanitisation
    cal, start, end, max = clean_events(cal, start_date, end_date, max_results)
    return cal_api.get_events(end_date = end, start_date = start, max_results = max, calendar_id = cal)

@app.route('/get_group_event')
def get_group_event():
    cal = request.args['calendarId']
    start_date = request.args['startDate']  
    end_date = request.args['endDate']
    max_results = request.args['maxResults']

    cal, start, end, max = clean_events(cal, start_date, end_date, max_results)
    return cal_api.get_events(end_date = end, start_date = start, max_results = max, calendar_id = cal)

def sanitise_time(time_string):
    if (type(time_string) != str):
        print("time must be a string to be converted into RCF3339 standard")
        return

    time = datetime.datetime.strptime(time_string, "%Y-%m-%dT%H:%M:%S")
    return time.isoformat() + 'Z'

def sanitise_group_cals(cal_string):
    # Convert string "id1, id2, ..., idn" into [id1, id2, ..., idn] dict
    pass

def clean_events(cal, start, end, max, group_event = False):
    if (group_event):
        cal = sanitise_group_cals(cal)
    start = sanitise_time(start)
    end = sanitise_time(end)
    return cal, start, end, max


if (__name__ == '__main__'):
    app.run()