import React from "react"
import Error from "./components/Error"



export default function App(props : any){
    return (
        <div className="">
            {props.backendReachable != true ? (
                <Error msg="The backend server is unreachable to React. Are you sure you have enabled the Flask server? Ensure server.py is running correctly and that the uri and port is configured correctly in index.tsx, read the README for more info"/>
            ) : (
                <h2>Hello! We are reachable!</h2>
            )} 
        </div>
    )
}