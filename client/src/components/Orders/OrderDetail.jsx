/** @format */

import React from "react";
import { useState } from "react";
import {useSelector,useDispatch} from 'react-redux'
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import accounting from "accounting";
import {changeStatusToComplete} from '../../actions/index'
import "./OrderDetail.css";

export default function OrderDetail({UserEmail,total, status,id,Products,date,direction,handleChangeStatus,updatedAt,name,lastname}) {
    
    const [order, setOrder] = useState({history: false,description: false,sentStatus: status})
    const fecha = updatedAt.slice(0,10)
    const hora = updatedAt.slice(11,16)
    const dispatch = useDispatch()

    function handleClickHistory(e) {
        e.preventDefault();
        setOrder({
            ...order,
            history: !order.history,
        });
    }
    function handleClickDescription(e) {
        e.preventDefault();
        setOrder({
            ...order,
            description: !order.description,
        });
    }
   

    return (
        <div className="container-finish-order">
            <div className="order-details-1" >
                <div style={{display:"flex",gap:"2rem"}}><h6>#{id}</h6><h6>{fecha} a las {hora}</h6></div> 
                
                <div>
                {status === 'Complete' ? (
                <h6 style={{color:"green"}}>Estado: {status}</h6>
                ):<h6 style={{color:"#F3A712"}}>Estado: {status}</h6>
                }
                </div>
                
                <div style={{display:"flex",gap:"2rem"}}>
                    <div style={{textAlign:"center",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                        <h6 style={{cursor:"pointer"}}onClick={handleClickHistory}>{name} {lastname}</h6>
                        <h6 style={{cursor:"pointer"}}onClick={handleClickHistory}>{UserEmail}</h6>
                    </div>
                    {order.history ? (<button className="button-more-details-order" onClick={handleClickHistory}>
                                    <ArrowDropUpIcon  />
                                </button>
                            ) : (
                                <button className="button-more-details-order" onClick={handleClickHistory}>
                                
                                <ArrowDropDownIcon />
                                </button>
                                )
                    }
                </div> 
            </div>
            {order.history ? (<>
            <div className="order-details-2">
                <h5>Total: $650.000</h5>
                <div style={{marginRight:"2rem"}}>
                <h5 >Envio a: </h5>
                    
                    {/* <h6>{direction[0]?.direction},
                {direction[0]?.city},
                {direction[0]?.province},
                {direction[0]?.postalcode}  </h6> */}
                
                
                </div>
                    {status=== 'In progress' ? (<div>
                    <button onClick={(e)=>handleChangeStatus(e,id,UserEmail)} className="button-status-order">Cambiar a Finalizada</button>
                </div>):null
                }          
            </div>
            <div className="order-details-3">
                {Products?.map((product, index) => {
                                    return (
                                    <div key={product.id} className="product-order">
                                        <div className="div-img-product-order"><img src={product.image} alt="hola"></img></div>
                                        <h6>{product.name}</h6> 
                                        <div>{accounting.formatMoney(product.price *product.Product_Line.amount,"$")}</div>
                                        <div>{product.Product_Line.amount } u.</div>
                                    </div>
                                    );
                                    })
                }                           
            
            </div>
            </>
            ):null}

        </div>)}
        // <div className="tableGrid1">
        //     <div className="tableContent1">
        //     <div onClick={handleClickHistory}>{date}</div>
        //         <div onClick={handleClickHistory}>
        //             <button>
        //                 <span>{UserEmail}</span>
        //                 {order.history ? (
        //                     <ArrowDropDownIcon />
        //                 ) : (
        //                     <ArrowDropUpIcon />
        //                 )}
        //             </button>
        //         </div>
                
        //         <div onClick={handleClickHistory}>{accounting.formatMoney(total, "$")}</div>
        //         <div onClick={handleClickHistory}>
        //             {order.sentStatus === "Rejected" ? (
        //                 <button className="rejectOrder">
        //                     <ErrorOutlineIcon />
        //                     Rejected
        //                 </button>
        //             ) : order.sentStatus === "In progress" ? (
        //                 <button className="progresOrder">
        //                     <CurrencyExchangeIcon />
        //                     In Progres
        //                 </button>
        //             ) : order.sentStatus === "Complete" ? (
        //                 <button className="sentOrder">
        //                     <CheckCircleOutlineIcon />
        //                     In Progres
        //                 </button>
        //             ) : order.sentStatus === "Cart" ? (
        //                 <button className="sentOrder">
        //                     <ShoppingCartCheckoutIcon />
        //                     Cart
        //                 </button>
        //             ) : (
        //                 <button className="cartOrder">
        //                     <ShoppingCartCheckoutIcon />
        //                     Cart
        //                 </button>
        //             )}
        //         </div>
        //     </div>
        //     {order.history && (
        //         <>
        //             <div className="tbody">
        //                 <h2>Detalles de la orden</h2>
        //                 <div onClick={handleClickDescription}>
        //                     <button>
        //                         ID
        //                         <span>
        //                             {order.description ? (
        //                                 <ArrowDropDownIcon />
        //                             ) : (
        //                                 <ArrowDropUpIcon />
        //                             )}
        //                         </span>
        //                     </button>
        //                 </div>
        //                 <div>DESCRIPTION</div>
        //                 <div>DIRECTION</div>
        //                 <div>DELIVERED</div>
        //             </div>
        //             <div className="tbodyContent">
        //                 <div>{id}</div>
        //                 <div>Compra online</div>
        //                 <div>{direction}</div>
        //                 <div>
        //                     {order.sentStatus === "Rejected" ? (
        //                         <button className="rejectOrder">
        //                             <ErrorOutlineIcon />
        //                             Rejected
        //                         </button>
        //                     ) : order.sentStatus === "In progress" ? (
        //                         <button className="progresOrder">
        //                             <CurrencyExchangeIcon />
        //                             In Progres
        //                         </button>
        //                     ) : order.sentStatus === "Complete" ? (
        //                         <button className="sentOrder">
        //                             <CheckCircleOutlineIcon />
        //                             In Progres
        //                         </button>
        //                     ) : order.sentStatus === "Cart" ? (
        //                         <button className="sentOrder">
        //                             <ShoppingCartCheckoutIcon />
        //                             Cart
        //                         </button>
        //                     ) : (
        //                         <button className="cartOrder">
        //                             <ShoppingCartCheckoutIcon />
        //                             Cart
        //                         </button>
        //                     )}
        //                 </div>
        //             </div>
        //             {order.description && (
        //                 <>
        //                     <div className="empty"></div>
        //                     {Products?.map((product, index) => {
        //                         return (
        //                             <div key={index} className="description">
        //                                 <div>{product.name}</div>
        //                                 <div>
        //                                     {accounting.formatMoney(
        //                                         product.price,
        //                                         "$"
        //                                     )}
        //                                 </div>
        //                                 <div>{product.Product_Line.amount}</div>
        //                                 <div>
        //                                     {accounting.formatMoney(
        //                                         product.price *
        //                                             product.Product_Line.amount,
        //                                         "$"
        //                                     )}
        //                                 </div>
        //                             </div>
        //                         );
        //                     })}
        //                     <div className="end"></div>
        //                 </>
        //             )}
        //         </>
        //     )}
        // </div>