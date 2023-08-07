import { useEffect, useState } from "react";
import { Icon } from '@iconify/react';
import HourlyWeather from "./HourlyWeather"

import axios, { AxiosError } from "axios";

export default function WeatherWidget(){
    
    const [time, updateTime] = useState("");
    const [weatherData, updateWeather] = useState([])
    const [astroData, updateAstro] = useState<{[key: string]: string}>({});
    const [weatherLoaded, updateWeatherLoaded] = useState(false)
    const [weatherErrorMsg, updateWeatherErrorMsg] = useState("")    

    let prevHour: number;
    let prevDay: number;


    function getWeather(currentHour: number) {
        axios.get("http://localhost:5000/weather?lat=53.8008&lon=-1.548567&starting_hour=" + currentHour)
        .then((response) => {
            updateWeather(response.data)
            updateWeatherLoaded(true)
        }).catch((error: AxiosError) => {
            console.log("weather error");
            updateWeatherErrorMsg("Weather - " + error.message)
        })   
    }

    function getAstro(currentHour: number) {
        axios.get("http://localhost:5000/astro?lat=53.8008&lon=-1.548567")
        .then((response) => {
            updateAstro(response.data)
            
        }).catch((error: AxiosError) => {
            updateWeatherErrorMsg("Astro - " + error.message)
        })   
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
                 getAstro(0)
            }

            updateTime(formattedTime)
        }, 1000);

        return () => clearInterval(interval)
    }, [])

    
    return (
        <>
        { weatherLoaded ?
            <>
                <div className="relative flex items-center mt-2 mr-2 dark:text-white">
                    <div className="flex items-center mr-2 after:w-[1px] after:h-4/5 after:top-[10%] after:right-[167px] after:bg-black after:absolute after:dark:bg-white">
                        <div className="container mr-1">
                            <p className="font-bold capitalize text-2xl">Leeds</p>
                            <p className="text-center text-xl">{time}</p>
                        </div>
                        <div className="suntimes flex-col items-center">
                            <div className="surnise flex">
                                <Icon icon="wi:sunrise" height="1.5rem"  className="text-xl"/><span className="text-lg">{astroData["sunrise"]}</span>
                            </div>
                            <div className="sunset flex">
                                <Icon icon="wi:sunset" height="1.5rem" className="text-xl"/><span className="text-lg">{astroData["sunset"]}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        {weatherData.map(item => {
                            let time = item["time"]
                            let icon = item["icon"]
                            let temp = item["temperature_in_C"]
                            return <HourlyWeather time={time} icon={icon} temp={temp} key={time}/>
                        })}
                    </div>
                </div>
        </>
        :
        <div className="flex flex-col items-center">
            {!weatherErrorMsg ?
            <>
                <h2 className="text-center w-60">Loading weather</h2>
                <span className="loading loading-ring loading-md"></span>
            </> :
                <h2 className="text-red max-w-[200px]">{weatherErrorMsg}</h2>
            }
            
        </div>
        }
        </>
    )
}
