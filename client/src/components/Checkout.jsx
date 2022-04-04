import React from 'react';
import { useSelector } from 'react-redux';

export default function Checkout(){
    const Url = useSelector((state) => state.mercadoPago.url);
    function onFinishPay(e){
        e.preventDefault();
        window.location.href = Url;
    }
    return (
        <div>
            <h1>MercadoPago</h1>
            <button onClick={onFinishPay}>PAGAR</button>
        </div>
    )
}