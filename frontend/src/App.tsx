import { useEffect } from 'react';
import axios from 'axios'

// Example of axios connecting to backend successfully
/*
const url = "http://localhost:5000/status";

function getData() {
  axios({
    method: "GET",
    url:url,
  })
  .then((response: any) => {
    const res =response.data
    console.log("success!")
    console.log(res)
  }).catch((error: any) => {
    if (error.response) {
      console.log(error.response)
      console.log(error.response.status)
      console.log(error.response.headers)
      }
  })}
*/

const App = () => {

  useEffect(() => {
    //getData()
  }, [])

  return (
    <p className='text-red-800 bold text-4xl text-center py-6'>Hello React!</p>
  );
}

export default App
