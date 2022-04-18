/** @format */

import React from "react";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {deleteFavorite,getFavorites} from '../../actions/index';
import {useSelector, useDispatch} from 'react-redux';
import accounting from "accounting";
import "./FavoritesDetail.css";

export default function ComprasDetail({
    price,id,image,name
}) {  
    const dispatch=useDispatch()
    const user = useSelector((state) => state.User);
    function handleDeleteFavorite(e,id){
        e.preventDefault()
        const fetchData = async () => {
            await dispatch(deleteFavorite(user.email,id))
            await dispatch(getFavorites(user.email));
        }
        fetchData()
        
    }

    return (
        
            <div key={id} className="product-favorites-detail">
                <div className="div-img-product-favorite-detail"><img src={image} alt="hola"></img></div>
                <div className="div-product-details-favorite-detail">
                    <h4>{name}</h4>
                    <h3>{accounting.formatMoney(price,"$")}</h3>
                    <h5 style={{color:"green"}}>Envio gratis</h5>
                    <button className="button-delete-favorite-detail" onClick={(e)=>{handleDeleteFavorite(e,id)}}>Eliminar</button>
                </div>
            </div> 
    );
}
