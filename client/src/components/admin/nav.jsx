import React, {useState, useEffect} from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {getOrders, getOrdersUser} from '../../actions/index';
import {useSelector, useDispatch} from 'react-redux';
import Order from './order';
import './nav.css';
import NavBarGuest from '../Guest/NavBarGuest';

export default function PreNavAdmin(){
    const dispatch = useDispatch();
    
    const Orders = useSelector((state) => state.Orders);
    //Orders.length && console.log(Orders, 'primero')
    useEffect(() => {
        dispatch(getOrders());
    } , [dispatch]);

    const [open, setOpen] = useState({
        customer: false,
        date: false,
        direction: false,
    });
    function onChange(e){
        dispatch(getOrdersUser(e.target.value));
    }
    function handleClick(e){
        const {name} = e.target;
        e.preventDefault();
        setOpen({
            ...open,
            [name]: !open[name],
        });
    }
    return (
        <>
        <div className='tableGrid'>
            <div className='scroll'>
            <NavBarGuest/>
            <div className='tableContainer1'>
                <input onChange={onChange} placeholder='Search...' type="search" name="" id="" />
            </div>
            <div className='tableContainer2'>
                <button name='customer' onClick={handleClick}>
                    CUSTOMER
                    <span>
                        {open.customer ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                    </span>
                </button>
                <button name='date' onClick={handleClick}>
                    DATE
                    <span>
                    {open.date ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                    </span>
                </button>
                <button onClick={handleClick} name='direction'>
                    TOTAL
                    <span>
                    {open.direction ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                    </span>
                </button>
                <button>SENT_STATUS</button>
            </div>
            </div>
            <div className='tableContainer3'>
            {Orders.length ? Orders.map((order) => <Order key={order.id} {...order} />) : <div>Loading...</div>}
            </div>
        </div>
        </>
    )
}