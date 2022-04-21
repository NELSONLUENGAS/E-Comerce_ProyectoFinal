/** @format */

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductId,addFavorite,getFavorites,deleteFavorite} from "../../actions/index";
import NavBar from '../NavBar/NavBar';
import "./ProductDetail.css";
import Combi from "../../svg/delivery-svgrepo-com.svg";
import { addToBasket,vaciarCarrito,cleanProductId,getProductReview,addBasketBack,getBasket,vaciarCarritoBack,getUserSigningIn, postUserViews} from "../../actions/index";
import Review from "./Review";
import Corazon from "../../svg/heart-svgrepo-com.svg";
import Corazonlleno from "../../svg/heart-full.svg";
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
  import { useLocation } from "react-router-dom";

  const useStyles = makeStyles((theme) => ({
    image: {
      with: "200px",
      height: "70px"
    },
  }));
export default function ProductDetail() {
    const navigate=useNavigate();
    let [finalStock,setFinalStock] = useState([])
    const [promedioReview, setPromedioReview] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const { id } = useParams();
    const cartProductsLocal = useSelector((state) => state.basket);
    const productDetail = useSelector((state) => state.productId);
    const favorites = useSelector((state) => state.favorites);
    const user = useSelector((state) => state.User);
    const productReview = useSelector((state) => state.productReview);
    const [productInFavorites,setProductInFavorites]=useState(false)
    const [modalInsertar, setStateModalInsectar] = useState(false)
    const classes = useStyles();
    const Abrir = ()=>setStateModalInsectar(true)
    const Cerrar = ()=>setStateModalInsectar(false)
    const [item, setItem] = useState({
        id: productDetail.id,
        name: productDetail.name,
        image: productDetail.image,
        price: productDetail.price,
        quantity: Number(1),
        description: productDetail.description,
        stock:productDetail.stock
    });
    //////---Views---//////
    const location = useLocation()

    const pathname = location.pathname.split("/");
    const reference = pathname[2];
    let inicioSesion = JSON.parse(localStorage.getItem("userData"));

    useEffect(()=>{
        if(inicioSesion){
            dispatch(postUserViews({reference: reference,UserEmail: inicioSesion.email}));
        }
    },[dispatch])
    //////---Views---//////

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
    useEffect(() => {
        dispatch(getProductId(id));
        dispatch(getProductReview(id));
        
        return () => dispatch(cleanProductId())
    }, [dispatch]);
   

    function addfavorite(e){
        e.preventDefault()
        if(user.name){
            const userData={productId:id}
            dispatch(addFavorite(user.email,userData))
            setProductInFavorites(true);
            toast.success(`Has agregado ${productDetail.name} a favoritos`, {duration: 4000,})
        } else{
            toast.error(`Por favor inicie sesion`, {duration: 4000,})
            navigate('/SignIn')
         }
    }
    function deletefavorite(e){
        e.preventDefault()
        dispatch(deleteFavorite(user.email,id))
        setProductInFavorites(false);
        toast.error(`Has retirado del carrito ${names(productDetail.name)} ${productDetail.name}`, {duration: 4000,})
    }

   const ComprarAhora = ()=>{
       Abrir()
   }

    useEffect(() => {
        
       
        setFinalStock([])
        for (let i = 2; i <= productDetail.stock ; i++) {
            setFinalStock(oldArray => [...oldArray,i])
        }

        setItem({
            id: productDetail.id,
            name: productDetail.name,
            image: productDetail.image,
            price: productDetail.price,
            quantity: Number(1),
            description: productDetail.description,
            stock:productDetail.stock
        });
    }, [productDetail]);

    const AddToBasket = () => {
        
        if(user.name){
            const fetchData = async () => {
                await dispatch(addBasketBack({"productId":id,"amount":Number(quantity)},user.email));
                await dispatch(getBasket(user.email));
                toast.success(`Has añadido al carrito ${names(productDetail.name)} ${productDetail.name}`, {duration: 4000,})
              }
            fetchData()
            
        } else{
            dispatch(addToBasket(item,quantity));
            toast.success(`Has añadido al carrito ${names(productDetail.name)} ${productDetail.name}`, {duration: 4000,})
            // alert("Por favor incia sesion")
            // navigate('/SignIn')
        }
    };

    function ShopNow (e){
        e.preventDefault()
        if(user.name){
                const fetchData = async () => {
                    await dispatch(vaciarCarritoBack(user.email,user.name,user.lastname))
                    await dispatch(addBasketBack({"productId":id,"amount":Number(quantity)},user.email));
                    await dispatch(getBasket(user.email));
                  }
                fetchData()
                // dispatch(vaciarCarrito())
                // dispatch(addToBasket(item,quantity));
                navigate('/checkout-page')
        }else{
                dispatch(vaciarCarrito());
                dispatch(addToBasket(item,quantity));
                navigate('/checkout-page')
        }
    }

    function handleQuantity(e){
        e.preventDefault()
        setQuantity(e.target.value)
    }
    function handleReviewShow(name) {
        if (name === "Todas") {
            document.getElementById("Todas").className =
                "button-active-product-detail";
            document.getElementById("Positivas").className =
                "button-product-detail";
            document.getElementById("Negativas").className =
                "button-product-detail";
        } else if (name === "Positivas") {
            document.getElementById("Todas").className =
                "button-product-detail";
            document.getElementById("Positivas").className =
                "button-active-product-detail";
            document.getElementById("Negativas").className =
                "button-product-detail";
        } else if (name === "Negativas") {
            document.getElementById("Todas").className =
                "button-product-detail";
            document.getElementById("Positivas").className =
                "button-product-detail";
            document.getElementById("Negativas").className =
                "button-active-product-detail";
        }
    }
    useEffect(() =>{
        if (productReview.length){
            let sumatotal = 0;
            let cantidad = 0;
            productReview?.map((item) => {
                sumatotal = sumatotal + item.rate;
                cantidad = cantidad + 1;
                return <> </>;
            });

            setPromedioReview(sumatotal / cantidad);
            let redondeo = Math.ceil(sumatotal / cantidad);
            for (let i = 1; i <= redondeo; i++) {
                const star = document.getElementById(`promedio${i}`);
                star.style.color = "#3483fa";
            }
        
            for (let i = 1; i <= redondeo; i++) {
            const star = document.getElementById(`${productDetail.name}${i}`);
            star.style.color = "orange";
            }
        }
    },[productReview])

    useEffect(()=>{
        dispatch(getFavorites(user.email))
    },[user])

    useEffect(()=>{
        favorites.map((item)=>{
            if (item.wishlist.ProductId=== productDetail.id){
                setProductInFavorites(true)
            }
        })
    },[favorites])

    useEffect(() => {
        let inicioSesion =JSON.parse(localStorage.getItem('userData'))
        if(inicioSesion){
            const fetchData = async () => {
                await   dispatch(getUserSigningIn({
                    'email':inicioSesion.email,
                    'password':inicioSesion.password
                }))
                await dispatch(getBasket(inicioSesion.email))
                await dispatch(getFavorites(inicioSesion.email));
            }
            fetchData()
        }
    }, []);
    useEffect(()=>{
        localStorage.setItem('basket', JSON.stringify(cartProductsLocal));
    },[cartProductsLocal])
    
    return (
        <>
            <NavBar/>
            <div style={{ marginTop: "5rem" }}>
                <div className="container-product-detail">
                    <div className="container-div-important-info-product-detail">
                        <div className="img-product-detail">
                            <div className="list-img-product-detail">
                                <img
                                    src={productDetail.image}
                                    alt="Imagen de producto"
                                />
                            </div>
                            <div className="big-img-product-detail">
                                <img
                                    src={productDetail.image}
                                    alt="Imagen de producto"
                                />
                            </div>
                        </div>
                        <div className="title-product-detail">
                        
                        
                            <div className="title-with-favorite-product-detail">
                            Nuevo
                            {productInFavorites ? ( <img src={Corazonlleno} onClick={(e)=>deletefavorite(e)} style={{height: "20px",cursor:"pointer"}}alt="favorito"/>):(<img src={Corazon} onClick={(e)=>addfavorite(e)} style={{height: "20px",cursor:"pointer"}}alt="agregado en favorito"/>
                           
                            )}
                            
                            
                    
                            </div>
                            <h4>{productDetail.name}</h4>
                           
                            {productReview.length ? (
                            <div className="rating-product-detail">
                                <label id={`${productDetail.name}${1}`}>
                                    ★
                                </label>
                                <label id={`${productDetail.name}${2}`}>
                                    ★
                                </label>
                                <label id={`${productDetail.name}${3}`}>
                                    ★
                                </label>
                                <label id={`${productDetail.name}${4}`}>
                                    ★
                                </label>
                                <label id={`${productDetail.name}${5}`}>
                                    ★
                                </label>
                            </div>
                            ):null}
                            

                            <h2>
                                $
                                {Intl.NumberFormat("es-ES").format(
                                    productDetail.price
                                )}
                            </h2>
                            <h5>
                                {" "}
                                En 12 cuotas de $
                                {Intl.NumberFormat("es-ES").format(
                                    productDetail.price / 12
                                )}
                            </h5>
                            <p
                                style={{
                                    color: "#3483fa",
                                    marginTop: "-1.5em",
                                    marginLeft: "1.2em",
                                    fontSize: "14px",
                                }}
                            >
                                Ver los medios de pago
                            </p>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    height: "70px",
                                    justifyContent: "flex-start",
                                    marginLeft: "1em",
                                }}
                            >
                                <img
                                    src={Combi}
                                    style={{
                                        width: "35px",
                                        marginBottom: "1em",
                                    }}
                                    alt="React Logo"
                                />
                                <p
                                    style={{
                                        color: "green",
                                        marginLeft: "1em",
                                    }}
                                >
                                    {" "}
                                    Llega gratis en 3 dias
                                </p>
                            </div>
                            <p
                                style={{
                                    fontSize: "13px",
                                    textAlign: "left",
                                    marginTop: "-2rem",
                                    marginLeft: "5.2em",
                                    color: "grey",
                                }}
                            >
                                Comprando hoy
                            </p>
                            <p
                                style={{
                                    fontSize: "13px",
                                    textAlign: "left",
                                    marginTop: "-1rem",
                                    marginLeft: "5.2em",
                                    color: "#3483fa",
                                }}
                            >
                                {" "}
                                Ver mas formas de entrega
                            </p>

                            <h5> Devolucion gratuita</h5>
                            <p
                                style={{
                                    fontSize: "13px",
                                    textAlign: "left",
                                    marginTop: "-1.5rem",
                                    marginLeft: "1.3em",
                                    color: "grey",
                                }}
                            >
                                Tenés 30 días desde que lo recibís.
                            </p>
                            {productDetail.stock>0 ? ( <>
                            <p>Stock Disponible</p>
                            <p>
                                Cantidad:
                                <select
                                    className="select-quantity-product-detail"
                                    name=""
                                    id=""
                                    onChange={handleQuantity}
                                >
                                    <option value={1}> 1 Unidad</option>
                                    {finalStock?.map((item, i) => {
                                        return (
                                            <option key={item} value={item}>{item} Unidades</option>
                                        );
                                    })}
                                </select>
                            </p>

                            <div className="button-buy-product-detail">
                                <button  onClick={ComprarAhora} className="button-primary-product-detail">
                                    Comprar ahora
                                </button>
                                <button
                                    onClick={AddToBasket}
                                    className="button-secondary-product-detail"
                                >
                                    Agregar al carrito
                                </button>
                            </div>
                            </>):(<p style={{color:"red"}}>No hay stock Disponible</p>)}
                            <svg
                                className="ui-pdp-icon ui-pdp-icon--protected ui-pdp-color--GRAY"
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="15"
                                viewBox="0 0 14 15"
                            >
                                <use href="#protected_buy"></use>
                            </svg>
                            <p style={{ fontSize: "12px", textAlign: "left" }}>
                                Compra Protegida, recibí el producto que
                                esperabas o te devolvemos tu dinero.
                            </p>
                            <p style={{ fontSize: "12px", textAlign: "left" }}>
                                Suma Puntos!Con esta compra sumás 107 puntos.
                            </p>
                            <p style={{ fontSize: "12px", textAlign: "left" }}>
                                6 meses de garantía de fábrica.
                            </p>
                        </div>
                    </div>
                    <div className="description-product-detail">
                        <h1>Descripcion:</h1>
                        <p style={{ padding: "2rem" }}>
                            {productDetail.description}
                        </p>
                    </div>
                    <div className="review-product-detail">
                    {productReview.length ? (<>
                        <div className="container-review-product-detail">
                            <h1>Opiniones sobre {productDetail.name}</h1>
                            <p style={{fontSize:"60px",marginBottom:"0"}}> {promedioReview.toFixed(1)} </p>
                            <div
                                className="rating-product-detail"
                                style={{ fontSize: "48px", marginLeft: "0",marginTop:"-2rem" }}
                            >
                                <label id={`promedio${1}`}>★</label>
                                <label id={`promedio${2}`}>★</label>
                                <label id={`promedio${3}`}>★</label>
                                <label id={`promedio${4}`}>★</label>
                                <label id={`promedio${5}`}>★</label>
                            </div>
                            { productReview.length>1 ?
                            <h6>Promedio entre {productReview.length} opiniones</h6>:
                            <h6>Hay una sola opinion</h6>
                            }
                        </div>

                        <div className="div-buttons-container">
                            <button
                                className="button-active-product-detail"
                                id="Todas"
                                onClick={(e) => handleReviewShow("Todas")}
                            >
                                Opiniones
                            </button>
                            {/* <button
                                className="button-product-detail"
                                id="Positivas"
                                onClick={(e) => handleReviewShow("Positivas")}
                            >
                                Positivas
                            </button>
                            <button
                                className="button-product-detail"
                                id="Negativas"
                                onClick={(e) => handleReviewShow("Negativas")}
                            >
                                Negativas
                            </button> */}
                        </div>
                        <div>
                            {productReview?.map((elem, i) => {
                                return (
                                    <Review
                                        key={elem.description}
                                        review={elem}
                                    />
                                );
                            })}
                        </div>
                        </> ):<h1>No hay opiniones del producto</h1>}
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
                          {`Estas seguro que quieres comprar ${productDetail.name}, ahora?. Esto
                          eliminara lo que tengas en el carrito definitivamente`}
                        </p>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button
                        color="danger"
                        type="submit"
                        onClick={(e)=>ShopNow(e)}
                    >
                        Comprar
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
