/** @format */

import React from "react";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import accounting from "accounting";
import "./FavoritesDetail.css";

export default function ComprasDetail({
    price,id,image,name
}) {  

    return (
        
            <div key={id} className="product-favorites-detail">
                <div className="div-img-product-favorite-detail"><img src={image} alt="hola"></img></div>
                <div className="div-product-details-favorite-detail">
                    <h4>{name}</h4>
                    <h3>{accounting.formatMoney(price,"$")}</h3>
                    <h5 style={{color:"green"}}>Envio gratis</h5>
                    <button className="button-delete-favorite-detail">Eliminar</button>
                </div>
            </div> 
    );
}
