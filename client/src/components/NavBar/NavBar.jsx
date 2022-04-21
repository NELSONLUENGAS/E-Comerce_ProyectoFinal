/** @format */

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { gapi, loadAuth2 } from 'gapi-script'
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Logo from '../../svg/latcom1.png'
import { useDispatch, useSelector } from "react-redux";
import SearchBar from './SearchBar'
import { products } from "./Products";
import {getBasket,getCategoriesByName,cargarCarrito,getUserSigningIn,vaciarCarrito,logOut} from '../../actions/index'
import toast, { Toaster } from 'react-hot-toast';

export default function NavBar() {
    const dispatch= useDispatch()
    const Cerrado = () => toast.success(`${user.name} Latcom estara encantado de que vuelvas con nosotros!`, {duration: 5000,})
    const carrito = useSelector(state=>state.SumItemsBack)
    const ItemsAmount = useSelector(state=>state.ItemsAmount)
    const navigate = useNavigate()
    //////////////__States__///////////////////
    const [expand, setExpand] = useState({
        profile: false,
        category: false,
        subCategory: false,
        mobile: false,
        location: false,
        filterSub: "",
        details: false,
        mobileNav:false,
    });

    ////////___Aux___/////////////////////
    let filter = expand.filterCat;
    const category = products.map((categ) => filter && categ[filter]);
    const subCate = category[0]?.subCate;
    const imgCate= category[0]?.image;

    ///////____Functions___////////////
    function categoryFilter(e) {
        e.preventDefault();
        setExpand({
            ...expand,
            subCategory: true,
        });
        //dispatch(getCategoriesByName())
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
    function locationMobile(e) {
        e.preventDefault();
       navigate('/user/adress')
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
    
    function handleLogout(){
        localStorage.removeItem('userData');  
        const auth2 = gapi.auth2?.getAuthInstance();  
        
        if(auth2){
            auth2.signOut().then(() => {
            });            
        }
        dispatch(logOut())
        dispatch(vaciarCarrito())
        Cerrado()
        navigate("/SignIn")
    }

    function addAdress(e) {
        e.preventDefault();
        setExpand({
            ...expand,
            location: false,
        });
        navigate('/user/addAdress')
    }
    const user = useSelector((state) => state.User);
    // useEffect(() => {
    //     dispatch(getBasket(user.email));    
    // },[dispatch])
    function capitalLetter(){
        let capitalLetter = user.name;
        return capitalLetter = capitalLetter[0].toUpperCase();
    }
    useEffect(() => {
        let inicioSesion =JSON.parse(localStorage.getItem('userData'))
        if(inicioSesion){
            const fetchData = async () => {
                await   dispatch(getUserSigningIn({
                    'email':inicioSesion.email,
                    'password':inicioSesion.password
                }))
                await dispatch(getBasket(inicioSesion.email))
            }
            fetchData()
        }
    }, []);

    return (<>
            <div className="container-global-navbar">
            <Toaster 
            position="top-center"
            reverseOrder={false}

            />
                <div className="div-container-1-navbar">
                                             
                        {expand.mobile ? (
                                <>
                                
                                <div className="container-mobile-menu-navbar">
                                    <div style={{display:"flex",marginTop:"5rem",flexDirection:'column',justifyContent:"flex-start",alignItems:"flex-start",height:"100%",width:"100%"}}>
                                        <div style={{display:"flex",flexDirection:"column",height:"15%",backgroundColor:"#023047",width:"100%",alignItems:'flex-start'}}>
                                        
                                            {user.name ? ( <>
                                                <div style={{display:"flex",flexDirection:"row",alignItems:"center",marginLeft:"2rem"}}>
                                                    <div className="profile-icon-navbar">
                                                        {capitalLetter()}
                                                    </div>  
                                                <span style={{color:"#fff"}}>{user.name}</span>
                                                 </div>
                                        
                                            </>):(<>
                                                <Link to="/SignIn" style={{textDecoration:"none",color:"#fff"}}><div className="sign-mobile-navbar"><h4>Ingresar</h4></div></Link>
                                                <Link to="/SignUp" style={{textDecoration:"none",color:"#fff"}}><div className="sign-mobile-navbar"><h4>Registrarse</h4></div></Link>
                                            </>)}
                                            <button onClick={mobileOpen}> <CloseIcon style={{position:"absolute",top:"1.7rem",left:"2.5rem"}}/>     </button>

                                        </div>
                                        
                                        <div style={{display:"flex",alignItems:"flex-start",flexDirection:"column",width:"100%",height:"80%",backgroundColor:"#C0C0C0",justifyContent:"flex-start"}}>
                                        
                                            <div style={{marginTop:"2rem",textAlign:"left"}}>
                                                <Link to="/" style={{textDecoration:"none",color:"#000"}}><div className="sign-mobile-navbar"><h5>Inicio</h5></div></Link>
                                                {user.name ? (<>
                                                <Link to="/user/profile" style={{textDecoration:"none",color:"#000"}}><div className="sign-mobile-navbar"><h5>Mi Perfil</h5></div></Link>
                                                <Link to="/user/myShop" style={{textDecoration:"none",color:"#000"}}><div className="sign-mobile-navbar"><h5>Mis Compras</h5></div></Link>
                                                <Link to="/user/favorites" style={{textDecoration:"none",color:"#000"}}><div className="sign-mobile-navbar"><h5>Favoritos</h5></div></Link>
                                                <Link to="/" onClick={handleLogout}style={{textDecoration:"none",color:"#000"}}><div className="sign-mobile-navbar"><h5>Log Out</h5></div></Link>
                                                </>):null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                
                                
                                
                                </>    ): <div className="container-mobile-open-menu-navbar"><button onClick={mobileOpen}><MenuIcon /></button></div>}
                                
                            
                    <div className="logo-navbar">
                        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                            <img src={Logo} style={{width:"200px"}} alt="Icono empresa" />
                        </Link>
                    </div>
                    {!expand.mobile ?(
                    <SearchBar/>
                    ):null}
                </div>
                <div className="div-container-2-navbar">
                    <div>
                        <div onMouseOver={modalDown} className="div-container-1-bottom-location-navbar">
                        {user.name ? ( <><button className="button-location-navbar" onClick={(e)=> navigate('/user/adress')}>
                                <LocationOnIcon />
                            </button>
                            <button className="button-location-mobile-navbar" onClick={locationMobile}>
                            <LocationOnIcon />
                        </button>
                        </>):(<><button className="button-location-mobile-navbar" onClick={(e)=> navigate('/SignIn')}>
                                <LocationOnIcon />
                            </button>
                            <button className="button-location-navbar" onClick={(e)=> navigate('/SignIn')}>
                                <LocationOnIcon />
                            </button>
                            </>)}
                           
                            <div className="div-text-direction-navbar"> 
                                <div>
                                    {user.name? (<span>Enviar a {user.name}</span>):(<span>Enviar a </span>)}
                                </div>
                                
                                {user.name? (<span>Calle {user.principalDirection[0]?.direction}</span>):<span>Capital Federal</span>}
                            </div>
                            
                                {expand.location && (

                                    !expand.mobile ?(

                                    <div className="modal-container-adress-navbar">
                                        <h5>Elegí dónde recibir tus compras</h5>
                                        <h6>En una de tus direcciones:</h6>
                                        <div className="modal-div-adress-navbar">
                                            {!user.name? (<Link to="/SignIn"><h5>Por favor incia sesion</h5> </Link>):(<div>
                                            <div className="container-adress-navbar">
                                                
                                                {user.directions.map((element,i) =>{
                                                    return (<div className="div-adress-navbar" key={i}>
                                                                <input className="radio-adress-navbar" type="radio" />
                                                                <div>
                                                                 <label for={i} >
                                                                    <h4>Calle: {element.direction}</h4>
                                                                    <h6>CP: {element.postalcode}-{element.city},{element.province} </h6>
                                                                </label>
                                                                </div>
                                                            </div>
                                                    )
                                                })}
                                                <div className="div-adress-navbar" style={{color:"#3483fa",padding:"1rem",cursor:'pointer'}} onClick={addAdress}> + Agregar nueva direccion</div>
                                                <div className="div-final-buttons-add-adress-navbar">
                                                     <button className="cancel-adress-navbar"onClick={modalOpen}>Cancelar</button>
                                                     <button className="save-changes-adress-navbar"onClick={modalOpen}>Guardar cambios</button>
                                                </div>
                                        
                                            </div>
                                            </div> )}
                                           
                                        </div>
                                        
                                    </div>):(null)
                            )}
                        </div>
                    </div>
                    <div className="space-between-location-profile-navbar"></div>
                    <div className="div-container-profile-divs-navbar">
                        <div className="div-container-3-bottom-profile-navbar">
                        {user.name ? ( <>
                            <span>{user.name}</span>
                            <label onMouseOver={profile} >
                                { user.name? ( 
                                    <div className="profile-icon-navbar">
                                        {capitalLetter()}
                                    </div>
                                ):<AccountCircleIcon />}
                            </label>
   
                        
                            {expand.profile && (!user.name? (
                                <div className="expand-profile-navbar">
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
                                </div>):(
                                <div className="expand-profile-navbar">
                                    <Link
                                        to="/user/profile"
                                        style={{
                                            textDecoration: "none",
                                            color: "black",
                                        }}
                                    >
                                        <option>Mi Perfil</option>
                                    </Link>
                                    <Link
                                        to="/"
                                        style={{
                                            textDecoration: "none",
                                            color: "black",
                                        }}
                                    >
                                        <option onClick={handleLogout}>Log Out</option>
                                    </Link>
                                </div>
                                )
                            )}
                            </>):null}
                        </div>
                        <div onMouseOver={modalDown} className="div-container-2-bottom-links-navbar">
                            
                            {user.name ? (
                            <>
                            <Link to="/user/myShop" style={{textDecoration:"none",color:"#fff"}}>Mis Compras</Link>
                            <Link to="/user/favorites" style={{textDecoration:"none",color:"#fff"}}>Favoritos</Link>
                            </>
                            ): (
                                <>
                                <Link to="/SignUp" style={{color:"white",textDecoration:"none"}}>Creá tu cuenta</Link> 
                                <Link to="/SignIn" style={{color:"white",textDecoration:"none"}}>Ingresá</Link>
                                </> 
                            )}
                        </div>
                        <div className="div-container-4-bottom-basket-navbar">
                        <label>
                            <Link to="/checkout-page">
                                <ShoppingCartIcon />
                            </Link>
                        </label>
                        { carrito>0 && user.email ? <span>{carrito}</span>: ItemsAmount>0 && !user.email ? <span>{ItemsAmount}</span>:null}
                        </div>
                    </div>    
                </div>
            </div>
        </>);
}
