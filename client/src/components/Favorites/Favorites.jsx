import React, {useState, useEffect} from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {getProducts, getOrdersUser} from '../../actions/index';
import {useSelector, useDispatch} from 'react-redux';
import FavoritesDetail from './FavoritesDetail';
import './Favorites.css';
import NavBar from '../NavBar/NavBar';

export default function Favorites(){
    const dispatch = useDispatch();
    
    const products = useSelector((state) => state.products);
    const currentProducts=products.slice(1,4)
    console.log(products)

    useEffect(() => {
        dispatch(getProducts());
    } , [dispatch]);

    return (
        <>
        <NavBar/>
        <div className="container-compras">
            <div className="container-title-compras">
                <h3 style={{textAlign:"left"}}>Favoritos</h3>
            </div>
        
            <div className="container-compras-detail" >
                {currentProducts.length ? currentProducts.map((product) => <FavoritesDetail key={product.id} price={product.price} image={product.image} id={product.id} name={product.name} />) : <div>No hay ordenes creadas</div>}
            </div>
        </div>
        </>
    )
}