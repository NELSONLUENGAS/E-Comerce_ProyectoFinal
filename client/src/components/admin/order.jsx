import React from 'react';
import { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import accounting from 'accounting';
import './order.css';

export default function Order({UserEmail, total, status, id , Products, date, direction}){
    const [order, setOrder] = useState({
        history: false,
        description: false,
        sentStatus: status,
    });
    function handleClickHistory(e){
        e.preventDefault();
        setOrder({
            ...order,
            history: !order.history,
        });
    }
    function handleClickDescription(e){
        e.preventDefault();
        setOrder({
            ...order,
            description: !order.description,
        });
    }
    
    return (
        <div className='tableGrid1'>
                <div className='tableContent1'>
                    <div  onClick={handleClickHistory}>
                        <button>
                            <span>{UserEmail}</span>
                            {order.history ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                        </button>
                    </div>
                    <div>{date}</div>
                    <div>{accounting.formatMoney(total, '$')}</div>
                    <div>
                    {       order.sentStatus === 'Rejected' ?
                            <button  className='rejectOrder'>
                            <ErrorOutlineIcon />
                            Rejected
                            </button>
                            : order.sentStatus === 'In progress' ?
                            <button className='progresOrder'>
                            <CurrencyExchangeIcon />
                            In Progres
                            </button>
                            : order.sentStatus === 'Complete' ?
                            <button className='sentOrder'>
                            <CheckCircleOutlineIcon />
                            In Progres
                            </button>
                            : order.sentStatus === 'Cart' ?
                            <button className='sentOrder'>
                            <ShoppingCartCheckoutIcon />
                            Cart
                            </button>
                            :
                            <button className='cartOrder'>
                            <ShoppingCartCheckoutIcon />
                            Cart
                            </button>
                        }
                    </div>
                    </div>
                    {order.history &&
                    <>
                    <div className='tbody'>
                    <h2>Order Details</h2>
                    <div  onClick={handleClickDescription}>
                        <button>
                        ID
                        <span>
                        {order.description ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                        </span>
                        </button>
                    </div>
                    <div>DESCRIPTION</div>
                    <div>DIRECTION</div>
                    <div>DELIVERED</div>
                </div>
                <div className='tbodyContent'>
                    <div>{id}</div>
                    <div>Compra en tienda</div>
                    <div>{direction}</div>
                    <div>
                    {       order.sentStatus === 'Rejected' ?
                            <button  className='rejectOrder'>
                            <ErrorOutlineIcon />
                            Rejected
                            </button>
                            : order.sentStatus === 'In progress' ?
                            <button className='progresOrder'>
                            <CurrencyExchangeIcon />
                            In Progres
                            </button>
                            : order.sentStatus === 'Complete' ?
                            <button className='sentOrder'>
                            <CheckCircleOutlineIcon />
                            In Progres
                            </button>
                            : order.sentStatus === 'Cart' ?
                            <button className='sentOrder'>
                            <ShoppingCartCheckoutIcon />
                            Cart
                            </button>
                            :
                            <button className='cartOrder'>
                            <ShoppingCartCheckoutIcon />
                            Cart
                            </button>
                        }
                    </div>
                </div>
                {
                    order.description &&
                    <>
                    <div className='empty'></div>
                    {
                        Products?.map((product, index) => {
                            return (
                                <div key={index} className='description'>
                                    <div>{product.name}</div>
                                    <div>{accounting.formatMoney(product.price, '$')}</div>
                                    <div>{product.Product_Line.amount}</div>
                                    <div>{accounting.formatMoney(product.price * product.Product_Line.amount, '$')}</div>
                                </div>
                            )
                        })
                    }
                <div className='end'></div>
                    </>
                }
                </>
                }
            </div> 
    )
} 