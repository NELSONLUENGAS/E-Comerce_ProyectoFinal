/** @format */

/////////////////////////////////
/////Card de los productos comprados
////Se necesita cambios, pero tiene funcionalidad
/////////////////////////
import {Buttomm} from './Elements';
import React, { useEffect } from "react";
import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch,useSelector } from "react-redux";
import { RemoveToBasket,putBasketBack,getBasket,addToBasket,substractQuantityItem,addBasketBack,removeItemBasket} from "../../actions";
import "./CheckoutCard.css";
import Logo from '../../svg/latcom1.png'
import {
    Table,
    Button, 
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
  } from "reactstrap";
  import { makeStyles } from "@material-ui/core/styles";
  import toast, { Toaster } from 'react-hot-toast';
  import { getProducts
 } from '../../actions';
  const useStyles = makeStyles((theme) => ({
    image: {
      with: "200px",
      height: "70px"
    },
  }));
export default function CheckoutCard({
    buttonQuantity,
    id,stock,
    name,
    image,
    price,
    quantity,
    description,
}) {
    const Añadir = () => toast.success(`Has añadido al carrito ${names(name)} ${name}`, {duration: 4000,})
    const Sacar = () => toast.error(`Has retirado del carrito ${names(name)} ${name}`, {duration: 4000,})
    const Eliminar = () => toast.error(`Has eliminado del carrito ${DeleteCompra(name)}: ${name}`, {duration: 4000,})
    const Stock = () => toast.error(`Has alcanzado el limite de stock para el item: ${name}`, {duration: 4000,})
    const dispatch = useDispatch();
    const classes = useStyles();    
    const [modalInsertar, setStateModalInsectar] = useState(false)
    const Products = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const Product = Products.filter(el => el.id ==id)

    const removeItems = (e) => {
        e.preventDefault();
        if(user.email){
           const fetchData = async () => {
                // const dataId={productId:id}
                Eliminar()
                await dispatch(removeItemBasket(user.email,id)) 
                await dispatch(getBasket(user.email));
                setStateModalInsectar(false)
            }
            fetchData()
        } else if(!user.email){
            dispatch(RemoveToBasket(id));
        }
    };
    const [priceItem,setPriceItem] = useState(price*quantity)
    const [item] = useState({
      id: id,
      name: name,
      image: image,
      price: price,
      quantity:1,
      description:description,
      stock:stock
  });

      const user = useSelector((state) => state.User);
      const cartProductsLocal = useSelector((state) => state.basket);
    const basketBack = useSelector((state) => state.basketBack);
    const [quantityProduct,setQuantityProduct] = useState(quantity);
    let newName=name.slice(0,22);
    newName=newName+"..."

    function names(name){
        var nombreextraido = name.split(' ')[0];
        var indice = nombreextraido.length-1
        var ultima = nombreextraido.charAt(indice)
        if(ultima==="a"){
            return "una"
        }else{
            return "un"
        }
    }

    function DeleteCompra(name){
        var nombreextraido = name.split(' ')[0];
        var indice = nombreextraido.length-1
        var ultima = nombreextraido.charAt(indice)
        if(ultima==="a"){
            return "la"
        }else{
            return "el"
        }
    }
    function subtractionQuantity(e){
        e.preventDefault()
      
    //   setQuantityProduct(Number(quantityProduct)-1)
    //   setPriceItem(price*(Number(quantityProduct)-1))
    //   dispatch(substractQuantityItem(item.id));
    //   dispatch(addBasketBack(item.id,-1))
        
        if(quantityProduct>1){
            if(user.email){
            const fetchData = async () => {
                await dispatch(putBasketBack({productId:id,amount:'Decrement'},user.email));   
                await dispatch(getBasket(user.email));
                // Mostrame()
                Sacar()
              }
            fetchData()
              
            setQuantityProduct(quantityProduct-Number(1))
            setPriceItem(price*(quantityProduct-Number(1)))
            } else{
                Sacar()
                dispatch(substractQuantityItem(item.id));
                setQuantityProduct(quantityProduct-Number(1))
                setPriceItem(price*(quantityProduct-Number(1)))
                localStorage.setItem('basket', JSON.stringify(cartProductsLocal)); 
            }
        }else{
            
        }
    }
  
    function addQuantity(e){
        e.preventDefault()
    //   setQuantityProduct(Number(quantityProduct)+1)
    //   setPriceItem(price*(Number(quantityProduct)+1))
    //   dispatch(addToBasket(item,1));
        
        if(quantityProduct < Product[0].stock){
            
            if(user.email){
            const fetchData = async () => {
                await dispatch(putBasketBack({productId:id,amount:'Increment'},user.email));
                await dispatch(getBasket(user.email));

                Añadir()
            }
             fetchData()
             setQuantityProduct(quantityProduct+Number(1))
             setPriceItem(price*(quantityProduct+Number(1)))
        }else {
          Añadir()
          dispatch(addToBasket(item,1));
          setQuantityProduct(quantityProduct+Number(1))
          setPriceItem(price*(quantityProduct+Number(1)))
          localStorage.setItem('basket', JSON.stringify(cartProductsLocal)); 

        }
        }else{
            Stock()
        }
        
 }
 const mostrarModalInsertar= (id)=> {

    setStateModalInsectar({
      modalInsertar:true,
  })  ;
  }

    useEffect(()=>{
        
        // console.log('se disparo el get')
        // const item = basketBack.Products.Product_Line.filter(product=> product.ProductId===item.id)
        // setQuantityProduct(item.amount)

    },[quantityProduct])

    return (
        <>
            <div className="container-checkout-card">
            <Toaster 
            position="top-center"
            reverseOrder={false}

            />
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
                                {buttonQuantity? ( <Buttomm className="button-quantity-checkout-card" onClick={addQuantity}>+</Buttomm>):null}
                            </div>
                            <div className="price-text-checkout-card">${Intl.NumberFormat("es-ES").format(priceItem)}</div>
                            {buttonQuantity? (<IconButton fontSize="large" onClick={() => mostrarModalInsertar(id)}>
                                <DeleteIcon/>
                            </IconButton>):null}
                        </div>
                    
                    </div>
                    <Modal isOpen={modalInsertar} onRequestClose={()=>setStateModalInsectar(false)}>
                <ModalHeader>
                    <div><img className={classes.image} src={Logo}/></div>
                </ModalHeader>
                <form>
                <ModalBody>
                    <FormGroup>
                        <p>
                          {`Estas seguro que quieres eliminar del carrito todos los items de: ${name}?`}
                        </p>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button
                        color="danger"
                        type="submit"
                        onClick={(e)=>removeItems(e)}
                    >
                        Eliminar
                    </Button>
                    <Button
                        
                        color="primary"
                        onClick={() => setStateModalInsectar(false)}
                    >
                        Cancelar
                    </Button>
                </ModalFooter>
                 </form>
            </Modal>
            </div>
        </>
    );
}