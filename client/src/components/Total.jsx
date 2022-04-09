//////////////////////////
/////Total Del producto
///////////////////////
import React, {useEffect} from 'react';
import {Link} from 'react-router-dom'
import { Button, makeStyles } from '@material-ui/core';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { SumItem } from '../actions';

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
      <div> 
        <div style={{display:"flex",justifyContent:"flex-end",flexDirection:"row",gap:"3rem",padding:"1rem",marginRight:"1rem"}}>
            {/* <h3>Total items: {TotalItem}</h3> */}
            <h3>Total a pagar:</h3>
            <h3>{`$${Intl.NumberFormat("es-ES").format(TotalPrice)}`}</h3>
        </div>
        {buttonContinue ? (<div style={{gap:"2rem",display:"flex",justifyContent:"flex-end",marginRight:"2rem",marginBottom:"2rem"}}>
            <button onClick={(e) => emptyCart(e)} style={{color:'white',backgroundColor:"red",border:"transparent",borderRadius: "0.5em",height: "50px",padding:"0.5rem"}}>Vaciar carrito</button>
            <button onClick={(e) => onPay(e)} style={{color:'white',backgroundColor:"#3483fa",border:"transparent",borderRadius: "0.5em",height: "50px",padding:"0.5rem"}}>Continuar compra</button>
            </div>
        ):null}

     </div>
  )

};

export default Total;