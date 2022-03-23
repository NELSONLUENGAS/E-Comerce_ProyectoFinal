////////////////////////////
////Mapeo de los productos
// Aunque tendriamos que hacer un filtro
//para cada categoria, luego lo hago cuando tenga tiempo
//////////////////////////
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Product from './Product';
import {products} from '../Inventario'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

export default function Products(){
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {
          products.map(product=>(
           
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>  
              <Product 
                      name={product.name}
                      image= {product.image}
                      producType={product.producType}
                      price={product.price}
                      rating={product.rating}
                      description={product.description}
                      key={product.id}
                />
            </Grid>

          ))
        }
      </Grid>
    </div>
  );
}