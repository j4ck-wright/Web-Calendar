import Error from "./components/Error"
import DateWidget from "./components/DateWidget"
import WeatherWidget from "./components/WeatherWidget"
import CalendarWidget from "./components/CalendarWidget"

export default function App(props : {backendReachable: boolean}){
    return (
        <div className="">
            {props.backendReachable != true ? (
                <Error msg="The backend server is unreachable to React. Are you sure you have enabled the Flask server? Ensure server.py is running correctly and that the uri and port is configured correctly in index.tsx, read the README for more info"/>
            ) : (
                <div className="h-screen w-screen  mx-auto relative">
                    <header className="flex justify-between">
                        <DateWidget/>
                        <WeatherWidget/>
                    </header>
                    <CalendarWidget/>
                </div>
            )}
        </div>
    )
}
