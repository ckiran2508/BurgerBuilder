import * as actionTypes from '../actionTypes'

const writeError = function(message) {

    return {
        type:actionTypes.WRITE_ERROR,
        message:message
    }
}