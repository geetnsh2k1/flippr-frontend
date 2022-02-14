import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button'

import LoginForm from './Login'

import OtpForm from './Otp'

import SignupForm from './SignUp'
import OpenContext from './OpenContext'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: "#EDF6E5",
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 8, 6),
    color:"#0A043C"
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Button color="inherit" onClick={handleOpen} style={{backgroundColor:props.backgroundColor,}} >
            {props.title}
        </Button>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={open}>
            <div className={classes.paper} align="center">
                <h2 id="transition-modal-title">{props.type.toUpperCase()}</h2>
                <OpenContext.Provider value = {{setOpen}}>
                    {
                        props.type === "login" ? <LoginForm></LoginForm> :
                          props.type === "signin" ? <SignupForm></SignupForm> : <OtpForm></OtpForm>
                    }
                </OpenContext.Provider>
            </div>
            </Fade>
        </Modal>
    </div>
  );
}
