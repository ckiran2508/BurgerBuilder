
import * as actionTypes from '../actionTypes'

export const addIngredient = function(ingredientName,price){

    return{
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:ingredientName,
        price:price
    }
}

export const removeIngredient = function(ingredientName,price){

    return {
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:ingredientName,
        price:price
    }
}


export const getSummary = function(){
    return {
        type:actionTypes.GET_SUMMARY
    }
}

export const setQuantity = function(quantity){
    return{
        type:actionTypes.SET_QUANTITY,
        quantity:quantity
    }
}

export const addtoCart = function(burger){

    return{
        type:actionTypes.ADD_TO_CART,
        burger:burger
    }
}