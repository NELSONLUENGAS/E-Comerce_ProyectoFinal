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


const Total = ({onPay}) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    
    const TotalPrice = useSelector((state)=>state.SumPrice)
    const TotalItem = useSelector((state)=>state.ItemsAmount)
    useEffect(()=>{
        dispatch(SumItem())
    },[dispatch])

  return (
      <div className={classes.root} > 
        <h5>Total item: {TotalItem}</h5>
        <h5>{`$${Intl.NumberFormat("es-ES").format(TotalPrice)}`}</h5>
        <button onClick={(e) => onPay(e)} style={{color:'white',backgroundColor:"#3483fa",border:"transparent",borderRadius: "0.5em",height: "50px",padding:"0.5rem"}}>Continuar compra</button>

     </div>
  )

};

export default Total;