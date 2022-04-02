import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import RegistroForm from './RegistroForm';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    background: "#e5e5e5",
},
}));

function Registro() {
  const classes = useStyles();
  return (
        <div className= {classes.container}>
          
          <RegistroForm/>
        </div>
  )
}

export default Registro