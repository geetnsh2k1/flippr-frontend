import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import axios from 'axios'
export default function DealerForm(){

  axios.defaults.headers.common["Authorization"] = `AuthToken ${localStorage.getItem('access_token')}`
  const state = useSelector((state) => state)

  const [mobile,setMobile] = useState("") 
  const [material,setMaterial] = useState("") 
  const [quantity,setQuantity] = useState("") 
  const [weight,setWeight] = useState("") 
  const [city,setCity] =useState("")
  const [stte, setStte] =useState("")
  const [redirect, setRedirect] = useState(false)
   
  function AddDealer(e) {
    e.preventDefault();
    if(mobile && material && quantity && weight && city && state ) {
      const token = localStorage.getItem('access_token')  
      axios({
            method: "POST",
            url: "http://127.0.0.1:8000/auth/create_dealer/",
            data: {
                username: state.UserReducer.user,
                mobile: mobile,
                material_type: material, 
                material_weight: weight,
                quantity: quantity,
                city: city,
                state: stte,
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
         <h1 className='text-center'>Dealer Form</h1> 
         <form onSubmit={AddDealer} className='container mt-5'>
  <div className="mb-3 col-md-6">
  <label  className="form-label">Mobile Number</label>
    <input onChange={(e)=>setMobile(e.target.value)} value={mobile} type="text" className="form-control" aria-describedby="emailHelp" />
  </div>
  <div className="mb-3 col-md-6">
    <label htmlFor="exampleInputPassword1" className="form-label">Nature of Material</label>
    <input onChange={(e)=>setMaterial(e.target.value)} value={material} type="text" className="form-control" aria-describedby="emailHelp" />
    </div>
  <div className="mb-3 col-md-6">
    <label htmlFor="exampleInputPassword1" className="form-label">Weight of Material</label>
    <input onChange={(e)=>setWeight(e.target.value)} value={weight} type="text" className="form-control" aria-describedby="emailHelp" />
  </div>
  <div className="mb-3 col-md-6">
    <label htmlFor="exampleInputPassword1" className="form-label">Quantity</label>
    <input onChange={(e)=>setQuantity(e.target.value)} value={quantity} type="text" className="form-control" aria-describedby="emailHelp" />
  </div> 
  <div className="mb-3 col-md-6">
<label htmlFor="exampleInputPassword1" className="form-label">State</label>
<input onChange={(e)=>setStte(e.target.value)} value={stte} type="text" className="form-control" aria-describedby="emailHelp" />
</div> 
<div className="mb-3 col-md-6">
<label htmlFor="exampleInputPassword1" className="form-label">City</label>
<input onChange={(e)=>setCity(e.target.value)} value={city} type="text" className="form-control" aria-describedby="emailHelp" />
</div> 
 <br/> 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>  
</div>
  </>
  }
  </>;
}