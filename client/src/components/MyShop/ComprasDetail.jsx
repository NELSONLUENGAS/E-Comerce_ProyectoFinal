/** @format */

import React from "react";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import accounting from "accounting";
import "./ComprasDetail.css";
import { Link, useParams } from "react-router-dom";

export default function ComprasDetail({
    UserEmail,
    total,
    status,
    id,
    Products,
    date,
    direction,updatedAt
}) {
    console.log(Products)
    const dia = updatedAt.slice(8,10)
    const mes = updatedAt.slice(5,7)
    const año = updatedAt.slice(0,4)
    const hora = updatedAt.slice(11,16)

    return (
        <div className="container-finish-shop">
            <div className="shop-details-1" >
                <div style={{display:"flex",gap:"2rem"}}><h6>{dia}-{mes}-{año} a las {hora}</h6></div> 
                <div>
                {status==='Complete' ? (<h6 style={{color:"green"}}>Estado: {status}</h6>): (<h6 style={{color:"#F3A712"}}>Estado: {status}</h6>)}
                </div>
                
            </div>
            
            <div className="shop-details-2">
            <div><p>Total de la compra: $650.000</p></div>   
            </div>
            <div className="shop-details-3">
                {Products?.map((product, index) => {
                                    return (
                                    <div key={product.id} className="product-shop">
                                        <div className="div-img-product-shop"><img src={product.image} alt="hola"></img></div>
                                        <div className="div-product-info-shop">
                                            <h6>{product.name}</h6> 
                                            <div style={{width:"200px"}}>{accounting.formatMoney(product.price *product.Product_Line.amount,"$")}</div>
                                            <div style={{width:"50px"}}>{product.Product_Line.amount } u.</div>
                                            {status==='Complete' ? (<Link  to={"/review/" + product.id} style={{ textDecoration:"none"}}><button className="button-status-shop">Opinar de este producto</button></Link>):null}
                                            </div>
                                        </div>
                                    );
                                    })}                           
            
            </div>
            

        </div>
    );
}
