import os
import json
import requests
from dotenv import load_dotenv

load_dotenv()

WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")


def get_forecast_icon(weather_code: int, is_day: bool) -> str:
    """Reads weatherIcons.json, and fetches appropriate icon"""
    try:
        f = open("weatherIcons.json")
    except OSError as err:
        return "wi-thermometer"  # Default icon

    data = json.load(f)

    for icon in data["icons"]:
        if icon["code"] != weather_code:
            continue
        if is_day:
            return icon["day"]
        return icon["night"]


def sanitise_forecast_json(ctx: str, starting_hour: int) -> list[dict]:
    """Returns only wanted info for weather widget"""

    daily = ctx["forecast"]["forecastday"]

    upcoming_three_hrs = []
    for i in range(0, 3):
        day = daily[0]
        hour_index = starting_hour + i
        if hour_index + i >= 24:
            hour_index -= 24
            day = daily[1]

        hour_ctx = day["hour"][hour_index]

        time = hour_ctx["time"][-5:]
        temp = round(hour_ctx["temp_c"])
        is_day = hour_ctx["is_day"]
        icon = get_forecast_icon(hour_ctx["condition"]["code"], is_day)

        upcoming_three_hrs.append(
            {"time": time, "icon": icon, "temperature_in_C": temp}
        )

    return upcoming_three_hrs


def invoke_external_api(lat: float, lon: float, days: int) -> json:
    try:
        url = f"http://api.weatherapi.com/v1/forecast.json?key={WEATHER_API_KEY}&q={lat},{lon}&days={days}&aqi=no&alerts=no"
        response = requests.get(url)
    except Exception as e:
        raise RuntimeError("Error getting weather API")

    if response.status_code != 200:
        raise RuntimeError(f"Weather API not OK (code {response.status_code})")

    return response.json()


def get_astro_times(lat: float, lon: float) -> dict:
    response = invoke_external_api(lat, lon, 1)
    return response["forecast"]["forecastday"][0]["astro"]


def get_next_three_hour_forecast(starting_hour: int, lat: float, lon: float) -> dict:
    response = invoke_external_api(lat, lon, 3)
    ctx = sanitise_forecast_json(response, starting_hour)

    return ctx
