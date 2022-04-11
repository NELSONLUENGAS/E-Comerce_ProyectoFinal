import React, {useState, useEffect} from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {getOrders, getOrdersUser,changeStatusToComplete} from '../../actions/index';
import {useSelector, useDispatch} from 'react-redux';
import OrderDetail from './OrderDetail';
import './Order.css';
import NavBar from '../NavBar/NavBar';

export default function Order(){
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.User);
    const Orders = useSelector((state) => state.Orders);
    console.log(Orders)
    //Orders.length && console.log(Orders, 'primero')
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
    function handleChangeStatus(e,id){
        e.preventDefault()
        const fetchData = async () => {
            await dispatch(changeStatusToComplete(user.email,{orderId:id}))
            await dispatch(getOrders());

          }
        fetchData()
    }

    useEffect(() => {
        dispatch(getOrders());
    } , [dispatch]);

    return (
        <>
        <NavBar/>
        <div style={{display:"flex",flexDirection:"row", justifyContent:"space-around",fontSize:"36px",gap:'3rem',backgroundColor:"#fff",width:"50%",margin:"auto",borderRadius:"0.5rem", marginTop:"2rem",borderTop:"5px solid #3483fa ",height:"5rem"}}>
            <button style={{border:"transparent",backgroundColor:"#fff"}}>Todas</button>
            <button style={{border:"transparent",backgroundColor:"#fff"}}>En proceso</button>
            <button style={{border:"transparent",backgroundColor:"#fff"}}>Finalizada</button>
        </div>
        <div>
            Filtrar y ordenar 
            <input/>
        </div>
            <div style={{width:"50%",margin:"auto",gap:"2rem"}}>
            {Orders.length ? Orders.map((order) => <OrderDetail key={order.id} UserEmail={user.email} total={order.total} status={order.status} id={order.id} Products={order.Products} direction={order.direction} handleChangeStatus={handleChangeStatus} />) : <div>No hay ordenes creadas</div>}
            </div>
        </>
    )
}