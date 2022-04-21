/** @format */

/////////////////
//Card de los productos
////////////
import React, { useState,useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { addToBasket,deleteFavorite, getBasket, addBasketBack,getFavorites,addFavorite, ControladorDeStock} from "../../actions";
import { Link, useNavigate } from "react-router-dom";
import Corazon from "../../svg/heart-svgrepo-com.svg";
import Cart from "../../svg/shopping-cart.svg";
import "./Product.css";
import Corazonlleno from "../../svg/heart-full.svg";
import toast, { Toaster } from 'react-hot-toast';

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
    discount
}) {

    const InicieSecion = () => toast.error("Por favor incia sesion",{duration: 2000,})
    const addToBaskett = () => toast.success(`Has agregado ${item.name} al carrito`,{duration: 4000,});
    const addToFavorite = () => toast.success(`Has agregado ${item.name} a favoritos`,{duration: 4000,});
    const cartProductsLocal = useSelector((state) => state.basket);
    const DeleteFavorite = () => toast.error(`Has sacado ${item.name} de tus favoritos`, {duration: 4000,})
    const NoHay = () => toast.error(`Has alcanzado el limite de stock`, {duration: 4000,})
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
  
 
    // const Cantidad = BackBasket.filter(el => el.id ==id)

    const [contador, setStateContador] = useState(1)
 
    function addfavorite(e){
        e.preventDefault()
        if(user.email){
            const userData={productId:id}
            dispatch(addFavorite(user.email,userData))
            setProductInFavorites(true);
            addToFavorite()
        } else{
               InicieSecion() 
               navigate('/SignIn')
        }
    }

    function deletefavorite(e){
        e.preventDefault()
        dispatch(deleteFavorite(user.email,id))
        setProductInFavorites(false);
        DeleteFavorite()

    }
    const user = useSelector((state) => state.User);
    const favorites = useSelector((state) => state.favorites);
    const [productInFavorites, setProductInFavorites] = useState(false)
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const AddToBasket = (e) => {
     e.preventDefault()
        if (user.email) {
            if(contador>stock){
                NoHay()
            } else if(contador<=stock){
                setStateContador(contador+1)

            const fetchData = async () => {
                await dispatch(
                    addBasketBack({ productId: id, amount: 1 }, user.email)
                );
                await dispatch(getBasket(user.email));
                
            };
            fetchData();

            addToBaskett()
            
            console.log(id);
            }
            
            
        } else if(contador<=stock){

                setStateContador(contador+1)
                dispatch(addToBasket(item,1)); 
                addToBaskett()
            // dispatch(addToBasket(item,1));
            }else{
                NoHay()
            }
    };
    
    useEffect(()=>{
        if(user.email){
            dispatch(getFavorites(user.email))
        }
    },[user])

    useEffect(()=>{
        favorites.map((item)=>{
            if (item.wishlist.ProductId=== id){
                setProductInFavorites(true)
            }
        })
    },[favorites])

    useEffect(()=>{
        localStorage.setItem('basket', JSON.stringify(cartProductsLocal));
    },[cartProductsLocal])

    return (<>
        
        
        <div className="container-card-product">
       
                {/* <div className="div-img-heart-product">
                {productInFavorites ? ( <img src={Corazonlleno} onClick={(e)=>deletefavorite(e)} style={{height: "20px",cursor:"pointer"}}alt="favorito"/>):(<img src={Corazon} onClick={(e)=>addfavorite(e)} style={{height: "20px",cursor:"pointer"}}alt="agregado en favorito"/>)}
                </div> */}
                <div className="div-img-card-product">
                <Link 
                style={{ textDecoration: "none", color: "black"}}
                to={"/product/" + id}
            >
                    <img className="card-image" src={image} alt="" />
                 </Link></div>
                <Link className="link-description"
                style={{ textDecoration: "none", color: "black"}}
                to={"/product/" + id}
            >
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

                        {discount? (<div style={{display:"flex",flexDirection:'row',height:"35px"}}><p className="price-product" style={{fontSize:"22px",color:"grey",textDecoration:"line-through"}}>
                            $ {Intl.NumberFormat("es-ES").format(price*1.25)}
                        </p>
                        
                        </div>):null}
                        

                        <p className="price-product">
                            $ {Intl.NumberFormat("es-ES").format(price)}
                            {discount? <button className="button-fast-delivery-product" > 20% off</button>:null}
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
                    
                </div>
                </Link>
                
               
                <div className="add-to-cart-product" onClick={AddToBasket}>
       
                Agregar al carrito{" "}
                <img
                    style={{ height: "20px", marginLeft: "1rem" }}
                    src={Cart}
                    />
            </div>
        </div>
        
        </>
    );
}
