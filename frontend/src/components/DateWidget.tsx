import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default function DateWidget(){
    return (
       <div>
        <div className="relative ml-2 mt-2 flex items-center">
            <span className="relative text-2xl font-medium after:w-[1px] after:h-4/5 after:top-[10%] after:right-[-4px] after:bg-black after:absolute">dd</span>
            <span className="text-xl ml-2 capitalize">month</span>
        </div>
        <div className="flex items-center ml-1 my-0.5">
            <IconButton aria-label="left" size="small">
                <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3"/>
            </IconButton>
            <span className="text-sm">dd-mm-yyyy</span>
            <IconButton aria-label="right" size="small">
                <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3"/>
            </IconButton>
            <button className='mx-2 text-sm shadow-sm border border-black border-opacity-25 py-1 px-2 rounded-sm hover:bg-slate-200 transition-all' >Today</button>
        </div>
        </div>
    )
}