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
    direction,
}) {

    return (
        <div className="container-finish-shop">
            <div className="shop-details-1" >
                <div style={{display:"flex",gap:"2rem"}}><h6>11 abril 2022</h6></div> 
                <div><h6>Total: $650.000</h6></div> 
                <div style={{display:"flex",gap:"2rem"}}>
                    <h6 style={{cursor:"pointer"}}>{UserEmail}</h6>
                </div> 
            </div>
            
            <div className="shop-details-2">
                <div>
                <h6 style={{color:"green"}}>Estado: Finalizada</h6>
                </div>                            
            </div>
            <div className="shop-details-3">
                {Products?.map((product, index) => {
                                    return (
                                    <div key={product.id} className="product-shop">
                                        <div className="div-img-product-shop"><img src={product.image} alt="hola"></img></div>
                                        <h6>{product.name}</h6> 
                                        <div style={{width:"200px"}}>{accounting.formatMoney(product.price *product.Product_Line.amount,"$")}</div>
                                        <div>{product.Product_Line.amount } u.</div>
                                        <Link  to={"/review/" + product.Product_Line.id} style={{ textDecoration:"none"}}className="button-status-shop">Opinar de este producto</Link>
                                    </div>
                                    );
                                    })}                           
            
            </div>
            

        </div>
    );
}
