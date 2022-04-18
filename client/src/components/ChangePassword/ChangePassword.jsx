import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ChangePasswordForms from './ChangePasswordForms';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    background: "#e5e5e5",
},
}));

function ChangePassword() {
  const classes = useStyles();
  return (
        <div className= {classes.container}>
          
          <ChangePasswordForms/>
        </div>
  )
}

export default ChangePassword