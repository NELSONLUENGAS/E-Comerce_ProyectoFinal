// //==== Setear Estado Global Inicial ======//
const initialState = {
    products: [],
    allProducts: [],
    basket: [],
    ItemsAmount: 0,
    SumPrice: [0],
    SumPriceBack: [0],
    productId: [],
    categories: [],
    mercadoPago: {},
    basketBack: [],
    User: [],
    Auth: {
        isLogin: true,
        role: 'admin'
    },
    orderAndFilter: {
        orderByPrice: "Relevant",
        filterByCategory: "Todas",
        filterToday: false,
        filterMoreSeller: false,
        filterFreeShipping: false,
        filterByPrice: { min: 0, max: "" },
    }
}
// //==== Setear Reducers ======//
export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'FILTER_TODAY':
            state.orderAndFilter.filterToday = action.payload
            return {
                ...state,
                products: orderAndFilter(state, state.orderAndFilter.filterByCategory)
            }
        case 'FILTER_BY_CATEGORY': {
            if (action.filter === 'Todas') {
                state.orderAndFilter.filterByCategory = state.allProducts
                return { ...state, products: state.allProducts }
            } else {
                state.orderAndFilter.filterByCategory = action.payload
                return { ...state, products: orderAndFilter(state, action.payload) }
            }

        }
        case 'FILTER_FREE_SHIPPING': {
            state.orderAndFilter.filterFreeShipping = action.payload
            return { ...state, products: orderAndFilter(state, state.orderAndFilter.filterByCategory) }

        }
        case 'FILTER_MORE_SELLER': {
            state.orderAndFilter.filterMoreSeller = action.payload
            return { ...state, products: orderAndFilter(state, state.orderAndFilter.filterByCategory) }

        }
        case 'ORDER_BY_PRICE':
            state.orderAndFilter.orderByPrice = action.payload
            console.log(state.products)
            return {
                ...state,
                products: orderAndFilter(state, state.orderAndFilter.filterByCategory)
            }

        case 'FILTER_BY_2_PRICE': {
            state.orderAndFilter.filterByPrice = { min: action.payloadMin, max: action.payloadMax }
            console.log(state.orderAndFilter)
            return { ...state, products: orderAndFilter(state, state.orderAndFilter.filterByCategory) }
        }
        case "ADD_TO_BASKET":
            const indexToAdd = state.basket.findIndex(basketItem => basketItem.id === action.payload.id);
            if (indexToAdd >= 0) {
                console.log(state.basket[indexToAdd].quantity)
                console.log(state.basket)
                state.basket[indexToAdd].quantity = Number(state.basket[indexToAdd].quantity) + Number(action.quantity)
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
                sumatotal = (action.payload.price) * action.quantity
                state.SumPrice = sumatotal
                console.log("este es item amount la primera vez")
                console.log(state.ItemsAmount)
                console.log(action.payload)
                state.ItemsAmount = Number(state.ItemsAmount) + Number(action.quantity)
                const item = {
                    id: action.payload.id,
                    name: action.payload.name,
                    image: action.payload.image,
                    price: action.payload.price,
                    quantity: action.quantity,
                    description: action.payload.description
                }
                return {
                    ...state,
                    basket: [...state.basket, item]
                }
            }
        case "SUBSTRACT_QUANTITY":
            const index1 = state.basket.findIndex(basketItem => basketItem.id === action.payload);
            if (index1 >= 0) {
                state.ItemsAmount = Number(state.ItemsAmount) - Number(1)
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
                allProducts: action.payload
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
            console.log("mercadopago reducer")
            console.log(action.payload)
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
            return {
                ...state,
                User: action.payload
            }
        case 'LOG_OUT':
            return {
                ...state,
                User: []
            }
        case 'POST_CATEGORIA':
            return {
                ...state,
            }

        case 'POST_DIRECTION':
            return {
                ...state,
            }
        case "DELETE_CATEGORIA":
            return {
                ...state,
            }
        case "SEARCH_PRODUCT":
            return {
                ...state,
                products: action.payload
            }
        case "UPDATE_PRODUCT":
            return {
                ...state
            }
        case "DELETE_PRODUCT":
            return {
                ...state
            }
        case 'DELETE_CART':
            return {
                ...state,
                basket: [],
                ItemsAmount: 0,
                SumPrice: [0],

            }
        case 'GET_BASKET':

            state.basketBack = action.payload
            console.log('este es el action payload de get basket')
            console.log(action.payload)
            console.log(state.basketBack)
            let sumatotalBack = 0
            state.basketBack.Products.map((item) => {
                return (
                    sumatotalBack = Number(sumatotalBack) + (Number(item.Product_Line.amount) * Number(item.Product_Line.price))
                )
            })
            console.log(sumatotalBack)
            state.SumPriceBack = sumatotalBack

            let sumItemsBack = 0
            state.basketBack.Products.map((item) => {
                return (
                    sumItemsBack = Number(sumItemsBack) + (Number(item.Product_Line.amount))
                )
            })
            console.log(sumItemsBack)
            state.SumItemsBack = sumItemsBack

            return {
                ...state,
                basketBack: action.payload
            }
        default:
            return state

    }

}


function orderAndFilter(state, orderByPrice) {
    const productsFilteredByCategory = filterByCategory(state, orderByPrice)
    console.log("Este es el console log de la categoria")
    console.log(productsFilteredByCategory)
    const productsFilteredByToday = filterByToday(state, productsFilteredByCategory)
    console.log("Este es el console log del today")
    console.log(productsFilteredByToday)
    const productsFilteredByFreeShipping = filterByFreeShipping(state, productsFilteredByToday)
    console.log("Este es el console log de free shipping")
    console.log(productsFilteredByFreeShipping)
    const productsFilteredByMoreSeller = filterByMoreSeller(state, productsFilteredByFreeShipping)
    console.log("Este es el console log del ultimo filtro")
    console.log(productsFilteredByMoreSeller)
    const productsFilterByMin = filterByMin(state, productsFilteredByMoreSeller)
    const productsFilterByMax = filterByMax(state, productsFilterByMin)
    console.log("Este es el console log del filtro de precios")
    console.log(productsFilterByMax)
    return orderBy(productsFilterByMax, state.orderAndFilter.orderByPrice)
}
function orderBy(products, orderByPrice) {
    let orderedProducts
    if (orderByPrice === 'asc') {
        orderedProducts = products.sort((productA, productB) => productA['price'] - (productB['price']))
    }
    if (orderByPrice === 'Relevant') {
        orderedProducts = products
    }
    if (orderByPrice === 'desc') {
        orderedProducts = products.sort((productA, productB) => productB['price'] - (productA['price']))
    }
    return orderedProducts
}
function filterByCategory(state, productFilteredByCategory) {
    if (productFilteredByCategory === 'Todas') {
        return state.allProducts
    }
    return productFilteredByCategory
}
function filterByToday(state, products) {
    if (state.orderAndFilter.filterToday) {
        const todayFiltered = products.filter(obj => obj.name.length < 45)
        return todayFiltered
    } else return products
}
function filterByFreeShipping(state, products) {
    if (state.orderAndFilter.filterToday) {
        const freeShippingProducts = products.filter(obj => obj.price < 999999)
        return freeShippingProducts
    } else return products
}
function filterByMoreSeller(state, products) {
    if (state.orderAndFilter.filterToday) {
        const moreSellerProduct = products.filter(obj => obj.stock < 13)
        return moreSellerProduct
    } else return products
}
function filterByMin(state, products) {
    let minProducts = ""
    if (state.orderAndFilter.filterByPrice.min > 0) {
        console.log('entre al chequeo del minimo')
        minProducts = products.filter(obj => obj.price > state.orderAndFilter.filterByPrice.min)
        return minProducts
    } else {
        return products
    }
}
function filterByMax(state, products) {
    let maxProducts = ""
    if (state.orderAndFilter.filterByPrice.max > 0) {
        console.log('entre al chequeo del max')
        maxProducts = products.filter(obj => obj.price < state.orderAndFilter.filterByPrice.max)
        return maxProducts
    } else {
        return products
    }
    // if (maxProducts.length>0 && maxProducts!==[]){
    //     return maxProducts
    // } else return products
}
