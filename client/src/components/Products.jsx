/** @format */

////////////////////////////
////Mapeo de los productos
// Aunque tendriamos que hacer un filtro
//para cada categoria, luego lo hago cuando tenga tiempo
//////////////////////////
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Product from "./Product";
import { useState } from "react";
import Paginado from "../components/Paginado";
import NavBarGuest from "./Guest/NavBarGuest";
import { useSearchParams } from "react-router-dom";
import {
    getProducts,
    getCategories,
    getCategoriesByName,filterByCategory,filterFreeShipping,filterByPrice,filterMoreSeller,filterToday,orderByPrice
} from "../actions/index";
import Carrousel from "./Carrousel";
import { useDispatch, useSelector } from "react-redux";
import './Products.css'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
}));

export default function Products() {
    const dispatch = useDispatch();
    /*------------------------------------ */
    /*------Datos de la compra------------ */
    const [params] = useSearchParams();
    const queryParams = {
        payment_id: params.get("payment_id"),
        status: params.get("status"),
        payment_type: params.get("payment_type"),
        external_reference: params.get("external_reference"),
    }
    // console.log(queryParams);
    /*------------------------------------ */
    /*------------------------------------ */

    useEffect(() => {
        dispatch(getProducts());
        dispatch(getCategories());
    }, [dispatch]);
    const productos = useSelector((state) => state.products);
    const categories = useSelector((state) => state.categories);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const [currentProducts, setCurrentProducts] = useState(
        productos.slice(indexOfFirstProduct, indexOfLastProduct)
    );

    function paginado(pageNumber) {
        setCurrentPage(pageNumber);
    }

    

    const [categoryFilter, setCategoryFilter] = useState("Todas");
    const [checkFreeShipping,setCheckFreeShipping]=useState(false)
    const [checkToday,setCheckToday]=useState(false)
    const [checkMoreSeller,setCheckMoreSeller]=useState(false)
    const [sortOf,SetsortOf]=useState('Relevant')


    
    function handleCategories(e) {
        e.preventDefault();    
        dispatch(filterByCategory(e.target.value))
        dispatch(getProducts());
    }
    function handleToday(){
        setCheckToday(!checkToday);
        dispatch(filterToday(!checkToday))
    } 
    function handleMoreSeller(){
        setCheckMoreSeller(!checkMoreSeller);
        dispatch(filterMoreSeller(!checkMoreSeller))
    }
    function handleFreeShipping(){
        setCheckFreeShipping(!checkFreeShipping);
        dispatch(filterFreeShipping(!checkFreeShipping))
    }
    function handleOrder(e){
        SetsortOf(e.target.value)
        dispatch(orderByPrice(e.target.value))
        setCurrentPage(1)
    }
    useEffect(() => {
        setCurrentProducts(
            productos?.slice(indexOfFirstProduct, indexOfLastProduct)
        );
        // console.log(categories);
    }, [productos, currentPage,categoryFilter,checkFreeShipping,checkToday,checkMoreSeller,sortOf]);
    const classes = useStyles();
    return (
        <div style={{ backgroundColor: "#EBEBEB" }}>
            <NavBarGuest/>
            <Carrousel />

            <div
                style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "row",
                    justifyContent:"flex-start",
                    gap: "100px",
                }}
            >
                <div style={{ width: "10%" }}></div>
                <div style={{ width: "15%"}}>
                    <div
                        style={{
                            backgroundColor: "white",
                            borderRadius: "0.3em",
                            marginTop: "5rem",
                            padding: "0.5em",
                        }}
                    >
                        <p>Categorias</p>
                        <select onChange={(e) => handleCategories(e)}>
                            <option value="Todas">Todas</option>
                            {categories?.map((item, i) => {
                                return (
                                    <option
                                        value={item.nombre}
                                        key={item.nombre}
                                    >
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div
                        style={{
                            backgroundColor: "white",
                            borderRadius: "0.3em",
                            marginTop: "1em",
                            padding: "1em",
                            textAlign:"left",
                            display:"flex",
                            flexDirection:"row",
                            justifyContent:"space-between"

                        }}
                    >

                    <p style={{marginBottom:"0"}}>Llegan hoy</p>
                    <label className="switch">
                        <input checked={checkToday} onChange={handleToday} type="checkbox"/>
                        <span class="slider round"></span>
                    </label>
                    </div>
                    <div
                        style={{
                            backgroundColor: "white",
                            borderRadius: "0.3em",
                            marginTop: "1em",
                            padding: "1em",
                            textAlign:"left",
                            display:"flex",
                            flexDirection:"row",
                            justifyContent:"space-between"
                        }}
                    >
                    <p style={{marginBottom:"0"}}>Mas vendidos</p>
                    <label className="switch">
                        <input checked={checkMoreSeller} onChange={handleMoreSeller} type="checkbox"/>
                        <span class="slider round"></span>
                    </label>
                    </div>
                    <div
                        style={{
                            backgroundColor: "white",
                            borderRadius: "0.3em",
                            marginTop: "1em",
                            padding: "1em",
                            textAlign:"left",
                            display:"flex",
                            flexDirection:"row",
                            justifyContent:"space-between"                     
                        }}
                    >
                    <p style={{marginBottom:"0"}}>Envio Gratis</p>
                    <label className="switch">
                        <input checked={checkFreeShipping} onChange={handleFreeShipping} type="checkbox"/>
                        <span class="slider round"></span>
                    </label>
                    </div>
                    <div
                        style={{
                            backgroundColor: "white",
                            borderRadius: "0.3em",
                            marginTop: "1em",
                            padding: "0.5em",
                        }}
                    >
                    <p>Precio</p>                  
                    <input
                        style={{
                            marginLeft: "5px",
                            width: "95px",
                            fontSize: "14px",
                            borderRadius:"0.5em",
                            padding:"0.1em",
                            paddingLeft:"0.5em"
                        }}
                        type="number"
                        placeholder="Minimo.."
                    />
                    <input
                        style={{
                            marginLeft: "5px",
                            width: "95px",
                            fontSize: "14px",
                            borderRadius:"0.5em",
                            padding:"0.1em",
                            paddingLeft:"0.5em"
                        }}
                        type="number"
                        placeholder="Maximo.."
                    />
                    <button
                        style={{
                            marginLeft: "5px",
                            width: "50px",
                            fontSize: "12px",
                            borderRadius: "5px",
                        }}
                    >
                        Enter
                    </button>
                </div>
                </div>

                <div
                    style={{
                        width: "50%",
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: "1rem",
                        marginTop: "5rem",
                        position: "relative",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            right: "10rem",
                            top: "-3rem",
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <p>Ordenar por</p>
                        <select
                            name=""
                            id=""
                            value={sortOf}
                            onChange={(e) => handleOrder(e)}
                            style={{
                                border: "transparent",
                                marginLeft: "1rem",
                                backgroundColor: "#EBEBEB",
                                height: "25px",
                            }}
                        >
                            <option value="Relevant"> Mas relevantes</option>
                            <option value="asc"> Menor precio</option>
                            <option value="desc"> Mayor precio</option>
                        </select>
                    </div>
                   { productos[0]? (
                       currentProducts?.map((product) => (
                        <Product
                            name={product.name}
                            image={product.image}
                            price={product.price}
                            description={product.description}
                            key={product.id}
                            quantitiy={product.stock}
                            id={product.id}
                            stock={product.stock}
                        />
                    ))):<div>No se han encontrado productos relacionados a la busqueda</div>}
                </div>
            </div>
            <Paginado
                allProducts={productos}
                currentPage={currentPage}
                productsPerPage={productsPerPage}
                paginado={paginado}
            />
        </div>
    );
}
