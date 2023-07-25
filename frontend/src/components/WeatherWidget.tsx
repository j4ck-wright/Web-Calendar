import { useEffect, useState } from "react";
import { Icon } from '@iconify/react';
import HourlyWeather from "./HourlyWeather"

export default function WeatherWidget(){
    
    const [time, updateTime] = useState("");
    const [weatherData, updateWeather] = useState([])
    const [astroData, updateAstro] = useState<{[key: string]: string}>({});

    let prevHour: number;
    let prevDay: number;

    function getWeather(currentHour: number){
        fetch("http://localhost:5000/weather?lat=53.801277&lon=-1.548567&starting_hour=" + currentHour)
            .then(response => response.json())
            .then(json => updateWeather(json))
    }

    function getAstro(){
        fetch("http://localhost:5000/astro?lat=53.801277&lon=-1.548567")
            .then(response => response.json())
            .then(json => updateAstro(json));
            
    }

    useEffect(() => {
        const interval = setInterval(() => {
            let d = new Date();
            let day = d.getDay();
            let hour = d.getHours()
            let seconds = d.getSeconds()

            let formattedTime = d.toLocaleTimeString().slice(0, 5)
            if (seconds % 2 == 0){
                formattedTime = formattedTime.replace(":", " ")
            }

            if (prevHour != hour){
                prevHour = hour
                getWeather(hour)
            }

            if (prevDay != day){
                 prevDay = day
                 getAstro()
            }

            updateTime(formattedTime)
        }, 1000);

        return () => clearInterval(interval)
    }, [])

    
    return (
        <div className="relative flex items-center mt-2 mr-2">
            <div className="flex items-center mr-2 after:w-[1px] after:h-4/5 after:top-[10%] after:right-[134px] after:bg-black after:absolute">
                <div className="container mr-1">
                    <p className="font-bold capitalize text-xl">Leeds</p>
                    <p className="text-center text-sm">{time}</p>
                </div>
                <div className="suntimes flex-col items-center">
                    <div className="surnise flex">
                        <Icon icon="wi:sunrise" className="text-xl"/><span className="text-sm">{astroData["sunrise"]}</span>
                    </div>
                    <div className="sunset flex">
                        <Icon icon="wi:sunset" className="text-xl"/><span className="text-sm">{astroData["sunset"]}</span>
                    </div>
                </div>
            </div>
            <div className="flex">
                {weatherData.map(item => {
                    let time = item["time"]
                    let icon = item["icon"]
                    let temp = item["temperature_in_C"]
                    return <HourlyWeather time={time} icon={icon} temp={temp}/>
                })}
            </div>
        </div>
    )
}