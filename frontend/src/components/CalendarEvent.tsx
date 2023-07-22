import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons'

export default function CalendarEvent(){
    return (
        <div className="relative flex w-[80%] mx-auto my-2 border border-black py-1 px-2 after:content-[''] after:w-1 after:h-full after:absolute after:left-full after:top-0 after:-translate-x-full after:bg-orange-400">
            <div className="relative mr-3 after:w-[1px] after:h-4/5 after:top-[10%] after:left-[3.25rem] after:bg-black after:absolute">
                <p className="font-semibold text-lg">00:00</p>
                <p className="font-light text-sm absolute bottom-0.5 right-0 italic out">-00:00</p>
            </div>
                <div>
                    <p className="text-lg -mb-1 capitalize">event title</p>
                    <p className="text-sm italic opacity-75 capitalize">event location</p>
                </div>
            <FontAwesomeIcon icon={faBarsStaggered} className="absolute right-0 top-[50%] -translate-y-1/2 mr-4 cursor-pointer opacity-60"/>
        </div>
    )
}