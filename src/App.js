import React, { useEffect } from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./AppBar"
import { useSelector, useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { actionCreators } from "./state/actions/index"
import axios from "axios";

import jwt from 'jwt-decode'
import {BrowserRouter as  Router, Switch, Route } from 'react-router-dom';

import Content from "./Content"
import DriverForm from "./driverform"
import DealerForm from "./dealerForm"
import Dealer from "./Dealer"
import Driver from "./Driver"

function App() {

  const state = useSelector((state) => state)

  const dispatch = useDispatch()
  const { AUTH_LOGIN, AUTH_LOGOUT } = bindActionCreators(actionCreators, dispatch)

  useEffect(() => {
    console.log(state)
    const token = localStorage.getItem('access_token')
    if(token != null) {
      const decode = jwt(token)
      axios({
        method: "POST", 
        url: "http://127.0.0.1/auth/verify/",
        data: {
          token: token
        },
        withCredentials: true
      })
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        axios({
          method: "GET",
          url: "http://127.0.0.1/auth/refresh/",
          withCredentials: true,
        })
        .then(response => {
          const data = response.data
          localStorage.setItem('access_token', data['access'])
        })
        .catch(err => {
          console.log(err)
        })
      })
      AUTH_LOGIN({user:decode['username']})
    } else {
      console.log("HOLA")
      AUTH_LOGOUT({})
    }
  }, [])

  return (
    <>
    <Router>
      <Header></Header>
      <Switch>

        <Route exact path="/" component={Content}/>

        <Route exact path="/driverform" component={DriverForm}/>

        <Route exact path="/dealerform" component={DealerForm}/>

        <Route exact path="/dealer" component={Dealer}/>

        <Route exact path="/driver" component={Driver}/>

      </Switch>
    </Router>
    </>
  );
}

export default App;