import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default function DateWidget(){
    return (
        <div className="relative ml-2 mt-2 flex items-center">
            <span className="relative text-2xl font-medium after:w-[1px] after:h-4/5 after:top-[10%] after:right-[-4px] after:bg-black after:absolute">dd</span>
            <span className="text-xl ml-2 capitalize">month</span>
        </div>
    )
}