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
import Views from '../Views/Views'
import {
    getProducts,
    getBasket,
    getOfertas,
    getCategories,
    filterBy2Price,
    getCategoriesByName,
    getUserSigningIn,
    filterByCategory,
    filterFreeShipping,
    filterByPrice,
    filterMoreSeller,
    filterToday,
    orderByPrice,getUserViews,
} from "../../actions/index";
import Ofertas from "../Ofertas/Ofertas";
import Carrousel from "../Carrousel/Carrousel";
import { useDispatch, useSelector } from "react-redux";
import "./Products.css";
import { useLocalStorage } from "../../useLocalStorage";
import Advertising from "../Advertising/Advertising";
import { putOrderState } from "../../actions/index";
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
  import Logo from '../../svg/latcom1.png'
  
  const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    imagee:{
      with: "200px",
      height: "70px"
    }
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
    const classes = useStyles();
    const [modalInsertar, setStateModalInsectar] = useState(false)
 const CompraCompletada = ()=>setStateModalInsectar(true)
 const cerrarr = ()=>setStateModalInsectar(false)

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
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterBy2Price(numberMin, numberMax));
    };

    function handleCategories(e) {
        e.preventDefault();
        setCurrentPage(1);
        setCategoryFilter(e.target.value);
        dispatch(filterByCategory(e.target.value));
    }
    function handleToday() {
        setCurrentPage(1);
        setCheckToday(!checkToday);
        dispatch(filterToday(!checkToday));
    }
    function handleMoreSeller() {
        setCurrentPage(1);
        setCheckMoreSeller(!checkMoreSeller);
        dispatch(filterMoreSeller(!checkMoreSeller));
    }
    function handleFreeShipping() {
        setCurrentPage(1);
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
        dispatch(getOfertas());
        dispatch(getCategories());
    }, [dispatch]);
    
    useEffect(() => {
        let inicioSesion = JSON.parse(localStorage.getItem("userData"));
        if (inicioSesion) {
            const fetchData = async () => {
                await dispatch(
                    getUserSigningIn({
                        email: inicioSesion.email,
                        password: inicioSesion.password,
                    })
                );
                dispatch(getUserViews({UserEmail: inicioSesion.email}));
                if (queryParams.status === "approved") {
                    const userData = {
                        name: inicioSesion.name,
                        lastname: inicioSesion.lastname,
                        direction: inicioSesion.principalDirection,
                    };
                    await dispatch(
                        putOrderState(inicioSesion?.email, userData)
                    );
                    CompraCompletada()
                    //El llamado al back para cambiar el status de la orden y vaciar el carrito
                }
            };
            fetchData();
        }
    }, [dispatch]);

    useEffect(() => {
        setCurrentProducts(
            productos?.slice(indexOfFirstProduct, indexOfLastProduct)
        );
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
    
    const IniciarCompra =(e)=>{
        e.preventDefault()
        cerrarr()
      } 

    return (
        <div style={{ backgroundColor: "#EBEBEB" }}>
            <NavBarTwo />
            <Carrousel />
            <Ofertas />
            <Views/>
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
              <Modal isOpen={modalInsertar} onRequestClose={()=>setStateModalInsectar(false)}>
                <ModalHeader>
                    <div><img className={classes.imagee} src={Logo}/></div>
                </ModalHeader>
                <form>
                <ModalBody>
                    <FormGroup>
                        <p>
                            {`${user.name}! Tu compra ha sido registrada`}
                        </p>
                        <p>
                            {`Muchas gracias por confiar en Latcom`}
                        </p>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
            
                    <Button
                        color="primary"
                        type="submit"
                        onClick={IniciarCompra}
                    >
                        Aceptar
                    </Button>
          
                </ModalFooter>
                 </form>
            </Modal>
        </div>
    );
}
