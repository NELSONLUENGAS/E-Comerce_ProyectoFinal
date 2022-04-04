// //==== Setear Estado Global Inicial ======//
const initialState = {
    products: [],
    basket: [],
    ItemsAmount: 0,
    SumPrice: [0],
    productId: [],
    categories: [],
    mercadoPago: {},
    User:[]
}
// //==== Setear Reducers ======//
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_TO_BASKET":
            const indexToAdd = state.basket.findIndex(basketItem => basketItem.id === action.payload.id);
            if (indexToAdd >= 0) {
                console.log(state.basket[indexToAdd].quantity)
                console.log(state.basket)
                state.basket[indexToAdd].quantity = state.basket[indexToAdd].quantity + action.payload.quantity
                state.ItemsAmount = Number(state.ItemsAmount) + Number(action.payload.quantity)

                console.log("este es item amount cuando sumamos")
                console.log(state.ItemsAmount)
                let sumatotal = 0
                state.basket.map((item) => {
                    return (
                        sumatotal = sumatotal + (item.quantity * item.price)
                    )
                })
                state.SumPrice = sumatotal
                return {
                    ...state
                }
            } else {
                let sumatotal = 0
                sumatotal = action.payload.price
                state.SumPrice = sumatotal
                console.log("este es item amount la primera vez")
                console.log(state.ItemsAmount)
                state.ItemsAmount = Number(state.ItemsAmount) + Number(1)
                return {
                    ...state,
                    basket: [...state.basket, action.payload]
                }
            }
        case "SUBSTRACT_QUANTITY":
            const index1 = state.basket.findIndex(basketItem => basketItem.id === action.payload);
            if (index1 >= 0) {
                state.ItemsAmount = state.ItemsAmount - 1
                state.SumPrice = state.SumPrice - state.basket[index1].price
                state.basket[index1].quantity = state.basket[index1].quantity - 1
            }
            return {
                ...state
            }
        case "REMOVE_ITEM":
            const index = state.basket.findIndex(basketItem => basketItem.id === action.payload);
            let newBasket = [...state.basket];
            newBasket.splice(index, 1);

            const restaTotal = state.basket[index].quantity * state.basket[index].price
            state.SumPrice = state.SumPrice - restaTotal
            console.log("este es un console log de itemsamount")
            console.log(state.ItemsAmount)

            state.ItemsAmount = Number(state.ItemsAmount) - Number(state.basket[index].quantity)
            return {
                ...state,
                basket: newBasket
            }
        case "SUM_ITEM":
            let sumatotal = 0
            state.basket.map((item) => {
                return (
                    sumatotal = sumatotal + (item.quantity * item.price)
                )
            })
            return {
                ...state,
                SumPrice: sumatotal


            }

        case 'GET_PRODUCTS':
            return {
                ...state,
                products: action.payload
            }

        case 'GET_ID_PRODUCTS':
            return {
                ...state,
                productId: action.payload
            }
        case 'GET_CATEGORIES':
            return {
                ...state,
                categories: action.payload
            }
        case 'GET_CATEGORIES_BY_NAME':
            return {
                ...state,
                products: action.payload
            }
        case 'GET_MERCADOPAGO':
            return {
                ...state,
                mercadoPago: action.payload
            }
        case 'POST_USERS':
            return {
                ...state,
            }
        case 'POST_PRODUCTS':
            return {
                ...state
            }
        case 'GET_USER_SIGNING_IN':
            return{
                ...state,
                User:action.payload
            }
        case 'LOG_OUT':
            return{
                ...state,
                User:[]
            }
        case 'POST_CATEGORIA':
                return {
                    ...state,
                }
        case "DELETE_CATEGORIA":
                return {
                    ...state,
                    categories: action.payload
                }
        case "SEARCH_PRODUCT":
            return{
                ...state,
                products:action.payload
            }
        default:
            return state

    }

}
export default rootReducer;