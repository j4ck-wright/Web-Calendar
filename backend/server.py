from flask import Flask, request
import json
from flask_cors import CORS
import calendar_api as cal_api

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/status", methods=["GET"])
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


if __name__ == "__main__":
    app.run(host="0.0.0.0")
