import { Icon } from '@iconify/react';

export default function HourlyWeather(props: {time: string, icon: string, temp: string}){

    return (
        <div className="flex flex-col mx-1 items-center text-sm font-light">
            <p>{props.time}</p>
            <Icon icon={props.icon} className='text-4xl'/>
            <p>{props.temp}&deg;C</p>
        </div>
    )
}