//////////////////////////
/////Total Del producto
///////////////////////
import React, {useEffect} from 'react';

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


const Total = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const toCheckOut = () =>{
        navigate('/checkout')
    }
    const TotalPrice = useSelector((state)=>state.SumPrice)
    const TotalItem = useSelector((state)=>state.basket)
    useEffect(()=>{
        dispatch(SumItem())
    },[dispatch])

  return (
      <div className={classes.root} > 
        <h5>Total item: {TotalItem.length}</h5>
        <h5>{`US$${TotalPrice}`}</h5>
        <Button className={classes.button} variant="contained" color="secondary" onClick={toCheckOut} >Check out</Button>

     </div>
  )

};

export default Total;