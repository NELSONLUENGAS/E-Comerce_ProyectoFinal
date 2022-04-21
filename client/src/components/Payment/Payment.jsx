/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserSigningIn, getBasket } from "../../actions/index";
import { useEffect } from "react";
import CheckoutCard from "../Checkout/CheckoutCard";
import NavBar from '../NavBar/NavBar'
import Total from "../Total/Total";
import './Payment.css'

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
    useEffect(() => {
        dispatch(getBasket(user.email));
    }, [dispatch]);
    
    useEffect(() => {
        let inicioSesion =JSON.parse(localStorage.getItem('userData'))
        if(inicioSesion){
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
            <h1>Tu pedido</h1>
        <div className="container-cart">
            <br/>
            
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
            
            <div className="container-delivery-payment">
                <h1 style={{ textAlign: "center" }}>Envio</h1>
                <p>
                    Contacto: {user.name} {user.lastname}
                </p>
                <p>Forma de envio: Envio a domicilio</p>
                <p>Domicilio de entrega:</p>
                <p> {user?.principalDirection[0].direction},
                    {user?.principalDirection[0].city},{user?.principalDirection[0].province},{user?.principalDirection[0].postalcode},
                    </p>
                
            </div>
            <div className="div-buttons-payment">
                <button className="button-mercadopago-payment" onClick={onFinishPay}>
                    Pagar con Mercadopago
                </button>
                <button className="button-back-payment"
                   
                    onClick={returnToCheckout}
                >
                    Volver
                </button>
            </div></>):<h1>Cargando...</h1>}
        </>
    );
}
