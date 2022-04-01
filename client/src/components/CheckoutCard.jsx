/////////////////////////////////
/////Card de los productos comprados
////Se necesita cambios, pero tiene funcionalidad
/////////////////////////
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import NavBarGuest from './Guest/NavBarGuest';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';
import { Rating } from '@mui/material';
import { useDispatch} from 'react-redux';
import { RemoveToBasket } from '../actions';

const useStyles = makeStyles((theme) => ({
  formatoDescription:{
    position: "center"
    
  },
  root: {
    maxWidth: 345,
  },
  action:{
    marginTop: "1rem"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardActions: {
      display: "flex",
      justifyContent: "space-between",
      textAling: "center"
  }
}));

export default function CheckoutCard({id, name, image, producType, price, rating}) {
  
  const classes = useStyles();
  const Dispatch = useDispatch()

  const removeItems = () =>{
    Dispatch(RemoveToBasket(id))
  }
  

  return (
    <>
    <NavBarGuest/>
    <Card className={classes.root}>
      <CardHeader
        // avatar={
        //   <Avatar aria-label="recipe" className={classes.avatar}>
        //     R
        //   </Avatar>
        // }
        action={
          <Typography
              className={classes.action}
              variant='h5'
              color='textSecondary'
          >
              {`US$${price}`}
          </Typography>
      }
        title={name}
        subheader="in stock"
      />
      <CardMedia
        className={classes.media}
        image={image}
        title={name}
      />
      <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
      {producType}                      
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
      <IconButton aria-label="add to Cart">
          <AddShoppingCartIcon fontSize='large' />
        </IconButton>
        <Rating 
                       name="ready-only"
                       readOnly
                       value={rating}
                /> 


        
        <IconButton fontSize="large" onClick={removeItems}>
<DeleteIcon/>
        </IconButton>


      </CardActions>
      
    </Card>
    </>);
}
