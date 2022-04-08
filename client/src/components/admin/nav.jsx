import React, {useState} from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Order from './order';
import './nav.css';

export default function PreNavAdmin(){ 
    const [open, setOpen] = useState({
        customer: false,
        date: false,
        direction: false,
    });
    function handleClick(e){
        const {name} = e.target;
        console.log(name)
        e.preventDefault();
        setOpen({
            ...open,
            [name]: !open[name],
        });
    }
    return (
        <>
        <div className='tableGrid'>
            <div className='tableContainer1'>
                <input placeholder='Search...' type="search" name="" id="" />
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
            <div className='tableContainer3'>
                <Order/>
                <Order/>
                <Order/>
                <Order/>
            </div>
        </div>
        </>
    )
}