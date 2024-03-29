import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import "./index.css";
import App from "./App";

let backendReachable = false;

try {
  const res = await axios.head(`http://localhost:5000/status`);
  if (res.status == 200) {
    backendReachable = true;
  }
} catch (error) {
  console.log("Something went wrong!");
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  //<React.StrictMode>
  <App backendReachable={backendReachable} />
  //</React.StrictMode>,
);
