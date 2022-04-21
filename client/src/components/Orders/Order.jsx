import React, {useState, useEffect} from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {getOrders,getOrdersInProgress,getOrdersComplete, getOrdersUser,changeStatusToComplete,changeToRejected} from '../../actions/index';
import {useSelector, useDispatch} from 'react-redux';
import OrderDetail from './OrderDetail';
import './Order.css';
import NavBar from '../NavBar/NavBar';
import SearchIcon from '../../svg/search.svg'

export default function Order(){
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.User);
    const Orders = useSelector((state) => state.Orders);
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
    function handleChangeStatus(e,id,email){
        e.preventDefault()
        const fetchData = async () => {
            await dispatch(changeStatusToComplete(email,{orderId:id}))
            await dispatch(getOrders());
          }
        fetchData()
        dispatch(getOrders());
        
    }
    function handleRejectOrder(e,id,email){
        e.preventDefault()
        const fetchData = async () => {
            await dispatch(changeToRejected(email,{orderId:id}))
            await dispatch(getOrders());
          }
        fetchData()
        
    }
    function handleGetOrders(e,type){
        e.preventDefault()
        switch(type){
            case 'All':{ 
                return dispatch(getOrders());            
            }
            case 'InProcess':{
                return dispatch(getOrdersInProgress())    
            }
            case 'Complete':{
                    return dispatch(getOrdersComplete())
            }
            default: return
        }
            

    }
   

    useEffect(() => {
        dispatch(getOrders());

    } , [dispatch]);

    return (
        <>
         <NavBar/><div className="container-all-order">
        <div className='container-filter-orders-gral' >
            <button onClick={(e)=>handleGetOrders(e,'All')}style={{border:"transparent",backgroundColor:"#fff"}}>Todas</button>
            <button onClick={(e)=>handleGetOrders(e,'InProcess')} style={{border:"transparent",backgroundColor:"#fff"}}>En proceso</button>
            <button onClick={(e)=>handleGetOrders(e,'Complete')} style={{border:"transparent",backgroundColor:"#fff"}}>Finalizada</button>
        </div>
        <div className="container-filters-order">
           

        {/* <div className="div-buscador-order">
                
                <img style={{height:"18.5px",position:"absolute",left:"10px",bottom:"3px"}} src={SearchIcon} alt='busqueda'></img>
                <input onChange={onChange} type='search' placeholder="Buscar por mail " className='input-buscador-order'/>
        </div> */}
        {/* <div className='div-filters-order'>
            <h6 style={{marginBottom:"0.4rem"}}>Filtrar y ordenar</h6>
            <select>
                <option>Por fecha mas recientes primero</option>
                <option>Por fecha mas antiguos primero</option>
                
            </select>
        </div> */}
        </div>
            <div style={{margin:"auto",gap:"2rem"}}>
                
            {Orders.length ? 
                    Orders?.map((order) => {
                        return (
                        <OrderDetail key={order.id} updatedAt={order.updatedAt} UserEmail={order.UserEmail} total={order.total} status={order.status} id={order.id} Products={order.Products} direction={order.direction} name={order.name} lastname={order.lastname} handleChangeStatus={handleChangeStatus} handleRejectOrder={handleRejectOrder} />
                        )
                    }) : <div>No hay ordenes creadas</div>}
            </div>
            </div>
        </>
    )
}