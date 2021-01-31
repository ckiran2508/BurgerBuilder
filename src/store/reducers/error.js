import * as actionTypes from '../actionTypes'

const initialError = null


const errorReducer = function(error = initialError,action){

    switch(action.type){

        case actionTypes.WRITE_ERROR : 
        return {
            error:action.message
        }
        default : return error
    }
}

export default errorReducer