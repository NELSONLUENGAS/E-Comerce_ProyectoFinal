/** @format */

////////////////////////////
////Mapeo de los productos
// Aunque tendriamos que hacer un filtro
//para cada categoria, luego lo hago cuando tenga tiempo
//////////////////////////
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Product from "./Product";
import { products } from "../Inventario";
import { useState } from "react";
import Paginado from "../components/Paginado";
<<<<<<< Updated upstream
=======
import NavBarGuest from "./Guest/NavBarGuest";
import { getProducts } from "../actions/index";
import Carrousel from "./Carrousel";
import { useDispatch, useSelector } from "react-redux";
import Categories from "./Categories";
>>>>>>> Stashed changes

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
}));

export default function Products() {
<<<<<<< Updated upstream
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 3;
=======
    const categories=[{nombre:"belleza"},{nombre:"tecnologia"}]
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const productos = useSelector((state) => state.products);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;
>>>>>>> Stashed changes
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const [currentProducts, setCurrentProducts] = useState(
        products?.slice(indexOfFirstProduct, indexOfLastProduct)
    );

    function paginado(pageNumber) {
        setCurrentPage(pageNumber);
    }
    useEffect(() => {
<<<<<<< Updated upstream
      setCurrentProducts(
        products?.slice(indexOfFirstProduct, indexOfLastProduct)
    );       
    }, [currentPage]);
    const classes = useStyles();
    return (
        <>
            <div className={classes.root}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    
=======
        setCurrentProducts(
            productos?.slice(indexOfFirstProduct, indexOfLastProduct)
        );
        window.scroll({
            top: 300,
            left: 0,
            behavior: "smooth",
        })

    }, [productos,currentPage]);
    const classes = useStyles();
    return (
        <div style={{ backgroundColor: "#EBEBEB" }}>
            <NavBarGuest />
            <Carrousel />

            <div
                style={{ display: "flex", width: "100%", flexDirection: "row" }}
            >
                <div className="filters-of-products">
                    <p>Categorias</p>
                    <select>
                        {
                            categories.map((item,i) =>{
                                return(
                                    <option key={item.nombre}>
                                        {item.nombre}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <p>Llegan hoy</p>
                    <p>Mas vendidos</p>
                    <p>Precio</p>
                    <p>Envio Gratis</p>
                    <input style={{marginLeft:"5px",width:"75px",fontSize:"12px"}} type="number" placeholder="Minimo.."/>
                    <input style={{marginLeft:"5px",width:"75px",fontSize:"12px"}} type="number" placeholder="Maximo.."/>
                    <button style={{marginLeft:"5px",width:"50px",fontSize:"12px",borderRadius:"5px",}}>Enter</button>
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
>>>>>>> Stashed changes
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
                    {currentProducts.map((product) => (
<<<<<<< Updated upstream
                        <Grid
                        item                              
                            xs={12}
                            sm={12}
                            md={12}
                            lg={3}
                            key={product.id}
                        >
                            <Product
                                name={product.name}
                                image={product.image}
                                producType={product.producType}
                                price={product.price}
                                rating={product.rating}
                                description={product.description}
                                key={product.id}
                            />
                        </Grid>
                    ))}
                </Grid>
=======
                        <Product
                            name={product.name}
                            image={product.image}
                            price={product.price}
                            description={product.description}
                            key={product.id}
                            id={product.id}
                            stock={product.stock}
                        />
                    ))}
                </div>
>>>>>>> Stashed changes
            </div>
            <Paginado
                allProducts={products}
                currentPage={currentPage}
                productsPerPage={productsPerPage}
                paginado={paginado}
            />
        </div>
    );
}
