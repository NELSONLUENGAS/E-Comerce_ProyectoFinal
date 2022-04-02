import { useParams } from "react-router-dom"
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductId} from "../../actions/index"
import NavBarGuest from "../Guest/NavBarGuest";
import "./ProductDetail.css"
import Combi from '../../svg/delivery-svgrepo-com.svg'
import { addToBasket } from "../../actions/index"

export default function ProductDetail(){
    const prueba=[1,2,3,4,5,6,7]
    const dificultad=4
    const dispatch = useDispatch();
    const {id} = useParams();
    const productDetail = useSelector((state) => state.productId);
    const [item,setItem] = useState({
        id: productDetail.id,
        name: productDetail.name,
        image: productDetail.image,
        price: productDetail.price,
        quantity:Number(1),
        description:productDetail.description
    });
    useEffect(() => {
        dispatch(getProductId(id));
        // return () => dispatch(cleanGetIdProduct())
    }, [dispatch]);
    console.log(productDetail)

    useEffect(()=>{
        for (let i = 1; i <= dificultad; i++) {
            const star = document.getElementById(`${productDetail.name}${i}`);
            star.style.color = "orange";
        }
        setItem({
            id: productDetail.id,
            name: productDetail.name,
            image: productDetail.image,
            price: productDetail.price,
            quantity:Number(1),
            description:productDetail.description
        })
        
    },[productDetail])
    
    console.log("esto es el detail")
    console.log(item);

    const AddToBasket = () => {
        dispatch(addToBasket(item));
    };

    return(<>
        <NavBarGuest/>
        <div style={{marginTop:"230px"}}>
            <div className="container-product-detail">
                <div className="container-div-important-info-product-detail">
                    <div className="img-product-detail">
                        <div className="list-img-product-detail">
                            <img src={productDetail.image} alt="Imagen de producto" />
                        </div>
                        <div className="big-img-product-detail">
                        <img src={productDetail.image} alt="Imagen de producto" />
                        </div>
                    </div>
                    <div className="title-product-detail">
                        <h4>{productDetail.name}</h4>
                        <div className="rating-product-detail">
                            <label id={`${productDetail.name}${1}`} >★</label>    
                            <label id={`${productDetail.name}${2}`} >★</label>    
                            <label id={`${productDetail.name}${3}`} >★</label>    
                            <label id={`${productDetail.name}${4}`} >★</label>    
                            <label id={`${productDetail.name}${5}`} >★</label>    
                        </div>
                        
                        <h2>${Intl.NumberFormat('es-ES').format(productDetail.price)}</h2>
                        <h5> En 12 cuotas de ${Intl.NumberFormat('es-ES').format(productDetail.price/12)}</h5>
                        <p style={{color:"#3483fa",marginTop:"-1.5em",marginLeft:"1.2em",fontSize:"14px"}}>Ver los medios de pago</p>
                        <div style={{display:"flex",flexDirection:"row",alignItems:"center",height:"70px",justifyContent:"flex-start",marginLeft:"1em"}}>
                            <img src={Combi} style={{width:"35px",marginBottom:"1em"}} alt="React Logo" />
                            <p style={{color:"green",marginLeft:"1em"}}> Llega gratis en 3 dias</p>
                            </div>
                        <p style={{fontSize:"13px",textAlign:"left",marginTop:"-2rem",marginLeft:"5.2em",color:"grey"}}>Comprando hoy</p>
                        <p style={{fontSize:"13px",textAlign:"left",marginTop:"-1rem",marginLeft:"5.2em",color:"#3483fa"  }}> Ver mas formas de entrega</p>
                        
                        <h5> Devolucion gratuita</h5>
                        <p style={{fontSize:"13px",textAlign:"left",marginTop:"-1.5rem",marginLeft:"1.3em",color:"grey"}}>Tenés 30 días desde que lo recibís.</p>
                        <p>Stock Disponible</p>
                        <p>Cantidad:
                        <select className="select-quantity-product-detail"name="" id="">
                            <option> 1 Unidad</option>
                            {
                                prueba?.map((item,i) =>{
                                    return(
                                        <option>
                                            {i+2} Unidades
                                        </option>
                                    )
                                })
                            }  
                            </select>         
                            </p>
                        
                        <div className="button-buy-product-detail">
                            <button className="button-primary-product-detail">Comprar ahora</button>
                            <button onClick={AddToBasket} className="button-secondary-product-detail">Agregar al carrito</button>
                        </div>
                        <svg className="ui-pdp-icon ui-pdp-icon--protected ui-pdp-color--GRAY" xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15"><use href="#protected_buy"></use></svg><p style={{fontSize:"12px",textAlign:"left"}}>Compra Protegida, recibí el producto que esperabas o te devolvemos tu dinero.</p>
                        <p style={{fontSize:"12px",textAlign:"left"}}>Suma Puntos!Con esta compra sumás 107 puntos.</p>
                        <p style={{fontSize:"12px",textAlign:"left"}}>6 meses de garantía de fábrica.</p>
                    </div>
                </div>
                <div className="description-product-detail">
                    <h1>Descripcion:</h1>
                    <p style={{padding:"2rem"}}>{
                    productDetail.description
                    }
                    </p>
                    
                </div>
                <div className="description-product-detail">
                    <h1>Opiniones de usuarios:</h1>
                    
                    
                </div>
            
                
            </div>
        </div>
        </>
    )
}


