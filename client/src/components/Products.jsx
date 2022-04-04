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
    getCategoriesByName,
} from "../actions/index";
import Carrousel from "./Carrousel";
import { useDispatch, useSelector } from "react-redux";

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
    console.log(queryParams);
    /*------------------------------------ */
    /*------------------------------------ */

    useEffect(() => {
        dispatch(getProducts());
        dispatch(getCategories());
    }, [dispatch]);
    const [categoryFilter, setCategoryFilter] = useState("Todas");
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

    useEffect(() => {
        setCurrentProducts(
            productos?.slice(indexOfFirstProduct, indexOfLastProduct)
        );
        console.log(categories);
    }, [productos, currentPage]);
    const classes = useStyles();

    function handleCategories(e) {
        if(e.target.value ==='Todas'){
            console.log("entre aca")
            e.preventDefault();    
            setCategoryFilter(e.target.value);
            setCurrentPage(1);
            dispatch(getProducts());
        } else{
        e.preventDefault();
        setCategoryFilter(e.target.value);
        setCurrentPage(1);
        dispatch(getCategoriesByName(e.target.value));
        console.log(e.target.value);
    }
    }
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
                            textAlign:"left"
                        }}
                    >
                    <p style={{marginBottom:"0"}}>Llegan hoy</p>
                    </div>
                    <div
                        style={{
                            backgroundColor: "white",
                            borderRadius: "0.3em",
                            marginTop: "1em",
                            padding: "1em",
                            textAlign:"left",
                        }}
                    >
                    <p style={{marginBottom:"0"}}>Mas vendidos</p>
                    </div>
                    <div
                        style={{
                            backgroundColor: "white",
                            borderRadius: "0.3em",
                            marginTop: "1em",
                            padding: "1em",
                            textAlign:"left",                      
                        }}
                    >
                    <p style={{marginBottom:"0"}}>Envio Gratis</p>
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
                            style={{
                                border: "transparent",
                                marginLeft: "1rem",
                                backgroundColor: "#EBEBEB",
                                height: "25px",
                            }}
                        >
                            <option> Mas relevantes</option>
                            <option> Menor precio</option>
                            <option> Mayor precio</option>
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
