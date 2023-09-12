import { useEffect, useState } from "react";
import CalendarEvent from "./CalendarEvent";
import { IuserSettings } from "../App";

export default function CalendarWidget(props: { userSettings: IuserSettings }) {
  const REFRESH_RATE_SECONDS = 60 * 10;
  const [calDataLoaded, updateCalDataLoad] = useState(false);
  const [calData, updateCalData] = useState([]);
  const [noCalendarsSelected, setNoCalendarsSelected] = useState(true);

  let selectedCalendars: string[];

  async function getCalendarEvents(
    calendars: string[],
    start: string,
    end: string
  ) {
    updateCalDataLoad(false);
    if (calendars === undefined) {
      updateCalData([]);
      updateCalDataLoad(true);
      return;
    }
    let response = await fetch("http://localhost:5000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calendars: calendars,
        start: start,
        end: end,
      }),
    });
    let data = await response.json();
    updateCalData(data);
    updateCalDataLoad(true);
  }

  function getCal() {
    let d = new Date();
    let year = d.getFullYear().toString();
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();

    if (month.length === 1) {
      month = "0" + month;
    }
    if (day.length === 1) {
      day = "0" + day;
    }

    let start = year + "-" + month + "-" + day + "T00:00:00";
    let end = year + "-" + month + "-" + day + "T23:59:59";
    getCalendarEvents(selectedCalendars, start, end);
  }

  useEffect(() => {
    let userSettings = props.userSettings;
    let displayedCalendars = userSettings.displayedCalendars;

    if (displayedCalendars === undefined) {
      setNoCalendarsSelected(true);
    } else if (displayedCalendars.length === 0) {
      setNoCalendarsSelected(true);
      updateCalDataLoad(false);
      getCal();
    } else {
      selectedCalendars = displayedCalendars;
      setNoCalendarsSelected(false);
      getCal();
    }
  }, [props.userSettings]);

  useEffect(() => {
    getCal();
    setInterval(getCal, REFRESH_RATE_SECONDS * 1000);
  }, []);

  return (
    <>
      <h3 className='italic text-center text-2xl text-slate-800 my-2 dark:text-white'>
        Your events today
      </h3>
      <div className='container relative dark:text-white'>
        <div className='h-[550px] overflow-y-scroll no-scrollbar'>
          {calDataLoaded === true ? (
            <>
              {calData.map((item) => {
                let title: string = item["title"];
                let location: string = item["location"];

                if (location == null) {
                  location = "No location set";
                } else {
                  let cutoff = location.indexOf(",");
                  location = location.slice(0, cutoff);
                }

                if (title == null) {
                  title = "Untitled Event";
                }

                let start: string = item["start"];
                if (start.length === 10) {
                  start = "Today";
                } else {
                  start = start.slice(11, 16);
                }

                let end: string = item["end"];
                if (end.length === 10) {
                  end = "All day";
                } else {
                  end = end.slice(11, 16);
                }

                return (
                  <CalendarEvent
                    title={title}
                    location={location}
                    start={start}
                    end={end}
                    key={item["id"]}
                  />
                );
              })}

              {noCalendarsSelected === true && (
                <h2 className='text-center mt-8 text-2xl opacity-80 dark:text-white'>
                  No calendars displayed
                </h2>
              )}

              {calData.length === 0 && noCalendarsSelected === false && (
                <h2 className='text-center mt-8 text-3xl opacity-80 dark:text-white'>
                  You have no events today
                </h2>
              )}
            </>
          ) : (
            <div className='flex justify-center flex-col items-center h-full'>
              <span className='loading loading-spinner loading-lg'></span>
              <h4 className='text-center text-lg italic'>
                Loading Calendar feed
              </h4>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
