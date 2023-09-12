import { Icon } from "@iconify/react";
import { MouseEventHandler, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

export default function ConfigModal(props: {
  closeBtn: any;
  updateSettings: any;
}) {
  const [calendars, setCalendars] = useState([]);
  const [calendarsUpdated, setCalendarsUpdated] = useState(false);

  const [calendarsToUse, updateCalendarsToUse] = useState([] as boolean[]);

  useEffect(() => {
    async function getCalendarNames() {
      const calendarInfo = await axios.get("http://localhost:5000/calendars");
      const data = await calendarInfo.data;
      setCalendars(data);
      setCalendarsUpdated(true);
      updateCalendarsToUse(new Array(data.length).fill(false));
    }
    getCalendarNames();
  }, []);

  return (
    <>
      <div className='w-screen h-screen bg-black/60 absolute top-0 z-50'>
        <div className='container w-[65%] h-2/5 bg-white rounded-2xl px-6 py-4 mx-auto translate-y-1/2'>
          <button
            className='text-3xl text-red-400 absolute right-4'
            onClick={props.closeBtn}
          >
            <Icon icon='material-symbols:close' />
          </button>
          <div className='content pt-10 pb-6'>
            <h1 className='font-bold text-xl'>Filter Calendars</h1>
            <p>Select which calendars you would like displayed</p>
            {!calendarsUpdated ? (
              <span className='loading loading-md loading-bars'></span>
            ) : (
              <>
                {calendars.map((item: string, index) => (
                  <label className='label cursor-pointer py-1 w-2/3' key={item}>
                    <span className='label-text'>{item}</span>
                    <input
                      type='checkbox'
                      className='checkbox'
                      onChange={(e) => {
                        let currentState = calendarsToUse;
                        currentState[index] = e.target.checked;
                        updateCalendarsToUse(currentState);
                      }}
                    />
                  </label>
                ))}
              </>
            )}
          </div>
          <button
            onClick={() => {
              props.updateSettings({
                displayedCalendars: calendars.filter(
                  (calName, index) => calendarsToUse[index] === true
                ),
              });

              props.closeBtn();
            }}
            className='bg-blue-400 p-1 w-40 rounded-lg text-white font-bold'
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
