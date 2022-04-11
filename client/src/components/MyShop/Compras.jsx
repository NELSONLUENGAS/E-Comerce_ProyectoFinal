import React, {useState, useEffect} from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {getOrders, getOrdersUser} from '../../actions/index';
import {useSelector, useDispatch} from 'react-redux';
import ComprasDetail from './ComprasDetail';
import './Compras.css';
import NavBar from '../NavBar/NavBar';
import SearchIcon from '../../svg/search.svg'

export default function Compras(){
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.User)
    const Orders = useSelector((state) => state.Orders);
    console.log(Orders)
    //Orders.length && console.log(Orders, 'primero')
    useEffect(() => {
        dispatch(getOrdersUser(user.email));
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
        <NavBar/>
        <div className="container-compras">
            <div className="container-title-compras">
                <h3 style={{textAlign:"left"}}>Compras</h3>
            </div>
            <div className="div-buscador-compras">
                <img style={{height:"18.5px",position:"absolute",left:"10px"}} src={SearchIcon} alt='busqueda'></img>
                <input placeholder="Buscar producto comprado..." className='input-buscador-compras'/>
            </div>
            {Orders.length? (
            <div className="container-compras-detail" >
                {Orders.length ? Orders.map((order) => <ComprasDetail key={order.id} {...order} />) : <div>No hay ordenes creadas</div>}
            </div>):<div>No hay ordenes para mostrar</div>}
        </div>
        </>
    )
}