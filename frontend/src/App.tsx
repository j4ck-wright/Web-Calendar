import Error from "./components/Error";
import DateWidget from "./components/DateWidget";
import WeatherWidget from "./components/WeatherWidget";
import CalendarWidget from "./components/CalendarWidget";
import BottomNavbar from "./components/BottomNavbar";
import { useEffect, useState } from "react";

export interface IuserSettings {
  displayedCalendars: string[];
  //calendarColours: { [key: string]: string };
}

export default function App(props: { backendReachable: boolean }) {
  let currentState = "DAY";

  const [userSettings, changeUserSettings] = useState({} as IuserSettings);

  function updateSettings(input: IuserSettings) {
    changeUserSettings(input);
  }

  const toggleNightMode = (state: string) => {
    if (state == currentState) return;
    document.body.classList.toggle("dark");
    currentState = state;
  };

  return (
    <div className='dark:bg-gray-800 transition-colors '>
      {/* <button onClick={toggleTheme}>dark toggle</button> */}
      {props.backendReachable != true ? (
        <Error msg='The backend server is unreachable to React. Are you sure you have enabled the Flask server? Ensure server.py is running correctly and that the uri and port is configured correctly in index.tsx, read the README for more info' />
      ) : (
        <div className='h-screen w-screen  mx-auto relative'>
          <header className='flex justify-between'>
            <DateWidget />
            <WeatherWidget />
          </header>
          <CalendarWidget userSettings={userSettings} />
          <BottomNavbar updateSettings={updateSettings} />
        </div>
      )}
    </div>
  );
}
