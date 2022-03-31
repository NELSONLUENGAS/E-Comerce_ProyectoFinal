/////////////////
//Card de los productos
////////////
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../actions';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Rating } from '@mui/material';


const useStyles = makeStyles((theme) => ({
  formatoDescription:{
    position: "center"
    
  },
  root: {
    maxWidth: 345,
  },
  action:{
    marginTop: "0.5rem"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function Product({key,  name, image, producType, price, rating, description}) {
  const Dispatch = useDispatch()
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [item]= useState({
    key: key,
    name:name,
    image: image,
    producType: producType,
    price: price,
    rating: rating
  })

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  const AddToBasket = () =>{

    Dispatch(addToBasket(item))
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <Typography
              className={classes.action}
              variant='h5'
              color='textSecondary'
          >
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
      <CardActions disableSpacing>
      <IconButton aria-label="add to Cart">
          <AddShoppingCartIcon fontSize='large' onClick={AddToBasket} />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
        </IconButton>
      </CardActions>
      {/* {
        accounting.formatMoney({price},"US")
      }      */}
      {`$ ${Intl.NumberFormat('es-ES').format(price)}`}
    </Card>
  );
}
