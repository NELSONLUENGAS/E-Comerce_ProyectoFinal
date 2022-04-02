// //==== Setear Estado Global Inicial ======//
const initialState = {
    products:[],
    basket: [],
    SumPrice: []
}
// //==== Setear Reducers ======//
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_TO_BASKET":
        return {
            ...state,
            basket: [...state.basket, action.payload]
        }
        case "REMOVE_ITEM":
            //nos va a dar el indice del array que queremos eliminar
            //se pasa por id un 3
            //el index va a valer 2
            const index = state.basket.findIndex(basketItem => basketItem.id === action.id);
            //guardo basket en una nueva variable
            let newBasket = [...state.basket];
            if (index >= 0) {
                //en la nueva copia vete al indice y elimina 2
                newBasket.splice(index, 1);
            } else {
                console.log("No se puede eliminar el producto")
            }
        return {
            ...state,
            //devuelvo todo al carro sin el eliminado
            basket: newBasket,
        }
        case "SUM_ITEM":
            return{
                ...state,
                SumPrice: state.basket?.reduce((amount, item) => item.price + amount, 0)
               
            }
        case 'GET_PRODUCTS':
            return{
                ...state,
                products:action.payload
            }
        case 'POST_USERS':
            return{
                ...state,
            }
        case 'POST_PRODUCTS':
            return{
                ...state
            }
        default:
            return state

    }

}
export default rootReducer;