
import { useState,useEffect } from "react";
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Paginado({
    allProducts,
    currentPage,
    productsPerPage,
    paginado,
}) {
    //Inicio el paginado con 0 paginas
    const pageNumbers = [];
    //Hago el redondeo hacia abajo y saco la cuenta de cuantas paginas deberia haber
    for (let i = 1; i <= Math.ceil(allProducts.length / productsPerPage); i++) {
        pageNumbers.push(i);
    } //Funcion siguiente, el window scroll para que suba la ventana al apretar el boton. Desaparece cuando no hay mas paginas (en el renderizado)

    const handleChange = (event, value) => {
        paginado(value);
      };
    return (<div style={{display:"flex",justifyContent:"center",marginTop:"1em",marginBottom:"2em"}}>
        
        <Pagination
        variant="outlined" shape="rounded"
        count={pageNumbers.length}
        onChange={handleChange}        
        /> 
        
        </div>
        );
}
