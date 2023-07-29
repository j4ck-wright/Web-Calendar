


export default function DateWidget(){
    return (
        <div className="relative ml-2 mt-2 flex items-center">
            <span className="relative text-6xl font-medium after:w-[1px] after:h-4/5 after:top-[10%] after:right-[-4px] after:bg-black after:absolute">{new Date().getDate()}</span>
            <span className="text-4xl ml-2 capitalize">{new Date().toLocaleString('default', {month: "long"})}</span>
        </div>
    )
}
