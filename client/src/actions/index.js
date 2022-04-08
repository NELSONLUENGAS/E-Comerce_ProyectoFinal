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
export function getBasket(email){
    return async function (dispatch){
        const products = await axios.get(`http://localhost:3001/users/${email}/cart`)
        return dispatch ({
            type:"GET_BASKET",
            payload:products.data
        })
    }
}

export function addBasketBack(payload,email){
    return async function (dispatch){
        const products = await axios.post(`http://localhost:3001/users/${email}/cart`,payload)
        return dispatch ({
            type:"ADD_BASKET_BACK",
            payload:products.data
        })
    }
}
export function filterBy2Price(payloadMin, payloadMax){
    return{
        type:"FILTER_BY_2_PRICE",
        payloadMin,
        payloadMax
    }
}

export function putBasketBack(payload,email){
    return async function (dispatch){
        const products = await axios.put(`http://localhost:3001/users/${email}/cart`,payload)
        return dispatch ({
            type:"PUT_BASKET_BACK",
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

export function getMercadoPago(payload){
    return async(dispatch) => {
        const mercadopago = await axios.post('http://localhost:3001/mercadopago', payload);
        console.log("mercadopago url")
        console.log(mercadopago.data)
        return dispatch({
            type:"GET_MERCADOPAGO",
            payload: mercadopago.data
        })
    }
}

export function addToBasket(payload,quantity){
    return{
        type:"ADD_TO_BASKET",
        payload,
        quantity
    }
}
export function vaciarCarrito(){
    return{
        type:"DELETE_CART",
    }
}
export function vaciarCarritoBack(email){
    return async function (dispatch){
        const products = await axios.delete(`http://localhost:3001/users/${email}/emptycart`)
        return dispatch ({
            type:"DELET_CART_BACK",
        })
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

export function filterToday(payload){
    return{
        type:"FILTER_TODAY",
        payload
    }
}
export function filterFreeShipping(payload){
    return{
        type:"FILTER_FREE_SHIPPING",
        payload
    }
}
export function filterMoreSeller(payload){
    return{
        type:"FILTER_MORE_SELLER",
        payload
    }
}
export function orderByPrice(payload){
    return{
        type:"ORDER_BY_PRICE",
        payload
    }
}
export function filterByPrice(payload){
    return{
        type:"FILTER_BY_PRICE",
        payload
    }
}

export function filterByCategory(filter){
    return async function (dispatch){
        const json = await axios.get(`http://localhost:3001/products?category=${filter}`);
        console.log("Entre al filterBycATEGORY")
        console.log(json.data)
        console.log(filter)
        return dispatch ({
            type:"FILTER_BY_CATEGORY",
            payload:json.data,
            filter:filter
        })
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
export function logOut(payload){
    return{
        type:"LOG_OUT",
        payload
    }
}
export function postCrearCategoria(payload) {
    return async function (dispatch) {
        const json = await axios.post('http://localhost:3001/createCategory', payload);
        return dispatch({
            type: "POST_CATEGORIA",
            payload: json.data

        })
    }
  }
  export function DeleteCategoria(id) {
    console.log('este es el id'); 
    console.log(id);
    return async function (dispatch) {
        const json = await axios.delete('http://localhost:3001/categories/'+id);
        return dispatch({
            type: "DELETE_CATEGORIA",
            payload: json.data

        })
    }
}
export function getSearch(search) {
    return async function (dispatch) {
        const json = await axios.get('http://localhost:3001/products?name='+ search);
        return dispatch({
            type: "SEARCH_PRODUCT",
            payload: json.data

        })
    }
}
export function UpdateProduct(id) {
    return async function (dispatch) {
        const json = await axios.put('http://localhost:3001/updateProduct/'+id);
        return dispatch({
            type: "UPDATE_PRODUCT",
            payload: json.data

        })
    }
}
export function DeleteProduct(id) {
    return async function (dispatch) {
        const json = await axios.put('http://localhost:3001/deleteProduct/',id);
        return dispatch({
            type: "DELETE_PRODUCT",
            payload: json.data

        })
    }
}
