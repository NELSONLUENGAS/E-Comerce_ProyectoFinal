import React from 'react';
import { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import './order.css';

export default function Order(){
    const [order, setOrder] = useState({
        history: false,
        description: false,
        sentStatus: false,
        deliveredStatus: false,
    });
    function handleClick(e){
        const { name } = e.target;
        console.log(name)
        e.preventDefault();
        setOrder({
            ...order,
            [name]: !order[name]
        });
    }
    
    return (
        <div className='tableGrid1'>
                <div className='tableContent1'>
                    <div>
                        <button onClick={handleClick} name='history'>
                            <span>123456789</span>
                            {order.history ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                        </button>
                    </div>
                    <div> 02-Abril-2022</div>
                    <div>$120000</div>
                    <div>
                        {
                            order.sentStatus ?
                            <button onClick={handleClick} name='sentStatus' className='sentOrder'>
                            <CheckCircleIcon />
                            sent
                            </button>
                            :
                            <button onClick={handleClick} name='sentStatus' className='pendingOrder'>
                            <HourglassBottomIcon />
                            pending
                            </button>
                        }
                    </div>
                    </div>
                    {order.history &&
                    <>
                    <div className='tbody'>
                    <h2>Order Details</h2>
                    <div>
                        <button onClick={handleClick} name='description'>
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
                    <div>12</div>
                    <div>Compra en tienda</div>
                    <div>Colombia_Calle12 - #12-23</div>
                    <div>
                        { order.deliveredStatus ?
                        <button onClick={handleClick} className='sentOrder' name='deliveredStatus'>
                            <CheckCircleIcon />
                            sent
                        </button>
                        :
                        <button onClick={handleClick} className='pendingOrder' name='deliveredStatus'>
                            <HourglassBottomIcon />
                            pending
                        </button>
                        }
                    </div>
                </div>
                {
                    order.description &&
                    <>
                    <div className='empty'></div>
                <div className='description'>
                    <div>producto name</div>
                    <div>price unit</div>
                    <div>quantity</div>
                    <div>Total price</div>
                </div>
                <div className='end'></div>
                    </>
                }
                </>
                }
            </div> 
    )
} 