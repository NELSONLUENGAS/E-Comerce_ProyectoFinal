import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutPage from './CheckoutPage';
import NavBarGuest from "./Guest/NavBarGuest"

export default function Checkout(){
    const navigate = useNavigate()
    const Url = useSelector((state) => state.mercadoPago.url);
    const user = useSelector((state) => state.User);
    function onFinishPay(e){
        e.preventDefault();
        window.location.href = Url;
    }
    function returnToCheckout(e){
        e.preventDefault()
        navigate("/checkout-page")
    }

    return (<>
        <CheckoutPage/>
        <div style={{backgroundColor:"white",textAlign:"left",width:"50%",margin:"auto",borderRadius:"1rem",marginTop:"1rem",padding:"1rem",marginBottom:"1rem"}}>
        <h1 style={{textAlign:"center"}}>Envio</h1>
        <h5>Contacto: {user.name} {user.lastname}</h5>
        <h5>Forma de envio: Envio a domicilio</h5>
        <h5>Domicilio de entrega: {user.direction.direction},{user.direction.city},{user.direction.province}</h5>

        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"1rem",justifyContent:"center",width:"50%",margin:"auto",alignItems:"center"}}>
            <button style={{color:'white',backgroundColor:"#3483fa",border:"transparent",borderRadius: "0.5em",height: "50px",padding:"0.5rem",width:"30%"}} onClick={onFinishPay}>Pagar con Mercadopago</button>
            <button  style={{color:'#3483fa',backgroundColor:"rgba(65,137,230,.15)",border:"transparent",borderRadius: "0.5em",height: "50px",padding:"0.5rem",width:"10%"}} onClick={returnToCheckout}>Volver</button>
        </div>
        </>
    )
}
