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
export function getCategories(categoryName){
    return async function (dispatch){
        const products = await axios.get('http://localhost:3001/categories')
        return dispatch ({
            type:"GET_CATEGORIES",
            payload:products.data
        })
    }
}
export function getCategoriesByName(categoryName){
    return async function (dispatch){
        const products = await axios.get('http://localhost:3001/products?category=' + categoryName)
        return dispatch ({
            type:"GET_CATEGORIES_BY_NAME",
            payload:products.data
        })
    }
}

export function getProductId(id){
    return async function (dispatch){
        const products = await axios.get('http://localhost:3001/products/'+id);
        return dispatch ({
            type:"GET_ID_PRODUCTS",
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
export function substractQuantityItem (payload){
    return{
        type:"SUBSTRACT_QUANTITY",
        payload
    }
}

export function SumItem(payload){
    return{
        type:"SUM_ITEM",
        payload
    }
}
export function postProductos(payload) {
    return async function (dispatch) {
        const json = await axios.post('http://localhost:3001/createProduct', payload);
        return dispatch({
            type: "POST_PRODUCT",
            payload: json.data
  
        })
    }
  }

  export function postCrearUsuario(payload) {
      console.log(payload)
    return async function (dispatch) {
        const json = await axios.post('http://localhost:3001/createUser', payload);
        return dispatch({
            type: "POST_USERS",
            payload: json.data
  
        })
    }
}

export function getUserSigningIn(payload){
    return async function (dispatch){
        const json = await axios.get(`http://localhost:3001/login?email=${payload.email}&password=${payload.password}`);
        console.log(json.data)
        return dispatch ({
            type:"GET_USER_SIGNING_IN",
            payload:json.data
        })
    }

}