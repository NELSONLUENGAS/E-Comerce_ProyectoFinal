/** @format */

////////////////////////////
////Mapeo de los productos
// Aunque tendriamos que hacer un filtro
//para cada categoria, luego lo hago cuando tenga tiempo
//////////////////////////
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Product from "../Product/Product";
import { useState } from "react";
import Paginado from "../Paginado/Paginado";
import NavBarTwo from "../NavBar/NavBar";
import { useSearchParams } from "react-router-dom";
import {
    getProducts,
    getBasket,
    getCategories,
    filterBy2Price,
    getCategoriesByName,
    getUserSigningIn,
    filterByCategory,
    filterFreeShipping,
    filterByPrice,
    filterMoreSeller,
    filterToday,
    orderByPrice,
} from "../../actions/index";
import Ofertas from "../Ofertas/Ofertas";
import Carrousel from "../Carrousel/Carrousel";
import { useDispatch, useSelector } from "react-redux";
import "./Products.css";
import { useLocalStorage } from "../../useLocalStorage";
import Advertising from "../Advertising/Advertising";
import { putOrderState } from "../../actions/index";

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
    };
    const user = useSelector((state) => state.User);
    const sumBasketBack = useSelector((state) => state.SumPriceBack);
    const [localStorageVar, setLocalStorageVar] = useState("");
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
    const [checkFreeShipping, setCheckFreeShipping] = useState(false);
    const [checkToday, setCheckToday] = useState(false);
    const [checkMoreSeller, setCheckMoreSeller] = useState(false);
    const [sortOf, SetsortOf] = useState("Relevant");
    const [Numberinput, setinputNumber] = useState({
        numberMin: "",
        numberMax: "",
    });
    const { numberMin, numberMax } = Numberinput;
    const onChange = (e) => {
        setinputNumber({
            ...Numberinput,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmitt = (e) => {
        console.log("entre al boton de precio");
        e.preventDefault();
        dispatch(filterBy2Price(numberMin, numberMax));
    };

    function handleCategories(e) {
        e.preventDefault();
        setCategoryFilter(e.target.value);
        dispatch(filterByCategory(e.target.value));
    }
    function handleToday() {
        setCheckToday(!checkToday);
        dispatch(filterToday(!checkToday));
    }
    function handleMoreSeller() {
        setCheckMoreSeller(!checkMoreSeller);
        dispatch(filterMoreSeller(!checkMoreSeller));
    }
    function handleFreeShipping() {
        setCheckFreeShipping(!checkFreeShipping);
        dispatch(filterFreeShipping(!checkFreeShipping));
    }
    function handleOrder(e) {
        SetsortOf(e.target.value);
        dispatch(orderByPrice(e.target.value));
        setCurrentPage(1);
    }

    useEffect(() => {
        dispatch(getProducts());
        dispatch(getCategories());
    }, [dispatch]);
    console.log("sumbasketback");
    console.log(sumBasketBack);
    useEffect(() => {
        let inicioSesion = JSON.parse(localStorage.getItem("userData"));
        if (inicioSesion) {
            console.log("sumbasketback");
            console.log(sumBasketBack);
            const fetchData = async () => {
                await dispatch(
                    getUserSigningIn({
                        email: inicioSesion.email,
                        password: inicioSesion.password,
                    })
                );
                await dispatch(getBasket(inicioSesion.email));
                console.log("sumbasketback");
                console.log(sumBasketBack);
                if (queryParams.status === "approved") {
                    const userData = {
                        name: inicioSesion.name,
                        lastname: inicioSesion.lastname,
                        direction: inicioSesion.principalDirection,
                        total: 40500,
                    };
                    console.log(userData);
                    await dispatch(
                        putOrderState(inicioSesion?.email, userData)
                    );
                    alert("El pago ha sido completado");
                    //El llamado al back para cambiar el status de la orden y vaciar el carrito
                }
            };
            fetchData();
        }
    }, []);

    useEffect(() => {
        setCurrentProducts(
            productos?.slice(indexOfFirstProduct, indexOfLastProduct)
        );
        // console.log(categories);
    }, [
        productos,
        currentPage,
        categoryFilter,
        checkFreeShipping,
        checkToday,
        checkMoreSeller,
        sortOf,
    ]);
    // const classes = useStyles();

    return (
        <div style={{ backgroundColor: "#EBEBEB" }}>
            <NavBarTwo />
            <Carrousel />
            <Ofertas />
            <Advertising
                img={[
                    "https://http2.mlstatic.com/D_NQ_961158-MLA49576115480_042022-C.webp",
                    "https://http2.mlstatic.com/D_NQ_628830-MLA49448744109_032022-C.webp",
                ]}
            />

            <div className="container-products">
                <div className="div-margin-left"></div>
                <div className="div-filter-products">
                    <div className="div-filter-categories-products">
                        <p>Categorias</p>
                        <select
                            value={categoryFilter}
                            onChange={(e) => handleCategories(e)}
                        >
                            <option value="Todas">Todas</option>
                            {categories?.map((item, i) => {
                                return (
                                    <option value={item.nombre} key={i}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="div-filter-today-products">
                        <p style={{ marginBottom: "0" }}>Llegan hoy</p>
                        <label className="switch">
                            <input
                                checked={checkToday}
                                onChange={handleToday}
                                type="checkbox"
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div className="div-filter-today-products">
                        <p style={{ marginBottom: "0" }}>Mas vendidos</p>
                        <label className="switch">
                            <input
                                checked={checkMoreSeller}
                                onChange={handleMoreSeller}
                                type="checkbox"
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div className="div-filter-today-products">
                        <p style={{ marginBottom: "0" }}>Envio Gratis</p>
                        <label className="switch">
                            <input
                                checked={checkFreeShipping}
                                onChange={handleFreeShipping}
                                type="checkbox"
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div className="div-filter-price-products">
                        <p>Precio</p>
                        <input
                            
                            type="number"
                            value={numberMin}
                            name="numberMin"
                            placeholder="Minimo.."
                            onChange={onChange}
                        />
                        <input
                            type="number"
                            placeholder="Maximo.."
                            value={numberMax}
                            name="numberMax"
                            onChange={onChange}
                        />
                        <button                           
                            onClick={onSubmitt}
                        >
                            Enter
                        </button>
                    </div>
                </div>

                <div className="div-catalogue-products">
                    <div className="div-order-products">
                        <p>Ordenar por</p>
                        <select
                            name=""
                            id=""
                            value={sortOf}
                            onChange={(e) => handleOrder(e)}
                           
                        >
                            <option value="Relevant"> Mas relevantes</option>
                            <option value="asc"> Menor precio</option>
                            <option value="desc"> Mayor precio</option>
                        </select>
                    </div>
                    {currentProducts[0]?.name ? (
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
                        ))
                    ) : (
                        <div>
                            No se han encontrado productos relacionados a la
                            busqueda
                        </div>
                    )}
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
