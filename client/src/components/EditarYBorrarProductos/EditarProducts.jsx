import React, {useEffect, useState}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import EditarProduct from './EditarProduct';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../actions';
import Paginado from '../Paginado/Paginado';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

export default function Products(){
  const classes = useStyles();
  const productos = useSelector((state) => state.products);
  
 const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProducts())
}, [dispatch])


  return (
    <div className={classes.root}>
      <h1>Hola</h1>
      <Grid container spacing={2}>
        {
          productos.map(product=>(
           
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>  
              <EditarProduct
                      name={product.name}
                      image= {product.image}
                      price={product.price}
                      stock={product.stock}
                      description={product.description}
                      id={product.id}
                />
            </Grid>

          ))
        }
      </Grid>
    
    </div>
  );
}
