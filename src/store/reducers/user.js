import * as actionTypes from '../actionTypes'

const initialUser={
    id:null,
    firstName:null,
    lastName:null,
    phone:null,
    email:null,
    addresses:[],
    loading:false,
    userServerResponse:null
}

const userReducer = function(user=initialUser,action){


    switch(action.type){

        case actionTypes.SET_USER_LOADING:
            return{
                ...user,
                addresses:function(){
                let addresses1 =[]
                for(let key of user.addresses){
                    let address = {...user.addresses[key]}
                    addresses1=[...addresses1,address]
                }
                return addresses1    
                }(),
                loading:true,
                userServerResponse:null
            }

        
        case actionTypes.LOAD_USER:
            return{
                ...user,
                addresses:function(){
                    let addresses1 =[]
                    for(let key of user.addresses){
                        let address = {...user.addresses[key]}
                        addresses1=[...addresses1,address]
                    }
                    return addresses1    
                    }(),
                ...action.user,
                loading:false,
                userServerResponse:null
            }

        case actionTypes.UPDATE_USER:
            return{
                ...user,
                addresses:function(){
                    let addresses1 =[]
                    for(let key of user.addresses){
                        let address = {...user.addresses[key]}
                        addresses1=[...addresses1,address]
                    }
                    return addresses1    
                    }(),
                ...action.user,
                loading:false,
                userServerResponse:null
            }

        case actionTypes.ADD_ADDRESS:
            return{
                ...user,
                addresses:function(){
                    let addresses1 =[]
                    for(let key of user.addresses){
                        let address = {...user.addresses[key]}
                        addresses1=[...addresses1,address]
                    }
                    return addresses1.push(action.address)    
                    }(),
                loading:false,
                userServerResponse:null
            }

        case actionTypes.UPDATE_ADDRESS:
            return{
                ...user,
                addresses:function(){
                  const  newAddress= user.address.find(address => address.name === action.address.name)
                         for(let key in action.address){
                             newAddress[key] = action.address[key]
                         }
                    return [...user.addresses]
                }(),
                loading:false,
                userServerResponse:null
            }

        case actionTypes.REMOVE_ADDRESS:
            return{
                ...user,
                addresses:function(){
                    let addresses1 =[]
                    for(let key of user.addresses.filter(address => address.name != action.name)){
                        let address = {...user.addresses[key]}
                        addresses1=[...addresses1,address]
                    }
                    return addresses1    
                    }(),
                loading:false,
                userServerResponse:null
            }


        case actionTypes.SET_USER_SERVER_RESPONSE:
            return {
                ...user,
                addresses:function(){
                    let addresses1 =[]
                    for(let key of user.addresses){
                        let address = {...user.addresses[key]}
                        addresses1=[...addresses1,address]
                    }
                    return addresses1    
                    }(),
                loading:false,
                userServerResponse:action.message
            }

        case actionTypes.CLEAR_USER:
               return initialUser
      

        default : return user
    }
}

export default userReducer