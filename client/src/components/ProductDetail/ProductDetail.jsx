/** @format */

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductId,addFavorite,getFavorites,deleteFavorite} from "../../actions/index";
import NavBar from '../NavBar/NavBar';
import "./ProductDetail.css";
import Combi from "../../svg/delivery-svgrepo-com.svg";
import { addToBasket,vaciarCarrito,getProductReview,addBasketBack,getBasket,vaciarCarritoBack,getUserSigningIn} from "../../actions/index";
import Review from "./Review";
import Corazon from "../../svg/heart-svgrepo-com.svg";
import Corazonlleno from "../../svg/heart-full.svg";

export default function ProductDetail() {
    const productosdel = {
        reviews: [
            {
                quantity: 3,
                title: "Recomendable",
                description:
                    "Me encantó! trato de cuidarlo del agua y de limpiarle los pelos, así que hace un mes que lo vengo usando y es genial!.",
            },
            {
                quantity: 4,
                title: "Excelente",
                description:
                    "Muy bueno, lo recomiendo. Perdio un par de piquitos en 2 cepilladas pero mi esposa tiene el pelo dificil. Notó una diferencia positiva.",
            },
            {
                quantity: 1,
                title: "Malo",
                description:
                    "Siento que no me peina bien, me llevo mejor con el cepillo que compre en isadora, con eso digo todo.",
            },
        ],
    };
    const navigate=useNavigate();
    let [finalStock,setFinalStock] = useState([])
    const [promedioReview, setPromedioReview] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const { id } = useParams();
    const productDetail = useSelector((state) => state.productId);
    const favorites = useSelector((state) => state.favorites);
    const user = useSelector((state) => state.User);
    const productReview = useSelector((state) => state.productReview);
    const [productInFavorites,setProductInFavorites]=useState(false)
    const [item, setItem] = useState({
        id: productDetail.id,
        name: productDetail.name,
        image: productDetail.image,
        price: productDetail.price,
        quantity: Number(1),
        description: productDetail.description,
    });
    useEffect(() => {
        dispatch(getProductId(id));
        dispatch(getProductReview(id));
        
        // return () => dispatch(cleanGetIdProduct())
    }, [dispatch]);
    console.log(productReview)
   

    function addfavorite(e){
        e.preventDefault()
        if(user.name){
            const userData={productId:id}
            dispatch(addFavorite(user.email,userData))
            setProductInFavorites(true);
        } else{
            alert('Para agregar a favoritos por favor inicie sesion')
            navigate('/SignIn')
         }
    }
    function deletefavorite(e){
        e.preventDefault()
        dispatch(deleteFavorite(user.email,id))
        setProductInFavorites(false);
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
        });
    }, [productDetail]);

    const AddToBasket = () => {
        
        if(user.name){
            const fetchData = async () => {
                await dispatch(addBasketBack({"productId":id,"amount":Number(quantity)},user.email));
                await dispatch(getBasket(user.email));
              }
            fetchData()
            
        } else{
            alert("Por favor incia sesion")
            navigate('/SignIn')
        }
    };
    function ShopNow (e){
        if(user.name){
            var opcion = window.confirm("Esto vaciara tu carrito y te llevara directamente a la compra del producto, quieres continuar? ")
            if(opcion===true){
                const fetchData = async () => {
                    await dispatch(vaciarCarritoBack(user.email))
                    await dispatch(addBasketBack({"productId":id,"amount":Number(quantity)},user.email));
                    await dispatch(getBasket(user.email));
                  }
                fetchData()
                // dispatch(vaciarCarrito())
                // dispatch(addToBasket(item,quantity));
                navigate('/checkout-page')
            }
        }else{
            alert("Por favor incia sesion")
            navigate('/SignIn')
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
            // let enteros = Math.floor(sumatotal/cantidad)
            // let decimales = enteros-(sumatotal/cantidad)
            // const star = document.getElementById(`promedio${decimales}`);
            // star.style.color = "orange"
        
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
            if (item.wishlist.ProductId=== id){
                setProductInFavorites(true)
            }
        })
    },[favorites])
    useEffect(() => {
        let inicioSesion =JSON.parse(localStorage.getItem('userData'))
        if(inicioSesion){
            console.log(inicioSesion)
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
        for (let i=0;i++;i<favorites.length){
            if(favorites.wishlist.ProductId === id){
                setProductInFavorites(true);
                alert('esta en favoritos')
            }   
            alert('entre en for') 
        }
        
    },[favorites])
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
                        {!productosdel.reviews.length ? null:(
                        <>
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
                            </>)}

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
                                <button  onClick={ShopNow} className="button-primary-product-detail">
                                    Comprar ahora
                                </button>
                                <button
                                    onClick={AddToBasket}
                                    className="button-secondary-product-detail"
                                >
                                    Agregar al carrito
                                </button>
                            </div>
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
                                Todas
                            </button>
                            <button
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
                            </button>
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
            </div>
        </>
    );
}
