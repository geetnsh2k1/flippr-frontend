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

export default function LoginForm(props) {
  const classes = useStyles();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const [usernameHelperText, setUsernameHelperText] = useState('Invalid Credentials')
  const [passwordHelperText, setPasswordHelperText] = useState('Invalid Credentials')

  const {setOpen} = useContext(OpenContext)

  const dispatch = useDispatch()
  const { AUTH_LOGIN } = bindActionCreators(actionCreators, dispatch)

  const login = (e) => {
    e.preventDefault();

    axios({
      method: "POST", 
      url: "http://127.0.0.1:8000/auth/login/",
      data: {
        username:username,
        password:password
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
        passwordError ?
        <TextField
          error
          helperText = {passwordHelperText}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value = {password}
          onChange = {(e) => {setPassword(e.target.value)}}
          placeholder="password"
        /> :
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value = {password}
          onChange = {(e) => {setPassword(e.target.value)}}
          placeholder="password"
        />
      }
        
        <br/><br/>
        <Button type="submit" variant="contained" color="secondary">LOGIN</Button>
      </div>
    </form>
  );
}
