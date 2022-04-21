/** @format */

import React from "react";
import { useState,useEffect } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import accounting from "accounting";
import { useDispatch,useSelector } from "react-redux";
import "./ComprasDetail.css";
import { Link, useParams } from "react-router-dom";
import {getProductReviewByEmail} from '../../actions/index'

export default function ComprasDetail({
    UserEmail,
    total,
    status,
    id,
    Products,
    date,
    direction,updatedAt
}) {
    const dispatch=useDispatch();
    const dia = updatedAt.slice(8,10)
    const mes = updatedAt.slice(5,7)
    const año = updatedAt.slice(0,4)
    const hora = updatedAt.slice(11,16)
    const productReviewByUser = useSelector((state) => state.productReviewByEmail);
    const user = useSelector((state) => state.User);
    
    // useEffect(() => {
    //     dispatch(getProductReviewByEmail(user.email,id));
    // }, [dispatch]);

    return (
        <div className="container-finish-shop">
            <div className="shop-details-1" >
                <div style={{display:"flex",gap:"2rem"}}><h6>{dia}-{mes}-{año} a las {hora}</h6></div> 
                <div>
                {status === 'Complete' ? (<h6 style={{color:"green"}}>Estado: {status}</h6>):null}
                {status === 'Rejected' ? (<h6 style={{color:"red"}}>Estado: {status}</h6>):null}
                {status === 'In progress' ? (<h6 style={{color:"#F3A712"}}>Estado: {status}</h6>):null}
                </div>
                
            </div>
            
            <div className="shop-details-2">
            <div><p>Total de la compra: ${Intl.NumberFormat("es-ES").format(total)}</p></div>   
            </div>
            <div className="shop-details-3">
                {Products?.map((product, index) => {
                                    return (
                                    <div key={product.id} className="product-shop">
                                        <div className="div-img-product-shop"><img src={product.image} alt="hola"></img></div>
                                        <div className="div-product-info-shop">
                                        <Link  to={"/product/" + product.id} style={{textDecoration:"none",color:"#000"}}>  <h6>{product.name}</h6> </Link>
                                            <div style={{width:"200px"}}>{accounting.formatMoney(product.price *product.Product_Line.amount,"$")}</div>
                                            <div style={{width:"50px"}}>{product.Product_Line.amount } u.</div>
                                            {status==='Complete' && !productReviewByUser ? (<Link  to={"/review/" + product.id} style={{ textDecoration:"none"}}><button className="button-status-shop">Opinar de este producto</button></Link>):null}
                                            </div>
                                        </div>
                                    );
                                    })}                           
            
            </div>
            

        </div>
    );
}
