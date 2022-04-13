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
import { RemoveToBasket,putBasketBack,getBasket,addToBasket,substractQuantityItem,addBasketBack } from "../../actions";
import "./CheckoutCard.css";

export default function CheckoutCard({
    buttonQuantity,
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
    let newName=name.slice(0,22);
    newName=newName+"..."


    function subtractionQuantity(){
      
    //   setQuantityProduct(Number(quantityProduct)-1)
    //   setPriceItem(price*(Number(quantityProduct)-1))
    //   dispatch(substractQuantityItem(item.id));
        //   dispatch(addBasketBack(item.id,-1))
        if(quantityProduct>1){
            const fetchData = async () => {
                await dispatch(putBasketBack({productId:id,amount:'Decrement'},user.email));   
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
            await dispatch(putBasketBack({productId:id,amount:'Increment'},user.email));
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

                    <div className="img-checkout-card"><img src={image} alt="imagen de producto"/></div>
                    <div className="description-checkout-card">
                        <div className="div-container-1-checkout-card">
                            <div className="title-mobile-checkout-card">{newName}</div>
                            <div className="title-desktop-checkout-card">{name}</div>
                        </div>
                        <div className="div-container-2-checkout-card">
                            <div className="quantity-checkout-card">
                                {buttonQuantity? (<button className="button-quantity-checkout-card" onClick={subtractionQuantity}>-</button>):null}
                                <div className="quantity-text-checkout-card">{Number(quantityProduct)}</div>
                                {buttonQuantity? ( <button className="button-quantity-checkout-card" onClick={addQuantity}>+</button>):null}
                            </div>
                            <div className="price-text-checkout-card">${Intl.NumberFormat("es-ES").format(priceItem)}</div>
                            {buttonQuantity? (<IconButton fontSize="large" onClick={removeItems}>
                                <DeleteIcon/>
                            </IconButton>):null}
                        </div>
                    
                    </div>
            </div>
        </>
    );
}
