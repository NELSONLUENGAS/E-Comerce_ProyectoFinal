import axios from 'axios';
import { gapi, loadAuth2 } from 'gapi-script'


export function getProducts(){
    return async function (dispatch){
        const products = await axios.get('http://localhost:3001/products')
        return dispatch ({
            type:"GET_PRODUCTS",
            payload:products.data
        })
    }
}
export function getOfertas(){
    return async function (dispatch){
        const products = await axios.get('http://localhost:3001/products')
        return dispatch ({
            type:"GET_ALL_PRODUCTS",
            payload:products.data
        })
    }
}
export function cleanProductId(){
    return ({
        type:'CLEAN_PRODUCT_ID'
    })
}

export function getAdmins(){
    return async function (dispatch){
        const admins = await axios.get('http://localhost:3001/admins')
        return dispatch ({
            type:"GET_ADMINS",
            payload:admins.data
        })
    }
}

export function deleteAdmin(email){
    return async function (dispatch){
        const admin = await axios.put(`http://localhost:3001/demote/${email}`)
        return dispatch({
            type:"DELETE_ADMIN",
            payload:admin.data
        })
    }
}
export function addAdmin(email){
    return async function (dispatch){
        const admin = await axios.put(`http://localhost:3001/promote/${email}`)
        return dispatch({
            type:"ADD_ADMIN",
            payload:admin.data
        })
    }
}
export function getEdit(payload){
    return {
        type:"GET_EDIT",
        payload
    }
}
export function putPassword(payload,email){
    return async function (dispatch){
        const json = await axios.put(`http://localhost:3001/changePassword/${email}`,payload)
        return dispatch ({
            type:"PUT_PASSWORD",
            payload:json.data
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

export function getFavorites(email){
    return async function (dispatch){
        const products = await axios.get(`http://localhost:3001/users/${email}/wishlist`)
        return dispatch ({
            type:"GET_FAVORITES",
            payload:products.data
        })
    }
}
export function addFavorite(email,payload){
    return async function (dispatch){
        const products = await axios.post(`http://localhost:3001/users/${email}/wishlist`,payload)        
        return dispatch ({
            type:"ADD_FAVORITE",
            payload:products.data
        })
    }
}
export function deleteFavorite(email,productId){
    return async function (dispatch){
        const products = await axios.delete(`http://localhost:3001/users/${email}/wishlist/${productId}`)
        return dispatch ({
            type:"DELETE_FAVORITE",
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
export function removeItemBasket(email,id){
    return async function (dispatch){
        const products = await axios.delete(`http://localhost:3001/users/${email}/cart?productId=`+id);
        return dispatch ({
            type:"DELETE_PRODUCT_FROM_ID",
            payload:products.data
        })
    }

}

export function getMercadoPago(payload){
    return async(dispatch) => {
        const mercadopago = await axios.post('http://localhost:3001/mercadopago', payload);
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
export function vaciarCarritoBack(email,name,lastname){
    return async function (dispatch){
        await axios.delete(`http://localhost:3001/users/${email}/emptycart?name=${name}&lastname=${lastname}`)
        return dispatch ({
            type:"DELET_CART_BACK",
        })
    }
}

export function deleteUser(email){
    return async function (dispatch){
        await axios.delete(`http://localhost:3001/users/${email}`)
        return dispatch ({
            type:"DELETE_USER",
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
    return async function (dispatch) {
        const json = await axios.post('http://localhost:3001/createUser', payload);
        return dispatch({
            type: "POST_USERS",
            payload: json.data
  
        })
    }
}

export function getUserSigningIn(payload,guestCart){
    return async function (dispatch){
        
            const json = await axios.get(`http://localhost:3001/login?email=${payload.email}&password=${payload.password}`);
            if(typeof json.data !=='string'){
                await axios.post(`http://localhost:3001/guestCart/${payload.email}`,{guestCart:guestCart})
            }else{
                const auth2 = gapi.auth2?.getAuthInstance();
                auth2?.signOut()
            }
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


export function PostDirection(payload, email) {
    return async function (dispatch) {
        const json = await axios.post(`http://localhost:3001/users/${email}/addlocation`, payload);
        return dispatch({
            type: "POST_DIRECTION",
            payload: json.data

        })
    }
  }
  export function DeleteCategoria(id) {
    
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
export function UpdateProduct(payload) {
    return async function (dispatch) {
        const json = await axios.put('http://localhost:3001/updateProduct/',payload);
        return dispatch({
            type: "UPDATE_PRODUCT",
            payload: json.data

        })
    }
}
export function DeleteProduct(id) {
    return async function (dispatch) {
        const json = await axios.delete('http://localhost:3001/deleteProduct/'+id);
        return dispatch({
            type: "DELETE_PRODUCT",
            payload: json.data

        })
    }
}
export  function getOrders(){
    return async function (dispatch){
        const orders = await axios.get('http://localhost:3001/users/orders')
        return dispatch({
            type: 'GET_ORDERS',
            payload: orders.data
        })
    }
}
export  function getOrdersInProgress(){
    return async function (dispatch){
        const orders = await axios.get('http://localhost:3001/users/orders/InProgress')
        return dispatch({
            type: 'GET_ORDERS_IN_PROGRESS',
            payload: orders.data
        })
    }
}
export  function getOrdersComplete(){
    return async function (dispatch){
        const orders = await axios.get('http://localhost:3001/users/orders/Complete')
        return dispatch({
            type: 'GET_ORDERS_COMPLETE',
            payload: orders.data
        })
    }
}

export function getOrdersUser(email){
    return async function(dispatch){
        const ordersUser = await axios.get(`http://localhost:3001/users/${email}/order`)
        return dispatch({
            type: 'GET_ORDERS_USER',
            payload: ordersUser.data
        })
    }
}
export function putOrderState(email,userData){
    
    return async function(dispatch){
        const stateOrder = await axios.put(`http://localhost:3001/users/${email}/changeStatusCart`,userData);
        return dispatch({
            type: 'PUT_ORDER_STATE',
            payload: stateOrder.data
        })
    }
}

export function changeStatusToComplete(email,orderId){
    return async function (dispatch) {
        
        const json = await axios.put(`http://localhost:3001/users/${email}/changeToComplete`,orderId);
        
        return dispatch({
            type: "CHANGE_ORDER_TO_COMPLETE",
            payload: json.data

        })
    }

}

export function getProductReview(id){
    return async function(dispatch){
        const productReview = await axios.get(`http://localhost:3001/${id}/review`)
        return dispatch({
            type: 'GET_PRODUCT_REVIEW',
            payload: productReview.data
        })
    }
}
export function postProductReview(email,id,productReviewData){
    return async function(dispatch){
        const productReview = await axios.post(`http://localhost:3001/${id}/${email}/review`,productReviewData)
        
        return dispatch({
            type: 'POST_PRODUCT_REVIEW',
            payload: productReview.data
        })
    }
}
export function getProductReviewByEmail(email,id){
    return async function(dispatch){
        const productReview = await axios.get(`http://localhost:3001/${id}/review/${email}`)
        return dispatch({
            type: 'GET_PRODUCT_REVIEW_BY_EMAIL',
            payload: productReview.data
        })
    }
}

export function postUserViews(payload){
    return async function(dispatch){
        await axios.post(`http://localhost:3001/views`, payload)
        return dispatch({
            type: 'POST_VIEWS'
        })
    }
}

export function getUserViews(email){
    return async function(dispatch){
        const userViews = await axios.post('http://localhost:3001/views/user',email)
        return dispatch({
            type: 'GET_USER_VIEWS',
            payload: userViews.data
        })
    }
}

export function editPrincipalDirection(index,email){
    return async function(dispatch){
        const direction = await axios.put(`http://localhost:3001/users/${email}/editPrincipalDirection`,index)
        return dispatch({
            type: 'EDIT_PRINCIPAL_DIRECTION',
            payload: direction.data
        })
    }

}

export function propertiesGoogle(user){
    return ({
        type:'PROPERTIES_USER_GOOGLE',
        payload:user
    })
}

export function getUserByEmail(email){
    return async function(dispatch){
        const getUser = await axios.get(`http://localhost:3001/user/${email}`)
        return dispatch({
            type: 'GET_USER_BY_EMAIL',
            payload: getUser.data
        })
    }
}

export function forgotPassword(email,token){
    return async function(dispatch){
        await axios.post(`http://localhost:3001/users/${email}/forgotPassword/${token}`)
        return dispatch({
            type: 'FORGET_PASSWORD',
            payload: token
        })
    }
}

export function changeToRejected(email,orderId){
    return async function (dispatch) {
        const json = await axios.put(`http://localhost:3001/users/${email}/changeToRejected`,orderId);
        return dispatch({
            type: "CHANGE_ORDER_TO_REJECTED",
            payload: json.data
        })
    }

}
export function cargarCarrito(payload){
    return ({
        type: 'GET_BASKET_LOCAL_STORAGE',
        payload
    })
}
export function cargarSumItems(payload){
    return ({
        type: 'GET_SUM_LOCAL_STORAGE',
        payload
    })
}





