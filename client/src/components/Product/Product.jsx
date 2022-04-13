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
import { useSelector, useDispatch } from "react-redux";
import { addToBasket, getBasket, addBasketBack } from "../../actions";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Rating } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Corazon from "../../svg/heart-svgrepo-com.svg";
import Cart from "../../svg/shopping-cart.svg";
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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [item] = useState({
        id: id,
        name: name,
        image: image,
        price: price,
        quantity: Number(1),
        description: description,
    });

    const user = useSelector((state) => state.User);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const AddToBasket = () => {
        if (user.email) {
            const fetchData = async () => {
                await dispatch(
                    addBasketBack({ productId: id, amount: 1 }, user.email)
                );
                await dispatch(getBasket(user.email));
            };
            fetchData();

            alert("El producto se agrego correctamente");
            console.log(id);
        } else {
            alert("Inicia sesion por favor");
            navigate("/SignIn");
            // dispatch(addToBasket(item,1));
        }
    };

    return (<>
        
        <Link 
                style={{ textDecoration: "none", color: "black"}}
                to={"/product/" + id}
            >
        <div className="container-card-product">
            
                <div className="div-img-card-product">
                    <img src={Corazon} className="heart" alt="" />
                    <img className="card-image" src={image} alt="" />
                </div>
                <div className="div-info-card-product">
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
                    <p className="price-product">
                        $ {Intl.NumberFormat("es-ES").format(price)}
                    </p>
                    <p className="cuotas-product">
                        Hasta 12 cuotas sin interes
                    </p>
                    {name.length < 45 ? (
                        <button className="button-fast-delivery-product">
                            Llega gratis hoy{" "}
                        </button>
                    ) : (
                        <p className="free-delivery-product">
                            Envio gratis
                        </p>
                    )}
                </div>
                <div className="div-name-product">
                    <p className="name-product">{name}</p>
                </div>
            <div className="add-to-cart-product" onClick={AddToBasket}>
                Agregar al carrito{" "}
                <img
                    style={{ height: "20px", marginLeft: "1rem" }}
                    src={Cart}
                    />
            </div>
            </div>
        </div>
        </Link>
        </>
    );
}
