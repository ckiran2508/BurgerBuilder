import * as actionTypes from '../actionTypes'
import axiosInstance from '../../axios-orders'
import {addCartAsync, loadCartAsync} from './cart'




export const setUserLoading=function(){
    return{
        type:actionTypes.SET_USER_LOADING
    }
}

export const loadUser = function(userData){

    return {
        type:actionTypes.LOAD_USER,
        user:userData
    }
}

export const loadUserAsync = function(email){

    return (dispatch)=>{
        dispatch(setUserLoading())
        axiosInstance.get('/users/'+email)
        .then(response =>{ 
        dispatch(loadUser(response.data))
        dispatch(loadCartAsync(response.data.id))
        })
        .catch(error => dispatch(setUserServerResponse(error)))
    }
}

export const updateUser =function(userData){
 
    return {
        type:actionTypes.UPDATE_USER,
        user:userData
    }  
}

export const updateUserAsync = function(userData){

    return (dispatch) =>{
        console.log(userData)
        dispatch(setUserLoading())
        axiosInstance.put('/users/'+userData.id,userData)
        .then(res => dispatch(updateUser(userData)))
        .catch(err => dispatch(setUserServerResponse('Update Failed')))
    }
}




export const setUserServerResponse = function(error){

    return {
        type:actionTypes.SET_USER_SERVER_RESPONSE,
        message:error
    }
}