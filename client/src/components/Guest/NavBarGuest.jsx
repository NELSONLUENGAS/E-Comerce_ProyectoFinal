/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NavBarGuest.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Logo from '../../svg/latcom1.png'
import { useSelector } from "react-redux";

import { products } from "./Products";

export default function NavBarGuest() {

    const carrito = useSelector(state=>state.ItemsAmount)

    //////////////__States__///////////////////
    const [expand, setExpand] = useState({
        profile: false,
        category: false,
        subCategory: false,
        mobile: false,
        location: false,
        filterCat: "",
        filterSub: "",
        details: false,
    });

    ////////___Aux___/////////////////////
    let filter = expand.filterCat;
    const category = products.map((categ) => filter && categ[filter]);
    const subCate = category[0].subCate;
    const img = category[0].image;

    ///////____Functions___////////////
    function categoryFilter(e) {
        e.preventDefault();
        setExpand({
            ...expand,
            filterCat: e.target.value,
            subCategory: true,
        });
    }
    function handleSelect(e) {
        e.preventDefault();
        setExpand({
            ...expand,
            filterCat: e.target.value,
            category: false,
        });
    }
    function location(e) {
        e.preventDefault();
        setExpand({
            ...expand,
            location: true,
        });
    }
    function modal(e) {
        e.preventDefault();
        setExpand({
            ...expand,
            category: true,
        });
    }
    function mobileOpen(e) {
        e.preventDefault();
        let open = expand.mobile;
        setExpand({
            ...expand,
            mobile: !open,
        });
    }
    function modalOpen(e) {
        e.preventDefault();
        setExpand({
            ...expand,
            location: false,
        });
    }
    function modalDown(e) {
        e.preventDefault();
        setExpand({
            ...expand,
            subCategory: false,
            category: false,
            profile: false,
            filterCat: "",
            filterSub: "",
        });
    }
    function moreDetails(e) {
        e.preventDefault();
        let details = expand.details;
        setExpand({
            ...expand,
            details: !details,
        });
    }
    function profile(e) {
        e.preventDefault();
        setExpand({
            ...expand,
            profile: true,
            category: false,
        });
    }
    function subCategory(e) {
        e.preventDefault();
        setExpand({
            ...expand,
            filterSub: e.target.value,
            subCategory: false,
            category: false,
        });
    }
    console.log(carrito)
    useEffect(() => {
      
    })

    return (
        <>
            <div className="customerGrid">
                <div onMouseOver={modalDown} className="cusElement1">
                    <Link
                        to="/"
                        style={{ textDecoration: "none", color: "black" }}
                    >
                        
                    <img src={Logo} style={{width:"200px"}} alt="Icono empresa" />
                    </Link>
                </div>
                <div onMouseOver={modalDown} className="cusElement2">
                    <input type="search" placeholder="Buscar..." />
                </div>
                <div onMouseOver={modalDown} className="cusElement3">
                    <button onClick={mobileOpen}>
                        {expand.mobile ? <CloseIcon /> : <MenuIcon />}
                    </button>
                    <div>
                        <label>
                            <ShoppingCartIcon />
                        </label>
                        <span>1</span>
                    </div>
                </div>
                <div onMouseOver={modalDown} className="cusElement4">
                    <button onClick={location}>
                        <LocationOnIcon />
                    </button>
                    <Link to="/Location">
                        <label>
                            <LocationOnIcon />
                        </label>
                    </Link>
                    <div>
                        <span>Enviar a</span>
                        <span>Ciudad</span>
                    </div>
                </div>
                <div className="cusElement5">
                    <span onMouseOver={modal}>
                        <Link style={{color:"white",textDecoration:"none"}} to="/Categories">Categorías </Link>
                    </span>
                </div>
                <div onMouseOver={modalDown} className="cusElement6"></div>
                <div className="cusElement7">
                    <Link to="/SignIn" style={{color:"white",textDecoration:"none"}}>Ingresa</Link>
                    <label onMouseOver={profile}>
                        <AccountCircleIcon />
                    </label>
                </div>
                <div onMouseOver={modalDown} className="cusElement8">
                    <span>Mis Compras</span>
                    <span>Favoritos</span>
                </div>
                <div onMouseOver={modalDown} className="cusElement9">
                    <label>
                        <Link to="/checkout-page">
                            <ShoppingCartIcon />
                        </Link>
                    </label>
                    { carrito>0 ? <span>{carrito}</span>:null}
                </div>
                <div className="cusElement02"></div>
                {/* <div onMouseOver={modalDown} className="cusElement03"></div> */}
                {expand.category && (
                    <div className="cusElement0">
                        <div className="categories">
                            <div>
                                <option
                                    onMouseOver={categoryFilter}
                                    onClick={handleSelect}
                                    value="Belleza"
                                >
                                    Belleza y Cuidado
                                </option>
                                <ArrowRightIcon />
                            </div>
                            <div>
                                <option
                                    onMouseOver={categoryFilter}
                                    onClick={handleSelect}
                                    value="Hogar"
                                >
                                    Cocina y Hogar
                                </option>
                                <ArrowRightIcon />
                            </div>
                            <div>
                                <option
                                    onMouseOver={categoryFilter}
                                    onClick={handleSelect}
                                    value="Deporte"
                                >
                                    Deportes{" "}
                                </option>
                                <ArrowRightIcon />
                            </div>
                            <div>
                                <option
                                    onMouseOver={categoryFilter}
                                    onClick={handleSelect}
                                    value="Herramientas"
                                >
                                    Herramientas
                                </option>
                                <ArrowRightIcon />
                            </div>
                            <div>
                                <option
                                    onMouseOver={categoryFilter}
                                    onClick={handleSelect}
                                    value="Mascotas"
                                >
                                    Mascotas
                                </option>
                                <ArrowRightIcon />
                            </div>
                            <div>
                                <option
                                    onMouseOver={categoryFilter}
                                    onClick={handleSelect}
                                    value="Tecnologia"
                                >
                                    Tecnología
                                </option>
                                <ArrowRightIcon />
                            </div>
                            <div>
                                <option
                                    onMouseOver={categoryFilter}
                                    onClick={handleSelect}
                                    value="Videojuegos"
                                >
                                    Videojuegos
                                </option>
                                <ArrowRightIcon />
                            </div>
                        </div>
                        {expand.subCategory && subCate && (
                            <div className="subcategories">
                                {subCate?.map((el) => (
                                    <option key={el} onClick={subCategory}>
                                        {el}
                                    </option>
                                ))}
                            </div>
                        )}
                        {/* {expand.subCategory && img && (
                            <div className="imgCat">
                                {img?.map((img) => (
                                    <img key={img} src={img} alt="Imagen" />
                                ))}
                            </div>
                        )} */}
                    </div>
                )}
                <div className="cusElement01">
                    {expand.profile && (
                        <div className="guest">
                            <Link
                                to="/SignIn"
                                style={{
                                    textDecoration: "none",
                                    color: "black",
                                }}
                            >
                                <option>Iniciar Sesion</option>
                            </Link>
                            <Link
                                to="/SignUp"
                                style={{
                                    textDecoration: "none",
                                    color: "black",
                                }}
                            >
                                <option>Registrarse</option>
                            </Link>
                        </div>
                    )}
                </div>
                {expand.location && (
                    <div className="modalLocation">
                        <div className="locModal0">
                            <h1>Decide el destino de tú pedido</h1>
                            <div className="locModal2">
                                <h3>Destino</h3>
                                <div>
                                    <select>
                                        <option hidden disable="true" value="">
                                            Departamento
                                        </option>
                                        <option value="">departamento</option>
                                        <option value="">departamento</option>
                                        <option value="">departamento</option>
                                        <option value="">departamento</option>
                                        <option value="">departamento</option>
                                        <option value="">departamento</option>
                                    </select>
                                    <select>
                                        <option hidden disable="true" value="">
                                            Ciudad
                                        </option>
                                        <option value="">departamento</option>
                                        <option value="">departamento</option>
                                        <option value="">departamento</option>
                                        <option value="">departamento</option>
                                        <option value="">departamento</option>
                                    </select>
                                    <button onClick={modalOpen}>Aceptar</button>
                                </div>
                                <div>
                                    <button onClick={moreDetails}>
                                        <span>
                                            <AddCircleIcon />
                                        </span>
                                        <span>Agregar más detalles</span>
                                    </button>
                                </div>
                                {expand.details && (
                                    <div className="locModal1">
                                        <label>
                                            <input
                                                type="text"
                                                placeholder="Nombre y Apellido"
                                            />
                                        </label>
                                        <label>
                                            <input
                                                type="text"
                                                placeholder="Número de contacto"
                                            />
                                        </label>
                                        <label>
                                            <input
                                                type="text"
                                                placeholder="Barrio(Opcinal)"
                                            />
                                        </label>
                                        <label>
                                            <input
                                                type="text"
                                                placeholder="Dirrección"
                                            />
                                        </label>
                                        <label>
                                            <input
                                                type="text"
                                                placeholder="Datos Adicionales(Opcinal)"
                                            />
                                        </label>
                                    </div>
                                )}
                            </div>
                            <div className="locModal3">
                                <button onClick={modalOpen}>cancelar</button>
                                <button onClick={modalOpen}>
                                    Guardar cambios
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
