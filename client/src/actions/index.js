import axios from 'axios';


export function getProducts(){
    return async function (dispatch){
        const products = await axios.get('http://localhost:3001/products')
        return dispatch ({
            type:"GET_PRODUCTS",
            payload:products.data
        })
    }
}

export function addToBasket(payload){
    return{
        type:"ADD_TO_BASKET",
        payload
    }
}

export function RemoveToBasket(payload){
    return{
        type:"REMOVE_ITEM",
        payload
    }
}

export function SumItem(payload){
    return{
        type:"SUM_ITEM",
        payload
    }
}