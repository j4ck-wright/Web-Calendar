import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";

export default function CalendarEvent(props: {
  title: string;
  location: string;
  start: string;
  end: string;
}) {
  return (
    <div className="relative flex w-[80%] mx-auto my-2 border border-black py-1 px-2 after:content-[''] after:w-1 after:h-full after:absolute after:left-full after:top-0 after:-translate-x-full after:bg-black after:dark:bg-white dark:border-white">
      <div className='relative mr-3 after:w-[1px] after:h-4/5 after:top-[10%] after:left-[4.25rem] after:bg-black after:absolute after:dark:bg-white'>
        <p className='font-semibold text-2xl'>{props.start}</p>
        <p className='font-light text-xl absolute bottom-0.5 right-0 italic out'>
          -{props.end}
        </p>
      </div>
      <div>
        <p className='text-3xl -mb-1 capitalize'>{props.title}</p>
        <p className='text-lg italic opacity-75 capitalize'>{props.location}</p>
      </div>
      <FontAwesomeIcon
        icon={faBarsStaggered}
        className='absolute right-0 top-[50%] -translate-y-1/2 mr-4 cursor-pointer opacity-60 fa-xl'
      />
    </div>
  );
}
