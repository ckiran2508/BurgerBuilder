import * as actionTypes from '../actionTypes'

const initialAuthState={

    token:null,
    id:null,
    loading:false,
    error:null,
    isAuthenticated:false,
    isResponseFromServer:false,
    signInError:null,
    signUpError:null,
}

const authReducer = function(authState=initialAuthState,action){

    switch(action.type){

        case actionTypes.AUTH_START:
            return {
                ...authState,
                loading:true
            }              

        case actionTypes.AUTH_SIGN_IN_SUCCESS:
            return{
                ...authState,
                token:action.idToken,
                id:action.id,
                signInError:null,
                loading:false,
                isAuthenticated:true,          
            }

        case actionTypes.AUTH_SIGN_IN_FAILED :
            
            return{
                ...authState,
                signInError:action.signInError,
                loading:false,
                isAuthenticated:false,
            }

            case actionTypes.AUTH_SIGN_UP_SUCCESS:
                return{
                    ...authState,
                    token:action.idToken,
                    id:action.id,
                    signUpError:null,
                    loading:false,
                    isAuthenticated:true,
                    isResponseFromServer:true
                }
    
            case actionTypes.AUTH_SIGN_UP_FAILED :
                
                return{
                    ...authState,
                    signUpError:action.signUpError,
                    loading:false,
                    isAuthenticated:false,
                    isResponseFromServer:true
                }

            case actionTypes.AUTH_SIGNOUT:
                return{
                    ...authState,
                    token:null,
                    id:null,
                    isAuthenticated:false
                }
       
            default: return authState
    }
}

export default authReducer