from flask import Flask, request
import json
from flask_cors import CORS
import calendar_api as cal_api
import weather_api

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/status", methods=["HEAD"])
def status():
    return {"status": True}


# Example body:
# {
#     "calendars": ["Jack", "Jack Work"],
#     "start": "2023-07-18T00:00:00",
#     "end": "2023-07-18T23:59:59"
# }


@app.route("/events", methods=["POST"])
def events():
    ctx = request.json
    cal = ctx["calendars"]
    start = ctx["start"]
    end = ctx["end"]
    max = ctx.get("max")

    if max:
        return cal_api.compile_calendar_events(cal, start, end, max)
    return cal_api.compile_calendar_events(cal, start, end)

#Example: 
@app.route("/astro", methods=["GET"])
def astro():
    args = request.args
    lat = args.get("lat")
    lon = args.get("lon")

    return weather_api.get_astro_times(lat, lon)

#Example: localhost:5000/weather?lat=53.801277&lon=-1.548567&starting_hour=20
@app.route("/weather", methods=["GET"])
def weather():
    args = request.args
    lat = args.get("lat")
    lon = args.get("lon")
    starting_hour = int(args.get("starting_hour"))

    return weather_api.get_next_three_hour_forecast(starting_hour, lat, lon)

if __name__ == "__main__":
    app.run(host="0.0.0.0")
