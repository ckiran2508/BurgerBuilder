import * as actionTypes from '../actionTypes'
import axios from 'axios'
import axiosInstance from '../../axios-orders'
import {loadUserAsync } from './user'
import {addCartAsync} from './cart'


export const authStart = function(){

    return{
        type:actionTypes.AUTH_START
    }
}

export const authSignInSuccess = function(token,userId){

    return{
           type:actionTypes.AUTH_SIGN_IN_SUCCESS,
           token:token,
           id:userId
    }
}

export const authSignInFailed = function(error){

    return {
        type:actionTypes.AUTH_SIGN_IN_FAILED,
        signInError:error
    }
}

export const authSignUpSuccess = function(token,userId){
   return{ 
    type:actionTypes.AUTH_SIGN_UP_SUCCESS,
    token:token,
    id:userId
   }
}

export const authSignUpFailed = function(error){

    return {
        type:actionTypes.AUTH_SIGN_UP_FAILED,
        signUpError:error
    }
}


export const signIn = function(email,password){

    return (dispatch) =>{
        dispatch(authStart())
        const authData ={
            email:email,
            password:password,
            returnSecureToken:true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDLHzKIT2wBeHXcecF-m8vD4d8esRU_qcI',authData)
        .then(response => {dispatch(authSignInSuccess(response.data.idToken,response.data.localId))
                           dispatch(loadUserAsync(email))
                          // dispatch(authTimeOut(response.data.expiresIn))
        })
        .catch(error => {
                dispatch(authSignInFailed('Sign In Failed'))
            })
    }
}


export const signUp = function(userData){

    return (dispatch) =>{
        dispatch(authStart())
        const authData ={
            email:userData.email,
            password:userData.password,
            returnSecureToken:true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDLHzKIT2wBeHXcecF-m8vD4d8esRU_qcI',authData)
        .then(response => {
           dispatch(authSignUpSuccess(response.data.idToken,response.data.localId))
           dispatch(addNewUser({...userData,id:response.data.localId}))
           dispatch(addCartAsync(response.data.localId))
          // dispatch(authTimeOut(response.data.expiresIn))
        })
        .catch(error => {             
                dispatch(authSignUpFailed(error.message))
            })
    }
}

export const addNewUser = function(userData){

    return (dispatch) =>{
    axiosInstance.post('/users',userData)
    .then(response => {     
        dispatch(loadUserAsync(userData.email))
    })
    .catch(error =>{
        dispatch(authSignUpFailed(error.message))
    })

}

}

export const signOut = function(){

    return dispatch=>{

        dispatch({type:actionTypes.AUTH_SIGNOUT})
        dispatch({type:actionTypes.CLEAR_USER})
    }
}

export const authTimeOut = function(expiresIn){

    return (dispatch) =>{
      setTimeout(()=>{dispatch(signOut())},300000)
    }
}