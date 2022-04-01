/** @format */

/////////////////
//Card de los productos
////////////
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";
import { addToBasket } from "../actions";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import Corazon from "../svg/heart-svgrepo-com.svg";
import Cart from '../svg/shopping-cart.svg'
import "./Product.css";

const useStyles = makeStyles((theme) => ({
    formatoDescription: {
        position: "center",
    },
    root: {
        maxWidth: 345,
    },
    action: {
        marginTop: "0.5rem",
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
}));

export default function Product({
    id,
    stock,
    name,
    image,
    producType,
    price,
    rating,
    description,
}) {
    const Dispatch = useDispatch();
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [item] = useState({
        key: id,
        name: name,
        image: image,
        producType: producType,
        price: price,
        rating: rating,
    });

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const AddToBasket = () => {
        Dispatch(addToBasket(item));
    };

<<<<<<< Updated upstream
  return (
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
      <CardActions disableSpacing>
      <IconButton aria-label="add to Cart">
          <AddShoppingCartIcon fontSize='large' onClick={AddToBasket} />
        </IconButton>
        <Rating 
                       name="ready-only"
                       readOnly
                       value={rating}
                /> 
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
          {description}
          </Typography>
         
        </CardContent>
      </Collapse>
    </Card>
  );
=======
    return (
        <Link
            style={{ textDecoration: "none", color: "black" }}
            to={"/product/" + id}
        >
            <div className="container-card-product">
                <img src={Corazon} className="heart" alt="" />
                <img className="card-image" src={image} alt="" />
                {price < 45000 ? (
                    <button className="button-offer-product">
                        OFERTA DEL DIA
                    </button>
                ) : null}
                {stock < 13 ? (
                    <button className="button-best-seller-product">
                        MAS VENDIDO
                    </button>
                ) : null}
                <div style={{ marginLeft: "1rem" }}>
                    <p style={{ fontSize: "30px", marginTop: "1rem" }}>
                        $ {Intl.NumberFormat("es-ES").format(price)}
                    </p>
                    <p
                        style={{
                            color: "green",
                            fontSize: "12px",
                            marginTop: "-1.5rem",
                        }}
                    >
                        Hasta 12 cuotas sin interes
                    </p>
                    {name.length < 45 ? (
                        <button className="button-fast-delivery-product">
                            Llega gratis hoy{" "}
                        </button>
                    ) : (
                        <p style={{ color: "green", fontSize: "14px" }}>
                            Envio gratis
                        </p>
                    )}
                </div>
                <div style={{ marginLeft: "1rem" }}>
                    <p style={{ fontSize: "15px", marginTop: "1rem" }}>
                        {name}
                    </p>
                </div>

                <div className="add-to-cart-product">Agregar al carrito <img style={{height:"20px",marginLeft:"1rem"}} src={Cart}/></div>
            </div>
        </Link>

        // <Card className={classes.root}>
        //   <CardHeader
        //     action={
        //       <Typography
        //           className={classes.action}
        //           variant='h5'
        //           color='textSecondary'
        //       >
        //       </Typography>
        //   }
        //     title={name}
        //     subheader="in stock"
        //   />
        //   <Link to={"/product/"+id}>
        //   <CardMedia
        //     className={classes.media}
        //     image={image}
        //     title={name}
        //   />
        //   </Link>
        //   <CardContent>
        //   <Typography variant="body2" color="textSecondary" component="p">
        //   {producType}
        //     </Typography>
        //   </CardContent>
        //   <CardActions disableSpacing>
        //   <IconButton aria-label="add to Cart">
        //       <AddShoppingCartIcon fontSize='large' onClick={AddToBasket} />
        //     </IconButton>
        //     <IconButton
        //       className={clsx(classes.expand, {
        //         [classes.expandOpen]: expanded,
        //       })}
        //       onClick={handleExpandClick}
        //       aria-expanded={expanded}
        //       aria-label="show more"
        //     >
        //     </IconButton>
        //   </CardActions>
        //   {/* {
        //     accounting.formatMoney({price},"US")
        //   }      */}
        //   {`$ ${Intl.NumberFormat('es-ES').format(price)}`}
        // </Card>
    );
>>>>>>> Stashed changes
}
