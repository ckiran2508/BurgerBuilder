import * as actionTypes from '../actionTypes'

const initialPrices= {
    salad:0,
    bacon:0,
    cheese:0,
    meat:0,
    error:null,
    loading:false
}

const pricesReducer = function(prices = initialPrices,action){


    switch(action.type){
        
        case actionTypes.SET_PRICES_LOADING:
            return {
                ...prices,
                loading:true
            }

        case actionTypes.INIT_PRICES:         
            return {
                ...prices,
                ...action.prices,
                loading:false
            }

        case actionTypes.INIT_PRICES_FAILED:
            return {
              ...prices,
              error:action.message,
              loading:false
            }   

        default: return prices
    }
}

export default pricesReducer