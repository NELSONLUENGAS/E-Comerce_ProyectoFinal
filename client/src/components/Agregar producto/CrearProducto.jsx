import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import RegistroForm from './CrearForm';
//import Editar from '../EditarYBorrarProductos/Editar';
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
          
          <RegistroForm/>
        </div>
  )
}

export default CrearProducto
