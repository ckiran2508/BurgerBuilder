
import * as actionTypes from '../actionTypes'
import axiosInstance from '../../axios-orders'

export const fetchPrices = function(){

    return (dispatch)=>{
        dispatch({type:actionTypes.SET_PRICES_LOADING})
        axiosInstance.get('/prices')
          .then(response =>{ 
            dispatch(initPrices(response.data))
          })
          .catch(error => dispatch(initPricesFailed(error)))
    }
}

export const initPrices = function(prices){
    return {
        type:actionTypes.INIT_PRICES,
        prices:prices
    }
}

export const initPricesFailed = function(message){
    return{
        type:actionTypes.INIT_PRICES_FAILED,
        message:message
    }
}
