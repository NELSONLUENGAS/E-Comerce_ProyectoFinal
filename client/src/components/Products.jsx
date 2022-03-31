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

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
}));

export default function Products() {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 3;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const [currentProducts, setCurrentProducts] = useState(
        products?.slice(indexOfFirstProduct, indexOfLastProduct)
    );

    function paginado(pageNumber) {
        setCurrentPage(pageNumber);
    }
    useEffect(() => {
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
                    
                >
                    {currentProducts.map((product) => (
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
            </div>
            <Paginado
                allProducts={products}
                currentPage={currentPage}
                productsPerPage={productsPerPage}
                paginado={paginado}
            />
        </>
    );
}
