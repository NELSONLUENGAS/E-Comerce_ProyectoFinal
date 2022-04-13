//////////////////////////
/////Total Del producto
///////////////////////
import React, {useEffect} from 'react';
import {Link} from 'react-router-dom'
import { Button, makeStyles } from '@material-ui/core';
import './Total.css'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { SumItem } from '../../actions';

const useStyle = makeStyles((theme) => ({
    root:  {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "20vh"
    },
    button: {
        marginTop: "2rem"
    }
}))


const Total = ({onPay,buttonContinue,emptyCart}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    
    const TotalPrice = useSelector((state)=>state.SumPriceBack)
    const TotalItem = useSelector((state)=>state.SumItemsBack)
    useEffect(()=>{
        dispatch(SumItem())
    },[dispatch])

  return (
      <div className='containter-total'> 
        <div className="container-pay-total">
            {/* <h3>Total items: {TotalItem}</h3> */}
            <h3>Total a pagar:</h3>
            <h3>{`$${Intl.NumberFormat("es-ES").format(TotalPrice)}`}</h3>
        </div>
        {buttonContinue ? (<div className="div-buttons-total">
            <button onClick={(e) => emptyCart(e)} className="empty-cart-button-total">Vaciar carrito</button>
            <button onClick={(e) => onPay(e)} className="continue-button-total" >Continuar compra</button>
            </div>
        ):null}

     </div>
  )

};

export default Total;