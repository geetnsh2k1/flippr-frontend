import React, {useState} from 'react'
import axios from 'axios'
export default function Dealer(){

  axios.defaults.headers.common["Authorization"] = `AuthToken ${localStorage.getItem('access_token')}`
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [drivers, setDrivers] = useState(null)

  function fetch() {
    if(from && to) {
      const token = localStorage.getItem('access_token')  
      axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/auth/get_drivers_list/',
        data: {
            from: from,
            to: to,
            token: token
         },
          withCredentials: true
      })
      .then((response) => {
          if(response.data['status'] === true) {
            setDrivers(response.data['names'])
          }
      })
      .catch(error => console.log(error)) 
    }
  }
  return (
    <div>
        <h1 className='text-center'>Book a Truck</h1> 
        <form className='container mt-5'>
  <div className="mb-3 col-md-6">
    <label  className="form-label">From</label>
    <input onChange={(e)=>setFrom(e.target.value)} value={from} type="email" className="form-control" aria-describedby="emailHelp" />
  </div>
  <div className="mb-3 col-md-6">
  <label  className="form-label">To</label>
    <input onChange={(e)=>setTo(e.target.value)} value={to} type="email" className="form-control" aria-describedby="emailHelp" />
  </div>
  <button type="button" onClick={fetch} className="btn btn-primary">Load</button>
</form>

    <br/><br/>

    {
      drivers ? drivers : "No Drivers"
    }

    </div>
  )
}
