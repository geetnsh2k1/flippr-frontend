import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Message from "./Message"
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom'

export default function Content() {

    axios.defaults.headers.common["Authorization"] = `AuthToken ${localStorage.getItem('access_token')}`

    const state = useSelector((state) => state)

    const [data, setData] = useState(null);

    function fetch() {
        if(localStorage.getItem('access_token')) {
            axios({
                method: "GET", 
                url: "http://127.0.0.1:8000/auth/google/"
            })
            .then(res => {
                console.log(res.data)
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })   
        }
    }
    // const setDriver = ()=>{
    //     let user = state.UserReducer.user;
    // }
    // const setDealer = ()=>{
    //     let user = state.UserReducer.user;
    // }
    useEffect(() => {
        console.log("Hola")
        fetch()
    }, [state.UserReducer.isAuthenticated]);
    
    return (
        <div>
            {
                state.UserReducer.register ? <Message message={"You have been successfully registered."}></Message> : ""
            }
            {state.UserReducer.isAuthenticated ? 

                data ? 
                    data['Result'] === "Show both options" ?  
                    <>
                    Choose between dealer and driver.<br/><br/>
                        <Link to='/driverform'><Button type="submit" variant="contained" color="secondary">Driver</Button></Link>
                        <Link to='/dealerform'><Button type="submit" variant="contained" color="primary">Dealer</Button></Link>
                    </> 
                    : 
                    <>
                        {
                            data['Result'] === "driver" ? <Redirect to='/driver'/> : <Redirect to='/dealer'/>
                        }
                    </>
                 : "Not Present"

                :
                <>
                    Please, login
                </>  
            }
            
        </div>
    )
}
