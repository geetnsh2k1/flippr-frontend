import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { useContext } from 'react';
import OpenContext from './OpenContext'
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {actionCreators} from "./state/actions/index"

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '35ch',
    },
  },
}));

export default function SignupForm() {
  const classes = useStyles();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const [email, setEmail] = useState('')

  const [helperText, setHelperText] = useState('Confirm Password and Passwrod fields should be same.')
  const [error, setError] = useState(false)

  const [usernameError, setUsernameError] = useState(false)
  const [usernameHelperText, setUsernameHelperText] = useState('')

  const [emailError, setEmailError] = useState(false)
  const [emailHelperText, setEmailHelperText] = useState('')

  const { setOpen} = useContext(OpenContext)

  const dispatch = useDispatch()

  const { REGISTER } = bindActionCreators(actionCreators, dispatch) 

  const signup = (e) => {
    e.preventDefault();
    
    var check = false

    if(username.length < 8) {
      setUsernameError(true)
      setUsernameHelperText('Username must consist of 8 characters.')
      check = true
    }

    if(password !== confirm) {
      setError(true)
      setHelperText("Confirm Password field is not same as the Password field.")
      check = true
    }

    if(check) return

    axios({
      method: "POST", 
      url: "http://127.0.0.1:8000/auth/signup/",
      data: {
        username: username,
        email: email,
        password: password, 
        confirm: confirm
      }
    })
    .then(res => {
      const data = res.data
      if(data['Status']) {
        REGISTER({})
        setOpen(false)
      } else {
        if(data['Result'] === 'Username') {
          setUsernameError(true)
          setUsernameHelperText("Username already exists")
          setEmailError(false)
          setEmailHelperText("")
        } else {
          setUsernameError(false)
          setUsernameHelperText("")
          setEmailError(true)
          setEmailHelperText("Email already exists")
        }
      }
    })
    .catch(err => {
      console.log(err, "why")
    })

  }

  return (
    <form onSubmit={signup} className={classes.root} noValidate autoComplete="off">
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
          value = {username}
          onChange = {(e) => {setUsername(e.target.value)}}
        /> :
        <TextField
          id="outlined-textarea"
          label="Username"
          placeholder="username"
          variant="outlined"
          value = {username}
          onChange = {(e) => {setUsername(e.target.value)}}
        /> 
      }
        <br/>
        {
        emailError ? 
        <TextField
          error
          helperText = {emailHelperText}
          id="outlined-textarea"
          label="Email"
          placeholder="Email"
          variant="outlined"
          value = {email}
          onChange = {(e) => {setEmail(e.target.value)}}
        /> :
        <TextField
          id="outlined-textarea"
          label="Email"
          placeholder="Email"
          variant="outlined"
          value = {email}
          onChange = {(e) => {setEmail(e.target.value)}}
        /> 
      }
      <br/>
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          placeholder="password"
          value = {password}
          onChange = {(e) => {setPassword(e.target.value)}}
        />
        <br/>

        {error ? <TextField
          error
          helperText={helperText}
          id="outlined-confirm-password-input"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          placeholder="confirm password"
          value = {confirm}
          onChange = {(e) => {setConfirm(e.target.value)}}
        /> : <TextField
        helperText={helperText}
        id="outlined-confirm-password-input"
        label="Confirm Password"
        type="password"
        autoComplete="current-password"
        variant="outlined"
        placeholder="confirm password"
        value = {confirm}
        onChange = {(e) => {setConfirm(e.target.value)}}
      /> }

        <br/><br/>
        <Button type="submit" variant="contained" color="primary">SIGNUP</Button>
      </div>
    </form>
  );
}