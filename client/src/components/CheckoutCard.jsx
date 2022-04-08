/** @format */

/////////////////////////////////
/////Card de los productos comprados
////Se necesita cambios, pero tiene funcionalidad
/////////////////////////
import React, { useEffect } from "react";
import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch,useSelector } from "react-redux";
import { RemoveToBasket,putBasketBack,getBasket,addToBasket,substractQuantityItem,addBasketBack } from "../actions";
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
    const user = useSelector((state) => state.User);
    const basketBack = useSelector((state) => state.basketBack);
    const [quantityProduct,setQuantityProduct] = useState(quantity);

    function subtractionQuantity(){
      
    //   setQuantityProduct(Number(quantityProduct)-1)
    //   setPriceItem(price*(Number(quantityProduct)-1))
    //   dispatch(substractQuantityItem(item.id));
        //   dispatch(addBasketBack(item.id,-1))
        if(quantityProduct>1){
            const fetchData = async () => {
                await dispatch(putBasketBack({"productId":id,"amount":Number(-1)},user.email));   
                await dispatch(getBasket(user.email));
              }
            fetchData()
              
            setQuantityProduct(quantityProduct-1)
            setPriceItem(price*(quantityProduct-1))
        }
    }
    function addQuantity(){

    //   setQuantityProduct(Number(quantityProduct)+1)
    //   setPriceItem(price*(Number(quantityProduct)+1))
        //   dispatch(addToBasket(item,1));
        console.log(item.id)
        console.log(user.email)
        const fetchData = async () => {
            await dispatch(putBasketBack({"productId":id,"amount":Number(1)},user.email));
            await dispatch(getBasket(user.email));
          }
        fetchData()
      setQuantityProduct(quantityProduct+1)
      setPriceItem(price*(quantityProduct+1))
    }

    useEffect(()=>{
        
        console.log('se disparo el get')
        // const item = basketBack.Products.Product_Line.filter(product=> product.ProductId===item.id)
        // setQuantityProduct(item.amount)

    },[quantityProduct])

    return (
        <>
            <div className="container-checkout-card">
                
                    <div><img src={image} alt="imagen de producto"/></div>
                    <div className="title-checkout-card">{name}</div>
                    <div className="quantity-checkout-card">
                        <button className="button-quantity-checkout-card" onClick={subtractionQuantity}>-</button>
                        <div className="quantity-text-checkout-card">{Number(quantityProduct)}</div>
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
