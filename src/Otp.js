import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { useContext } from 'react';
import OpenContext from './OpenContext'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actionCreators } from './state/actions/index'

import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '35ch',
    },
  },
}));

export default function OtpForm(props) {
  const classes = useStyles();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')

  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const [usernameHelperText, setUsernameHelperText] = useState('Invalid Credentials')
  const [passwordHelperText, setPasswordHelperText] = useState('Invalid Credentials')

  const {setOpen} = useContext(OpenContext)

  const [otpBtn, setOtpBtn] = useState(true)

  const dispatch = useDispatch()
  const { AUTH_LOGIN } = bindActionCreators(actionCreators, dispatch)

  const get_otp = (e) => {
      e.preventDefault();
      axios({
        method: "POST", 
        url: "http://127.0.0.1:8000/auth/send_otp/",
        data: {
          username:username,
        },
        withCredentials:true,
      })
      .then(response => {
        const data = response.data
        if(data['Status']) {
          setOtp(data['Result'])
          setOtpBtn(false)
        } else {
          alert(data['Result'])
        }
      })
      .catch(err => {
        setUsernameError(true)
      })
  }

  const login = (e) => {
    e.preventDefault();
    if(password !== otp) {
        setPasswordError(true)
        setPassword('')
        return;
    }

    axios({
        method: "POST", 
        url: "http://127.0.0.1:8000/auth/otp_login/",
        data: {
          username:username,
        },
        withCredentials:true,
      })
      .then(response => {
        const data = response.data
        if(data['Status']) {
            axios({
                method: "POST", 
                url: "http://127.0.0.1:8000/auth/login/",
                data: {
                  username:username,
                  password:data['Result']
                },
                withCredentials:true,
              })
              .then(response => {
                const data = response.data
                if(data['Status']) {
                  localStorage.setItem("access_token", data['access'])
                  localStorage.setItem("username", username)
                  AUTH_LOGIN({user:username})
                  setOpen(false)
                } else {
                  alert(data['Result'])
                }
              })
              .catch(err => {
                setUsernameError(true)
                setPasswordError(true)
                setPassword('')
              })
        } else {
          alert(data['Result'])
        }
      })
      .catch(err => {
        setUsernameError(true)
      })
  }

  return (
    <form onSubmit={login} className={classes.root} noValidate autoComplete="off">
      <div>

      { 
        usernameError ? 
        <TextField
          error
          helperText = {usernameHelperText}
          id="outlined-textarea"
          label="Username"
          placeholder="username"
          variant="outlined"
          value={username}
          onChange = {(e) => {setUsername(e.target.value)}}
        /> :
        <TextField
          id="outlined-textarea"
          label="Username"
          placeholder="username"
          variant="outlined"
          value={username}
          onChange = {(e) => {setUsername(e.target.value)}}
        /> 
      }
        <br/>
        {
            otpBtn ? <><br/>
            <Button onClick={get_otp} type="button" variant="contained" color="primary">GET OTP</Button>
            <br/></> : <></>
        }

        {
            otpBtn ? <></> : <>
                {
        passwordError ?
        <TextField
          error
          helperText = {passwordHelperText}
          id="outlined-password-input"
          label="OTP"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value = {password}
          onChange = {(e) => {setPassword(e.target.value)}}
          placeholder="otp"
        /> :
        <TextField
          id="outlined-password-input"
          label="OTP"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value = {password}
          onChange = {(e) => {setPassword(e.target.value)}}
          placeholder="otp"
        />
      }
        
        <br/><br/>
        <Button type="submit" variant="contained" color="secondary">LOGIN</Button>
            </> 
        }
      </div>
    </form>
  );
}
