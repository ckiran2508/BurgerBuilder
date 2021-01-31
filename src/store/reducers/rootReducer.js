
import {combineReducers} from 'redux'
import authReducer from './auth'
import burgerReducer from './burger'
import cartReducer from './cart'
import pricesReducer from './prices'
import ingredientsReducer from './ingredients'
import errorReducer from './error'
import testReducer from './test'
import userReducer from './user'


const rootReducer = combineReducers({
    auth:authReducer,
    user:userReducer,
    burger:burgerReducer,
    cart:cartReducer,
    prices:pricesReducer,
    ingredients:ingredientsReducer,
    error:errorReducer,
    test:testReducer,
  })

  export default rootReducer
