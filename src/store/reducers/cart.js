import * as actionTypes from '../actionTypes'


const initialCart = {
    id:null,
    userid:null,
    burgers:[],
    cartTotal:0,
    loading:false,
    serverResponse:null
}

const cartReducer = function(cart=initialCart,action){


    switch(action.type){

        case actionTypes.SET_CART_LOADING:
            return{
             ...cart,
              burgers:[...cart.burgers],
              serverResponse:null,
              loading:true
            }

        case actionTypes.LOAD_CART:
        return{
            ...cart,
            ...action.cart,
            loading:false
        }


        case actionTypes.ADD_TO_CART : 
        return{
            ...cart,
            burgers: [action.burger,...cart.burgers],
            serverResponse:null,
            loading:false,
            cartTotal:(function(){
                 return cart.cartTotal + (action.burger.totalPrice * action.burger.quantity)
              })()
        }

        case actionTypes.REMOVE_FROM_CART : 
        return{
           ...cart,
           burgers: cart.burgers.filter(burger => burger.id !== action.id),
           serverResponse:null,
           loading:false,
           cartTotal:function(){
            const burger = cart.burgers.find(current=> current.id===action.id)
             return cart.cartTotal - (burger.quantity * burger.totalPrice)
         }()
        }

        case actionTypes.CLEAR_CART :{
            return{
                ...cart,
                burgers:[],
                serverResponse:null,
                loading:false
            }
        }

        case actionTypes.SET_CART_SERVER_RESPONSE_MESSAGE:
            return{
                ...cart,
                burgers:[...cart.burgers],
                serverResponse:action.message,
                loading:false
            }
        default:
        return cart
    }
}

export default cartReducer