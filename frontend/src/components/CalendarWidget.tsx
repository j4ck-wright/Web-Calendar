import CalendarEvent from "./CalendarEvent"

export default function CalendarWidget(){

    return (
        <>
        <h3 className="italic text-center text-sm text-slate-800 opacity-50 my-2">Your events today</h3>
        <div className="h-[460px] max-h-[460px] overflow-y-scroll">
            <CalendarEvent/>
        </div>
        </>
        
    )
}