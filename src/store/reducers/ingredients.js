import * as actionTypes from '../actionTypes'



const initialIngredients={
    loading:false,
    ingredientsArray:[],
    error:null
}


const ingredientsReducer = function(ingredients=initialIngredients,action){


    switch(action.type){

        case actionTypes.SET_INGREDIENTS_LOADING:
            return {
                ...ingredients,
                loading:true
            }

        case actionTypes.INIT_INGREDIENTS:
            const updatedIngredients = action.ingredients ? [...action.ingredients] : [...ingredients.ingredientsArray]
            return {
                ...ingredients,
                ingredientsArray:updatedIngredients,
                loading:false
            }

        case actionTypes.INIT_INGREDIENTS_FAILED:
            return {
               ingredientsArray:[],
               error:action.message,
               loading:false
            }

         default : return ingredients
    }
}
export default ingredientsReducer