/** @format */

///////////////////
///Producto de la canasta
//Mapeo De Los Productos Comprados
////////////////////////
import React, { useEffect } from "react";
import CheckoutCard from "./CheckoutCard.jsx";
import { useSelector } from "react-redux";
import Total from "../Total/Total";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavBar from '../NavBar/NavBar'
import { getMercadoPago, vaciarCarritoBack,getBasket,addToBasket,cargarSumItems,getUserSigningIn,getProducts,vaciarCarrito,cargarCarrito} from "../../actions/index.js";
import "./CheckoutPage.css"
import toast, { Toaster } from 'react-hot-toast';

export default function CheckoutPage() {
    const Vaciarr = () => toast.success(`Has vaciado tu carrito de compras`, {duration: 4000,})
    const Inicie = () => toast(`Por Favor Inicie sesion`, {duration: 4000, position: 'bottom-center',})
    
    const cartProductsLocal = useSelector((state) => state.basket);
    const cartProducts = useSelector((state) => state.basketBack);
    const allProducts = useSelector((state) => state.allProducts);
    const user = useSelector((state) => state.User);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(getBasket(user.email))
        dispatch(getProducts())
        let localBasket = JSON.parse(localStorage.getItem("basket"));
        let sumItems = 0
        localBasket?.forEach(product=>{
            sumItems+=product.quantity
        })
        console.log(localBasket)
        console.log(sumItems)
        if(localBasket){
            dispatch(cargarCarrito(localBasket)) 
            dispatch(cargarSumItems(sumItems))
        }
        
    },[dispatch])
    useEffect(()=>{
        localStorage.setItem('basket', JSON.stringify(cartProductsLocal));

    },[cartProductsLocal])

    function vaciarCarritoLocal(e){
  

            if(user.email){
            const fetchData = async () => {
                Vaciarr()
                await dispatch(vaciarCarritoBack(user.email,user.name,user.lastname))
                await dispatch(getBasket(user.email))
            } 
            fetchData()
        } else{
            vaciarCarrito();
            localStorage.removeItem('basket');  
        }
    }
    const productsMercado = cartProducts.Products?.map((element) => {
        return {
            title: element.name,
            unit_price: element.Product_Line.price,
            quantity: element.Product_Line.amount,
        };
    });

    function onPay(e){
        e.preventDefault();
        if(user.name){
            dispatch(getMercadoPago({email: user.email, items: productsMercado}));
        navigate('/Checkout/Payment')
        } else{
            Inicie()
            setTimeout(()=>{
                navigate('/SignIn')
            },1000)
           
        }
    }



    useEffect(() => {
        let inicioSesion =JSON.parse(localStorage.getItem('userData'))
        if(inicioSesion){
            const fetchData = async () => {
                await   dispatch(getUserSigningIn({
                    'email':inicioSesion.email,
                    'password':inicioSesion.password
                }))
                await dispatch(getBasket(inicioSesion.email))
            }
            fetchData()
        }
    }, []);

    return (
        <>
            <NavBar />
            <h1>Carrito</h1>
            
            <div className="container-cart">
                

        {user.name ?(
                cartProducts.Products?.length && user.name ? (
                    <div style={{width:"100%"}}>
                        {cartProducts.Products.map((element) => {
                            return(
                            <CheckoutCard
                                buttonQuantity={true}
                                key={element.Product_Line.ProductId}
                                id={element.Product_Line.ProductId}
                                name= {element.name}
                                image= {element.image}
                                price= {element.Product_Line.price}
                                quantity={element.Product_Line.amount}
                                description={element.description}
                                stock={element.stock}
                            />)
                        })}
                        <Total buttonContinue={true} emptyCart={vaciarCarritoLocal}onPay={onPay}/>
                    </div>
                    ):<div style={{fontSize:"24px",margin:"auto",height:"300px",display:"flex",flexDirection:"row",justifyContent:"center",marginTop:"5rem"}}>El carrito se encuentra vacio</div>
                
                ):(
                cartProductsLocal[0] ? (
                     <div>
                         {cartProductsLocal?.map((product) => (
                            <CheckoutCard
                                buttonQuantity={true}
                                key={product.id}
                                id={product.id}
                                name= {product.name}
                                image= {product.image}
                                price= {product.price}
                                quantity={product.quantity}
                                description={product.description}
                            />
                        ))}
                        <Total buttonContinue={true} emptyCart={vaciarCarritoLocal} onPay={onPay}/>
                    </div>
                    ):(<div style={{fontSize:"24px",height:"300px"}}>El carrito se encuentra vacio</div>)
                    )}
                    <Toaster 
            position="top-center"
            reverseOrder={false}

            />
            </div>
        </>
    );
}