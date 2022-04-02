/** @format */

/////////////////////////////////
/////Card de los productos comprados
////Se necesita cambios, pero tiene funcionalidad
/////////////////////////
import React, { useEffect } from "react";
import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from "react-redux";
import { RemoveToBasket,addToBasket,substractQuantityItem } from "../actions";
import "./CheckoutCard.css";

export default function CheckoutCard({
    id,
    name,
    image,
    price,
    quantity,
    description,
}) {
    const dispatch = useDispatch();
    const removeItems = () => {
        dispatch(RemoveToBasket(id));
    };
    const [priceItem,setPriceItem] = useState(price*quantity)
    const [item] = useState({
      id: id,
      name: name,
      image: image,
      price: price,
      quantity:1,
      description:description
  });
  // useEffect(() =>{

  // },[quantityProduct])
    const [quantityProduct,setQuantityProduct] = useState(quantity);

    function subtractionQuantity(){
      if(quantityProduct>1){
      setQuantityProduct(quantityProduct-1)
      setPriceItem(price*(quantityProduct-1))
      dispatch(substractQuantityItem(item.id));
      }
      
    }
    function addQuantity(){
      setQuantityProduct(quantityProduct+1)
      setPriceItem(price*(quantityProduct+1))
      dispatch(addToBasket(item));
    }

    return (
        <>
            <div className="container-checkout-card">
                
                    <div><img src={image} alt="imagen de producto"/></div>
                    <div className="title-checkout-card">{name}</div>
                    <div className="quantity-checkout-card">
                        <button className="button-quantity-checkout-card" onClick={subtractionQuantity}>-</button>
                        <div className="quantity-text-checkout-card">{quantityProduct}</div>
                        <button className="button-quantity-checkout-card" onClick={addQuantity}>+</button>
                    </div>
                    
                    <div className="price-text-checkout-card">${Intl.NumberFormat("es-ES").format(priceItem)}</div>
                
                <IconButton fontSize="large" onClick={removeItems}>
                    <DeleteIcon/>
                </IconButton>
            </div>
        </>
    );
}
