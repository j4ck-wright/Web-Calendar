import { Icon } from "@iconify/react";

export default function HourlyWeather(props: {
  time: string;
  icon: string;
  temp: string;
}) {
  return (
    <div className='flex flex-col mx-1 items-center text-sm font-light'>
      <p className='text-lg'>{props.time}</p>
      <Icon icon={props.icon} height='3rem' className='text-4xl' />
      <p className='text-lg'>{props.temp}&deg;C</p>
    </div>
  );
}
