/** @format */

import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from './NavBar/NavBar'

export default function Categories() {
    const categories = [
        {
            nombre: "Belleza y cuidado",
            img: "https://www.mypress.mx/img/articulos/6111.jpg",
            link: "/beauty",
        },
        {
            nombre: "Cocina y Hogar",
            img: "https://cdn.popshelf.com/content/dam/popshelf/digital-assets/category/category-home-hero/Category_Kitchen_Gadgets_002.jpg",
            link: "/Cocina",
        },
        {
            nombre: "Deportes",
            img: "https://www.beachvillas.com/travel/wp-content/uploads/2020/11/Return_of_Sports.jpg",
            link:"/Deportes",
        },
        {
            nombre: "Herramientas",
            img: "https://academy.fredsappliance.com/wp-content/uploads/2020/11/tools1.jpg",
            link:"/Herramientas",
        },
        {
            nombre: "Mascotas",
            img: "https://www.america-retail.com/static//2020/01/pets.jpg",
            link:"/Mascotas",
        },
        {
            nombre: "Tecnologia",
            img: "https://s1.eestatic.com/2019/10/11/omicrono/hardware/television-tecnologia-privacidad_435968460_134955767_1024x576.jpg",
            link:"/Tecnologia",
        },
        // {
        //     nombre: "Videojuegos",
        //     img: "https://esports.as.com/2019/03/12/bonus/videojuegos/videojuegos-generan-violencia_1226287403_196802_1440x810.jpg",
        //     link:"/beauty",
        // },
    ];
    return (
        <>
        <NavBar/>
        
        <div
            style={{
                
                display: "flex",
                flexWrap: "wrap",
                width:"50%",
                margin:"auto",
                gap: "3em",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "50px",
            }}
        >
            {categories.map((element,i) => {
                return (
                    <div key={i}>
                        <img
                            style={{
                                width: "400px",
                                height: "100px",
                                objectFit: "cover",
                                borderRadius: "10px",
                            }}
                            src={element.img}
                            alt=""
                        />
                        <div style={{ fontSize: "36px" }}>
                            <Link style={{textDecoration:"none",color:"black"}} to={element.link}>{element.nombre}</Link>
                        </div>
                    </div>
                );
            })}
        </div>
        </>
    );
}
