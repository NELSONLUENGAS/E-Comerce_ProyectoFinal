import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CrearForm from './CrearForm';


const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    background: "#e5e5e5",
},
}));

function CrearProducto() {
  const classes = useStyles();


  return (
        <div className= {classes.container}>


          
          
          <CrearForm

          />
        </div>
  )
}

export default CrearProducto