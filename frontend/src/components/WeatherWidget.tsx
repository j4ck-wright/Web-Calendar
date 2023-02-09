import React from "react"
import HourlyWeather from "./HourlyWeather"

export default function WeatherWidget(){

    return (
        <div className="relative flex items-center mt-2 mr-2">
            <div className="flex flex-col mr-2 after:w-[1px] after:h-4/5 after:top-[10%] after:left-12 after:bg-black after:absolute">
                <p className="font-medium">Leeds</p>
                <p>12:34</p>
            </div>
            <div className="flex">
                <HourlyWeather/>
                <HourlyWeather/>
                <HourlyWeather/>
            </div>
        </div>
    )
}