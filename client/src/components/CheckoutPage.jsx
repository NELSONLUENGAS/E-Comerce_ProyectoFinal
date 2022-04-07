/** @format */

///////////////////
///Producto de la canasta
//Mapeo De Los Productos Comprados
////////////////////////
import React from "react";
import { makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import CheckoutCard from "./CheckoutCard.jsx";
import { useSelector } from "react-redux";
import Total from "./Total";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavBarGuest from "./Guest/NavBarGuest.jsx";
import { getMercadoPago, vaciarCarrito } from "../actions/index.js";
import "./CheckoutPage.css"

export default function CheckoutPage() {
    const cartProducts = useSelector((state) => state.basket);
    const user = useSelector((state) => state.User);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(cartProducts);

    const products =  cartProducts?.map((element) =>{
        return(
            {
                "title":element.name,
                "unit_price":element.price,
                "quantity":element.quantity
            }
        )
    })
    // const products=[
    //     {"title": "nombre",
    //     "unit_price": 2000,
    //     "quantity": 2},
    //     {"title": "nombre",
    //     "unit_price": 2000,
    //     "quantity": 2},
    //     {"title": "un gel",
    //     "unit_price": 3000,
    //     "quantity": 1}
    //     ]


    function vaciarCarritoLocal(e){
        let opcion = window.confirm("Esto vaciara tu carrito por completo, quieres continuar?")
        if(opcion===true){
            dispatch(vaciarCarrito())
        }
    }
    function onPay(e){
        e.preventDefault();
        if(user.name){
        dispatch(getMercadoPago(products))
        navigate('/Checkout/Payment')
        } else{
            alert("Por Favor Inicie sesion")
            navigate('/SignIn')
        }
    }

    return (
        <>
            <NavBarGuest />
            <div className="container-cart">
                
                <h1>Carrito</h1>
                {cartProducts[0] ? (
                <div>
                    {cartProducts?.map((product) => (
                        <CheckoutCard
                            key={product.id}
                            id={product.id}
                            name= {product.name}
                            image= {product.image}
                            price= {product.price}
                            quantity={product.quantity}
                            description={product.description}
                        />
                    ))}
                    <button onClick={vaciarCarritoLocal} style={{color:'white',backgroundColor:"red",border:"transparent",borderRadius: "0.5em",height: "50px",padding:"0.5rem"}}>Vaciar carrito</button>
                    <Total onPay={onPay}/>
                </div>
                ):<div style={{fontSize:"24px",height:"300px"}}>El carrito se encuentra vacio</div>}                
                
            </div>
        </>
    );
}
