import * as actionTypes from '../actionTypes'
import axiosInstance from '../../axios-orders'



export const loadCart = function(cart){ 
    return {    
        type:actionTypes.LOAD_CART,
        cart:cart
    }
}


export const addCartAsync = function(userid){

    return (dispatch,getState) =>{
        const state = getState()
        dispatch(setCartLoading)
        const cart ={
            id:userid,
            userid:userid,
            burgers:[],
            cartTotal:0
        }
        axiosInstance.post('/cart',cart)
        .then(response => dispatch(loadCartAsync(cart.userid)))
        .catch(error => dispatch(setCartServerResponseMessage('add cart failed')))
    }
}

export const loadCartAsync = function(userid){
    return (dispatch) =>{
         dispatch(setCartLoading())
         axiosInstance.get('./cart/'+userid)
        .then(response => {
        dispatch(loadCart( response.data))
    })
        .catch(error => dispatch(setCartServerResponseMessage(error.message)))
    }
}

export const setCartLoading= function(){

    return {
        type:'SET_CART_LOADING'
    }

}

export const updateCartAsync = function(cart){

    return (dispatch) =>{
        dispatch(setCartLoading())
        axiosInstance.put('/cart/'+cart.id,cart)
        .then(response => {dispatch(loadCartAsync(cart.userid))
            dispatch(setCartServerResponseMessage('success'))
        })
        .catch(error => dispatch(setCartServerResponseMessage('update cart failed')))
    }
}


export const addToCartAsync = function(burger){

    return (dispatch) =>{
    dispatch(setCartLoading())
    axiosInstance.post('/cart.json',burger)
    .then(response => {
        dispatch(addToCart(burger))
        dispatch(setCartServerResponseMessage('success'))
    })
    .catch(error => dispatch(setCartServerResponseMessage('add to cart failed')))
    }
}

export const addToCart = function(burger){

    return {
    type:actionTypes.ADD_TO_CART,
    burger:burger
    }
}

export const removeFromCart = function(id){

    return {
        type:actionTypes.REMOVE_FROM_CART,
        id:id
    }
}

export const removeFromCartAsync = function(burger){

    return (dispatch)=>{
        dispatch(setCartLoading())
        axiosInstance.delete('/cart.json',burger)
        .then((response) => {
            dispatch(removeFromCart(burger.id))
            dispatch(setCartServerResponseMessage('success'))
        })
        .catch(error => dispatch(setCartServerResponseMessage('remove from cart failed')))
    }
}

export const setCartServerResponseMessage = function(message){

    return{
        type:actionTypes.SET_CART_SERVER_RESPONSE_MESSAGE,
        message:message
    }
}