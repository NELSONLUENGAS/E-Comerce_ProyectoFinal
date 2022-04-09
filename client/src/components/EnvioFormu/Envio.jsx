import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import EnvioForm from './EnvioForm';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    background: "#e5e5e5",
},
}));

function Envio() {
  const classes = useStyles();
  return (
        <div className= {classes.container}>
          
          <EnvioForm/>
        </div>
  )
}

export default Envio