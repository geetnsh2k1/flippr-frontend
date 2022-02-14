import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function Driver(){
  
  const [data, setData] = useState("No booking")

  function fetch() {
    axios({
        method: "GET", 
        url: "http://127.0.0.1:8000/auth/get_driver/"
    })
    .then(res => {
        setData(res.data['booking'])
    })
    .catch(err => {
        console.log(err)
    })
  }

  useEffect(() => {
    fetch()
  }, []);

  return (
    <div>
<br></br>
        <div class="alert alert-primary" role="alert">
  You have a booking for a Shipment.
</div>
<div class="card w-80">
  {data}
</div>
        </div>
  )
}
