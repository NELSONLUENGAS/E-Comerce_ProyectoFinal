/** @format */

import React from "react";
import { useState } from "react";
import {useSelector,useDispatch} from 'react-redux'
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import accounting from "accounting";
import {Link} from 'react-router-dom'
import "./OrderDetail.css";

export default function OrderDetail({UserEmail,total,handleRejectOrder, status,id,Products,date,direction,handleChangeStatus,updatedAt,name,lastname}) {
    
    const [order, setOrder] = useState({history: false,description: false,sentStatus: status})
    const dia = updatedAt.slice(8,10)
    const mes = updatedAt.slice(5,7)
    const año = updatedAt.slice(0,4)
    const minutos = updatedAt.slice(13,16)
    let hora = Number(updatedAt.slice(11,13))
    hora=hora-3
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
                <div className="dia-hora-order-details"><h6>#{id}</h6><h6>{dia}-{mes}-{año} a las {hora}{minutos}</h6></div> 
                <div>
                {status === 'Complete' ? (<h6 style={{color:"green"}}>Estado: {status}</h6>):null}
                {status === 'Rejected' ? (<h6 style={{color:"red"}}>Estado: {status}</h6>):null}
                {status === 'In progress' ? (<h6 style={{color:"#F3A712"}}>Estado: {status}</h6>):null}
                
                </div>
                
                <div className="all-items-order-details">
                    <div className="name-email-order-details">
                        
                        <div className="name-email-arrow-order-details">
                            <h6 style={{cursor:"pointer"}}onClick={handleClickHistory}>{name} {lastname}</h6>
                            <h6 style={{cursor:"pointer"}}onClick={handleClickHistory}>{UserEmail}</h6>
                            
                        </div>
                        
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
                <h5>Total: ${Intl.NumberFormat("es-ES").format(total)}</h5>
                <div style={{marginRight:"2rem"}}>
                <h5 >Envio a: </h5>
                    
                    <h6>{direction[0]?.direction},
                {direction[0]?.city},
                {direction[0]?.province},
                {direction[0]?.postalcode}  </h6>
                
                
                </div>
                <div className="botones-cambio-orden">
                    {status === 'In progress' ?(<button className="button-status-order" style={{backgroundColor:'red',width:'140px',marginBottom:"1rem"}}onClick={(e)=>handleRejectOrder(e,id,UserEmail)}>Rechazar orden</button>):null}
                        {status=== 'In progress' ? (
                        <button onClick={(e)=>handleChangeStatus(e,id,UserEmail)} className="button-status-order" style={{width:'140px'}}>Finalizar orden</button>):null
                    }          
                </div>
            </div>
            <div className="order-details-3">
                {Products?.map((product, index) => {
                                    return (
                                    <div key={product.id} className="product-order">
                                        <div className="div-img-product-order"><img src={product.image} alt="hola"></img></div>
                                        <div className="div-product-info-order">
                                            <Link  to={"/product/" + product.id} style={{textDecoration:"none",color:"#000"}}>  <h6>{product.name}</h6> </Link> 
                                            <div>{accounting.formatMoney(product.price *product.Product_Line.amount,"$")}</div>
                                            <div>{product.Product_Line.amount } u.</div>
                                        </div>
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