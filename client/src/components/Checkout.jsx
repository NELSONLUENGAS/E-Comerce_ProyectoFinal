/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserSigningIn, getBasket } from "../actions/index";
import { useEffect } from "react";
import CheckoutCard from "./CheckoutCard";
import NavBar from './NavBar/NavBar'
import Total from "./Total";

export default function Checkout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Url = useSelector((state) => state.mercadoPago.url);
    const user = useSelector((state) => state.User);
    const cartProducts = useSelector((state) => state.basketBack);
    
    function onFinishPay(e) {
        e.preventDefault();
        if(!Url) return navigate('/checkout-page')
        window.location.href = Url;
    }

    function returnToCheckout(e) {
        e.preventDefault();
        navigate("/checkout-page");
    }
    console.log(user.direction);
    useEffect(() => {
        dispatch(getBasket(user.email));
    }, [dispatch]);
    
    useEffect(() => {
        let inicioSesion =JSON.parse(localStorage.getItem('userData'))
        if(inicioSesion){
            console.log(inicioSesion)
            const fetchData = async () => {
                await   dispatch(getUserSigningIn({
                    'email':inicioSesion.email,
                    'password':inicioSesion.password
                }))
            }
            fetchData()
        }
    }, []);

    return (
        <>
        <NavBar/>
        {Url ? ( <>
        <div className="container-cart">
            <br/>
            <h1>Tu pedido</h1>
            <br/>
            {cartProducts.Products?.length && user.name ? (
                    <div>
                        {cartProducts.Products.map((element) => {
                            return(
                            <CheckoutCard
                                key={element.Product_Line.ProductId}
                                id={element.Product_Line.ProductId}
                                name= {element.name}
                                image= {element.image}
                                price= {element.Product_Line.price}
                                quantity={element.Product_Line.amount}
                                description={element.description}
                            />)
                        })}
                        <Total buttonContinue={false}/>
                    </div>
                    ):<div style={{fontSize:"24px",height:"300px"}}>El carrito se encuentra vacio</div>
            }
            </div>
            
            <div
                style={{
                    backgroundColor: "white",
                    textAlign: "left",
                    width: "50%",
                    margin: "auto",
                    borderRadius: "1rem",
                    marginTop: "1rem",
                    padding: "1rem",
                    marginBottom: "1rem",
                }}
            >
                <h1 style={{ textAlign: "center" }}>Envio</h1>
                <h5>
                    Contacto: {user.name} {user.lastname}
                </h5>
                <h5>Forma de envio: Envio a domicilio</h5>
                <h5>
                    Domicilio de entrega: {user?.direction[0].direction},
                    {user?.direction[0].city},{user?.direction[0].province}
                </h5>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    justifyContent: "center",
                    width: "50%",
                    margin: "auto",
                    alignItems: "center",
                }}
            >
                <button
                    style={{
                        color: "white",
                        backgroundColor: "#3483fa",
                        border: "transparent",
                        borderRadius: "0.5em",
                        height: "50px",
                        padding: "0.5rem",
                        width: "30%",
                    }}
                    onClick={onFinishPay}
                >
                    Pagar con Mercadopago
                </button>
                <button
                    style={{
                        color: "#3483fa",
                        backgroundColor: "rgba(65,137,230,.15)",
                        border: "transparent",
                        borderRadius: "0.5em",
                        height: "50px",
                        padding: "0.5rem",
                        width: "10%",
                    }}
                    onClick={returnToCheckout}
                >
                    Volver
                </button>
            </div></>):<h1>Cargando...</h1>}
        </>
    );
}
