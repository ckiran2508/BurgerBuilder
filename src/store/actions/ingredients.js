import axiosInstance from '../../axios-orders'
import * as actionTypes from '../actionTypes'



export const fetchIngredients = function(){

    return (dispatch)=>{
        dispatch({type:actionTypes.SET_INGREDIENTS_LOADING})
        axiosInstance.get('/ingredients')
        .then(response => dispatch(initIngredients(response.data)))
        .catch(error => dispatch(initIngredientsFailed(error)))
    }
}


export const initIngredients = function(ingredients){
    return{
        type:actionTypes.INIT_INGREDIENTS,
        ingredients:ingredients
    }
}

export const initIngredientsFailed = function(message){
    
    return{
        type:actionTypes.INIT_INGREDIENTS_FAILED,
        message:message
    } 

}