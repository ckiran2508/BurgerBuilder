import actionTypes from './actionTypes'

const initialState = {
    ingredients: [],
    ingredientsSummary: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    prices: {
        salad: 3,
        bacon: 4,
        cheese: 5,
        meat: 10
    },
    totalPrice: 4
}

const Reducer = function (state = initialState, action) {


    switch (action.type) {

        case actionTypes.ADD_INGREDIENT:                       
            if (state.ingredients.length < 10) {
                return {
                    ...state,
                    ingredients: (function(){
                       return [action.ingredientName,...state.ingredients]
                    })(),
                    totalPrice: (function(){
                       return state.totalPrice + state.prices[action.ingredientName]
                    })()
                }
            }
            return state

        case actionTypes.REMOVE_INGREDIENT: 
        if (state.ingredients.length > 0 && state.ingredients.filter(i => i===action.ingredientName).length>0) {
            return {
                ...state,
                ingredients: (function(){
                   const index = state.ingredients.findIndex(i => i===action.ingredientName)
                   if(index !== -1) {
                       const newIngredients = [...state.ingredients]
                       newIngredients.splice(index,1)
                       return newIngredients
                   }
                   return [...state.ingredients]
                })(),
                totalPrice: (function(){
                   return state.totalPrice - state.prices[action.ingredientName]
                })()
            }
        }
        return state
         

        case actionTypes.PLACE_ORDER: 

            let newIngredientsSummary = {}
            let totalPrice = 4
            if (state.ingredients.length >= 1) {
                newIngredientsSummary = {
                    salad: state.ingredients.filter(i => i === 'salad').length,
                    bacon: state.ingredients.filter(i => i === 'bacon').length,
                    cheese: state.ingredients.filter(i => i === 'cheese').length,
                    meat: state.ingredients.filter(i => i === 'meat').length
                }
                for (let ing in newIngredientsSummary) {
                    totalPrice += newIngredientsSummary[ing] * state.prices[ing]
                }
                return {
                    ...state,
                    ingredients:[...state.ingredients],
                    ingredientsSummary: newIngredientsSummary,
                    totalPrice: totalPrice
                }
            }
            return state
                 
        default: return state
    }
}

export default Reducer