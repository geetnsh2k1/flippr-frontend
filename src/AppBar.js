import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Modal from './Modal'

import { useSelector, useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { actionCreators } from "./state/actions/index"
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Header() {
    
    const state = useSelector((state) => state)

    const classes = useStyles(); 

    const dispatch = useDispatch()
    const { AUTH_LOGOUT } = bindActionCreators(actionCreators, dispatch)
    
    const logout = () => {
      axios({
        method: "GET", 
        url: "http://127.0.0.1:8000/auth/logout/",
        withCredentials: true,
      })
      .then(response => {
        const data = response.data
        if(data['Status']) {
          localStorage.removeItem('access_token')
          localStorage.removeItem('username')
          AUTH_LOGOUT({})
        } else {
          alert(data['Result'])
        }
      })
      .catch(err => {
        console.log(err)
      })
    }

    return (
        <div className={classes.root}>

        <AppBar position="static" style={{backgroundColor:"#171717"}}>
            <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
                {
                  state.UserReducer.isAuthenticated ? state.UserReducer.user : 'UNAUTHORIZED'
                }
            </Typography>
            <div className={classes.search}>
                {
                    state.UserReducer.isAuthenticated ? 
                    <>
                      <Link onClick={logout} to='/'>LOGOUT</Link>
                        
                    </> :
                    <ButtonGroup disableElevation variant="contained">
                        <Modal backgroundColor={"#DA0037"} title={"LOGIN"} type="login"></Modal>
                        <Modal backgroundColor={"#256"} title={"OTP"} type="otp"></Modal>
                        <Modal backgroundColor={"#444444"} title={"SIGNIN"} type="signin"></Modal>
                    </ButtonGroup>
                }
            </div>
            </Toolbar>
        </AppBar>
        </div>
    );
}
