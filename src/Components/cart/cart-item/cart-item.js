import React from 'react'
import './cart-item.css'
import Burger from '../../BurgerBuilder/Burger/Burger'

const ingredients=['salad','bacon','cheese','meat']

const burgerStyle={'margin-left':'10px',width:'125px',height:'100px','overflow-y':'auto'}

const CartItem = function(props){


    return(
        <div className='cart-item'>
            <Burger ingredients={ingredients}  style={burgerStyle}/>
        <table>
            <tbody>
              {Object.keys(props.burger.ingredientsSummary).map(item => <tr><td>{item}</td><td>{props.burger.ingredientsSummary[item]}</td></tr>)}                           
            </tbody>
        </table>  
        <p onClick = {()=> {props.removeItemHandler(props.burger)}}>Remove</p>
        <p>Qty:&nbsp;{props.burger.quantity}</p>
        <p><b>Total: Rs.{props.burger.totalPrice * props.burger.quantity}</b></p>
        </div>
    )
}

export default CartItem