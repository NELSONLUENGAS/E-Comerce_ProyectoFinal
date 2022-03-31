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
import { useState } from "react";
import Paginado from "../components/Paginado";
import NavBarGuest from "./Guest/NavBarGuest";
import {getProducts} from '../actions/index'
import Carrousel from './Carrousel'
import {useDispatch,useSelector} from 'react-redux'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
}));

export default function Products() {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getProducts())
    },[dispatch])

    const productos = useSelector(state => state.products)
    console.log(productos); 
        
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
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
    }, [currentPage]);
    const classes = useStyles();
    return (
        <>
        
        <NavBarGuest/>
        <Carrousel/>
        
            <div className={classes.root} >
                <div>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    
                >
                    {currentProducts.map((product) => (
                        <Grid
                        item                              
                            xs={12}
                            sm={12}
                            md={12}
                            lg={4}
                            key={product.id}
                        >
                            <Product 
                                name={product.name}
                                image={product.image}
                                price={product.price}
                                description={product.description}
                                key={product.id}
                            />
                        </Grid>
                    ))}
                </Grid>
                </div>
            </div>
            <Paginado
                allProducts={productos}
                currentPage={currentPage}
                productsPerPage={productsPerPage}
                paginado={paginado}
            />
        </>
    );
}
