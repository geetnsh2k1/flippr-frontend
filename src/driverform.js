import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import axios from 'axios'

export default function DriverForm() {

  axios.defaults.headers.common["Authorization"] = `AuthToken ${localStorage.getItem('access_token')}`
  const state = useSelector((state) => state)

  const [mobile,setMobile] = useState("") 
  const [age,setAge] = useState("") 
  const [truck,setTruck] = useState("") 
  const [capacity,setCapacity] = useState("") 
  const [transporterName,setTransporterName] = useState("") 
  const [routes,setRoutes] = useState("") 
  const [experience,setExperience] = useState("") 
  const [redirect, setRedirect] = useState(false)

  function AddDriver(e) {
    e.preventDefault();
    if(mobile && age && truck && capacity && transporterName && routes && experience ) {
      const token = localStorage.getItem('access_token')  
      axios({
            method: "POST",
            url: "http://127.0.0.1:8000/auth/create_driver/",
            data: {
                username: state.UserReducer.user,
                age: age,
                mobile: mobile,
                truck_no: truck, 
                capacity: capacity,
                transporter_name: transporterName,
                experience: experience,
                routes: routes,
                token: token,
            },
            withCredentials: true
        })
        .then((response) => {
            if(response.data['status'] === true) {
              setRedirect(true)
            }
            else alert("Failed!")
        })
        .catch(error => console.log(error))
      }
  }
return <>
  {
    redirect ? <Redirect to='/'/> : <>
    <div>
    <h1 className='text-center'> Driver Form</h1> 
    <form onSubmit={AddDriver} className='container mt-5' action='/'>
  <div className="mb-3 col-md-6">
  <label  className="form-label">Mobile Number</label>
  <input onChange={(e)=>setMobile(e.target.value)} value={mobile} type="text"  className="form-control" aria-describedby="emailHelp" />
  </div>
  <div className="mb-3 col-md-6">
  <label htmlFor="exampleInputPassword1" className="form-label">Age</label>
  <input onChange={(e)=>setAge(e.target.value)} value={age} type="text" className="form-control" aria-describedby="emailHelp" />
  </div>
  
  <div className="mb-3 col-md-6">
  <label htmlFor="exampleInputPassword1" className="form-label">Truck Number</label>
  <input onChange={(e)=>setTruck(e.target.value)} value={truck} type="text" className="form-control" aria-describedby="emailHelp" />
  </div>
  <div className="mb-3 col-md-6">
  <label htmlFor="exampleInputPassword1" className="form-label">Truck capacity</label>
  <input onChange={(e)=>setCapacity(e.target.value)} value={capacity} type="text" className="form-control" aria-describedby="emailHelp" />
  </div>
  <div className="mb-3 col-md-6">
  <label htmlFor="exampleInputPassword1" className="form-label">Transporter Name</label>
  <input onChange={(e)=>setTransporterName(e.target.value)} value={transporterName} type="text" className="form-control" aria-describedby="emailHelp" />
  </div> 
  
  <div className="mb-3 col-md-6">
  <label htmlFor="exampleInputPassword1" className="form-label">Routes</label>
  <input onChange={(e)=>setRoutes(e.target.value)} value={routes} type="text" className="form-control" aria-describedby="emailHelp" />
  </div> 
  
  <div className="mb-3 col-md-6">
  <label htmlFor="exampleInputPassword1" className="form-label">Experience</label>
  <input onChange={(e)=>setExperience(e.target.value)} value={experience} type="text" className="form-control" aria-describedby="emailHelp" />
  </div> 
  
  <br /><br />
  <button type="submit" className="btn btn-primary">Submit</button>
  </form>  
  <br/>
  </div>
  </>
  }
  </>;
}
