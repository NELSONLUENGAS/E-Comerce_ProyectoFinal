import React, {useState, useEffect} from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {getFavorites, getOrdersUser,deleteFavorite} from '../../actions/index';
import {useSelector, useDispatch} from 'react-redux';
import FavoritesDetail from './FavoritesDetail';
import './Favorites.css';
import NavBar from '../NavBar/NavBar';

export default function Favorites(){
    const dispatch = useDispatch();
    const user = useSelector((state) => state.User);
    const currentProducts = useSelector((state) => state.favorites);

    useEffect(() => {
       dispatch(getFavorites(user.email));
            
    } , [dispatch]);
   
    return (
        <>
        <NavBar/>
        <div className="container-favorites">
            <div className="container-title-favorites">
                <h3 style={{textAlign:"left"}}>Favoritos</h3>
            </div>
        
            
                {currentProducts.length ? currentProducts.map((product) => <FavoritesDetail key={product.wishlist.ProductId} price={product.price} image={product.image} id={product.wishlist.ProductId} name={product.name} />) : <div>No hay productos agregados a favoritos</div>}
            
        </div>
        </>
    )
}