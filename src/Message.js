import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actionCreators } from './state/actions/index'


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const dispatch = useDispatch()
  const { DEREGISTER } = bindActionCreators(actionCreators, dispatch)

  const handleClose = (event, reason) => {
    DEREGISTER({})
    if (reason === 'clickaway') {
      return;
    }
    
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
