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