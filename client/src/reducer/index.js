// //==== Setear Estado Global Inicial ======//
const initialState = {
    products: [],
    allProducts: [],
    basket: [],
    ItemsAmount: 0,
    SumPrice: [0],
    productId: [],
    categories: [],
    mercadoPago: {},
    User:[],
    orderAndFilter:{
        orderByPrice: "Relevant",
        filterByCategory: "Todas",
        filterToday: false,
        filterMoreSeller:false,
        filterFreeShipping:false,
        filterByPrice:"",
    }
}
// //==== Setear Reducers ======//
export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'FILTER_TODAY':
            state.orderAndFilter.filterToday = action.payload
            return{
                ...state,
                products:orderAndFilter(state)
            }
        case 'FILTER_BY_CATEGORY':{
            state.orderAndFilter.filterByCategory = action.payload
            return{...state,products:orderAndFilter(state)}
            
        }
        case 'FILTER_FREE_SHIPPING':{
            state.orderAndFilter.filterFreeShipping = action.payload
            return{...state,products:orderAndFilter(state)}
            
        }
        case 'FILTER_MORE_SELLER':{
            state.orderAndFilter.filterMoreSeller = action.payload
            return{...state,products:orderAndFilter(state)}
            
        }
        case 'ORDER_BY_PRICE':
            state.orderAndFilter.orderByPrice = action.payload
            console.log(state.products)
            return{
                ...state,
                products:orderAndFilter(state)
            }
        
        case 'FILTER_BY_PRICE':{
            state.orderAndFilter.filterByPrice = action.payload
            return{...state,products:orderAndFilter(state)}
            
        }
        case "ADD_TO_BASKET":
            const indexToAdd = state.basket.findIndex(basketItem => basketItem.id === action.payload.id);
            if (indexToAdd >= 0) {
                console.log(state.basket[indexToAdd].quantity)
                console.log(state.basket)
                state.basket[indexToAdd].quantity = Number(state.basket[indexToAdd].quantity) +Number( action.quantity)
                state.ItemsAmount = Number(state.ItemsAmount) + Number(action.quantity)

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
                sumatotal = (action.payload.price)*action.quantity
                state.SumPrice = sumatotal
                console.log("este es item amount la primera vez")
                console.log(state.ItemsAmount)
                console.log(action.payload)
                state.ItemsAmount = Number(state.ItemsAmount) + Number(action.quantity)
                const item ={
                    id: action.payload.id,
                    name: action.payload.name,
                    image: action.payload.image,
                    price: action.payload.price,
                    quantity:action.quantity,
                    description:action.payload.description
                }
                return {
                    ...state,
                    basket: [...state.basket, item]
                }
            }
        case "SUBSTRACT_QUANTITY":
            const index1 = state.basket.findIndex(basketItem => basketItem.id === action.payload);
            if (index1 >= 0) {
                state.ItemsAmount = Number(state.ItemsAmount) -Number(1)
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
                products: action.payload,
                allProducts:action.payload
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
                }
        case "SEARCH_PRODUCT":
            return{
                ...state,
                products:action.payload
            }
        case "UPDATE_PRODUCT":
                return{
                    ...state
                }
        case "DELETE_PRODUCT":
                return{
                    ...state
                }
        default:
            return state

    }

}


    function orderAndFilter(state) {
        const productsFilteredByCategory = filterByCategory(state)
        const productsFilteredByToday = filterByToday(state,productsFilteredByCategory)
        const productsFilteredByFreeShipping =filterByFreeShipping(state,productsFilteredByToday)
        const productsFilteredByMoreSeller = filterByMoreSeller(state,productsFilteredByFreeShipping)
        console.log(state.allProducts)
        return orderBy(productsFilteredByMoreSeller, state.orderAndFilter.orderByPrice)
    }
    function orderBy(products, orderByPrice) {
        let orderedProducts
        if (orderByPrice === 'asc') {
            orderedProducts = products.sort((productA, productB) => productA['price']-(productB['price']))
        }
        if (orderByPrice ==='Relevant') {
            orderedProducts = products.sort((productA, productB) => productA['price']-(productB['price']))
        }
        if (orderByPrice === 'desc') {
            orderedProducts = products.sort((productA, productB) => productB['price']-(productA['price']))
        }
        return orderedProducts
    }
    function filterByCategory(state) {
        const categoryFiltered = state.orderAndFilter.filterByCategory === 'Todas' ? state.allProducts : state.allproducts.filter(obj => obj.category === state.orderAndFilter.filterByCategory)
        return categoryFiltered
    }
    function filterByToday(state,products) {
        if(state.orderAndFilter.filterToday){
            const todayFiltered = products.filter(obj => obj.name.length<45)
            return todayFiltered
        } else return products
    }
    function filterByFreeShipping(state,products) {
            if(state.orderAndFilter.filterToday){
                const todayFiltered = products.filter(obj => obj.price < 45000)
                return todayFiltered
            } else return products
        }
    function filterByMoreSeller(state,products) {
            if(state.orderAndFilter.filterToday){
                const todayFiltered = products.filter(obj => obj.stock < 13)
                return todayFiltered
            } else return products
        }

        