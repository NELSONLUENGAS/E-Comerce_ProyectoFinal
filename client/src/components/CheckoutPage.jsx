/** @format */

///////////////////
///Producto de la canasta
//Mapeo De Los Productos Comprados
////////////////////////
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import CheckoutCard from "./CheckoutCard.jsx";
import { useSelector } from "react-redux";
import Total from "./Total";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavBarGuest from "./Guest/NavBarGuest.jsx";
import { getMercadoPago, vaciarCarritoBack,getBasket,getUserSigningIn } from "../actions/index.js";
import "./CheckoutPage.css"

export default function CheckoutPage() {
    
    const nuevas = [
        {
            "name": "Cepillo Alisador Babyliss Pro Eléctrico Nano Titanium",
            "image": [
                "https://http2.mlstatic.com/D_NQ_NP_658652-MCO43349304753_092020-O.webp"
            ],
            "Product_Line": {
                "price": 148900,
                "amount": 84,
                "ProductId": "c13c6ccd-cf0c-4b74-9729-8d4739bf175e",
                "OrderId": 1
            }
        },
        {
            "name": "Crema Aclarante Despigmentante Intimo Piel De Oro Grande",
            "image": [
                "https://http2.mlstatic.com/D_NQ_NP_630108-MCO43682659107_102020-O.webp"
            ],
            "Product_Line": {
                "price": 49900,
                "amount": 4,
                "ProductId": "ab279fea-34f8-4bba-a1ac-0709353ae371",
                "OrderId": 1
            }
        }
    ]
    // const cartProductsLocal = useSelector((state) => state.basket);
    const cartProducts = useSelector((state) => state.basketBack);
    const user = useSelector((state) => state.User);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(cartProducts.Products);

    useEffect(()=>{
        dispatch(getBasket(user.email))
    },[dispatch])

    function vaciarCarritoLocal(e){
        let opcion = window.confirm("Esto vaciara tu carrito por completo, quieres continuar?")
        if(opcion===true){
            const fetchData = async () => {
                await dispatch(vaciarCarritoBack(user.email))
                await dispatch(getBasket(user.email))
              }
            fetchData()
            
        }
    }
    const productsMercado = cartProducts.Products?.map((element) => {
        return {
            title: element.name,
            unit_price: element.Product_Line.price,
            quantity: element.Product_Line.amount,
        };
    });
    console.log("mercadopago basket");
    console.log(productsMercado);

    function onPay(e){
        e.preventDefault();
        if(user.name){
        dispatch(getMercadoPago(productsMercado));
        navigate('/Checkout/Payment')
        } else{
            alert("Por Favor Inicie sesion")
            navigate('/SignIn')
        }
    }
    useEffect(() => {
        let inicioSesion =JSON.parse(localStorage.getItem('userData'))
        if(inicioSesion){
            console.log(inicioSesion)
            const fetchData = async () => {
                await   dispatch(getUserSigningIn({
                    'email':inicioSesion.email,
                    'password':inicioSesion.password
                }))
                await dispatch(getBasket(inicioSesion.email))
            }
            fetchData()
        }
    }, []);

    return (
        <>
            <NavBarGuest />
            <div className="container-cart">
                
                <h1>Carrito</h1>

                {cartProducts.Products? (
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
                        <button onClick={vaciarCarritoLocal} style={{color:'white',backgroundColor:"red",border:"transparent",borderRadius: "0.5em",height: "50px",padding:"0.5rem"}}>Vaciar carrito</button>
                        <Total onPay={onPay}/>
                    </div>
                    ):<div style={{fontSize:"24px",height:"300px"}}>El carrito se encuentra vacio</div>
                }
                 {/* (cartProductsLocal[0] ? (
                     <div>
                         {cartProductsLocal?.map((product) => (
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
                    ):<div style={{fontSize:"24px",height:"300px"}}>El carrito se encuentra vacio</div>)
                    :                 */}
            </div>
        </>
    );
}
