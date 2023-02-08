import React from "react";

export default function Error(props: {msg: string}){
    return (
        <div className="text-red-700 text-center my-8 fixed z-50 w-screen h-screen">
            <h1 className="font-bold text-5xl">Oh no!</h1>
            <h2>Something's gone wrong:</h2>
            <h3 className="font-bold my-2 w-1/3 mx-auto">{props.msg}</h3>
        </div>
    )
}