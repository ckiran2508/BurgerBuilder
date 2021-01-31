import * as actionTypes from '../actionTypes'

const initialBurger = {
    ingredients: [],
    ingredientsSummary: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    quantity:1,
    totalPrice: 4,
    error:null
}

const burgerReducer = function (burger = initialBurger, action) {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:                       
            if (burger.ingredients.length < 10) {
                return {
                    ...burger,
                    ingredients: (function(){
                       return [action.ingredientName,...burger.ingredients]
                    })(),
                    totalPrice: (function(){
                       return burger.totalPrice + action.price
                    })()
                }
            }
            return burger

        case actionTypes.REMOVE_INGREDIENT: 
        if (burger.ingredients.length > 0 && burger.ingredients.filter(i => i===action.ingredientName).length>0) {
            return {
                ...burger,
                ingredients: (function(){
                   const index = burger.ingredients.findIndex(i => i===action.ingredientName)
                   if(index !== -1) {
                       const newIngredients = [...burger.ingredients]
                       newIngredients.splice(index,1)
                       return newIngredients
                   }
                   return [...burger.ingredients]
                })(),
                totalPrice: (function(){
                   return burger.totalPrice - action.price
                })()
            }
        }
        return burger
         

        case actionTypes.GET_SUMMARY: 

            let newIngredientsSummary = {}
            if (burger.ingredients.length >= 1) {
                newIngredientsSummary = {
                    salad: burger.ingredients.filter(i => i === 'salad').length,
                    bacon: burger.ingredients.filter(i => i === 'bacon').length,
                    cheese: burger.ingredients.filter(i => i === 'cheese').length,
                    meat: burger.ingredients.filter(i => i === 'meat').length
                }
                return {
                    ...burger,
                    ingredients:[...burger.ingredients],
                    ingredientsSummary: newIngredientsSummary,
                }
            }
            return burger     

        case actionTypes.SET_QUANTITY:
            return{
                ...burger,
                ingredientsArray:[...burger.ingredients],
                ingredientsSummary:{...burger.ingredientsSummary},
                quantity:action.quantity
            }

        default: return burger
    }
}

export default burgerReducer