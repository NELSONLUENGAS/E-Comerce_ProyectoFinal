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
import NavBarGuest from "./Guest/NavBarGuest.jsx";
import "./CheckoutPage.css"

export default function CheckoutPage() {
    const cartProducts = useSelector((state) => state.basket);
    console.log(cartProducts);

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

                    <Total />
                </div>
                ):<div style={{fontSize:"24px",height:"300px"}}>El carrito se encuentra vacio</div>}                
                
            </div>
        </>
    );
}
