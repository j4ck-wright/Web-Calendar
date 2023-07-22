import CalendarEvent from "./CalendarEvent"

export default function CalendarWidget(){

    return (
        <>
        <h3 className="italic text-center text-sm text-slate-800 my-2">Your events today</h3>
        <div className="h-[460px] max-h-[460px] overflow-y-scroll no-scrollbar after:w-full after:h-8 after:absolute after:bg-gradient-to-t after:from-white after:bottom-6 before:absolute before:bg-gradient-to-b before:from-white before:w-full before:h-6 before:z-50">
            <CalendarEvent/>
        </div>
        </>
    )
}