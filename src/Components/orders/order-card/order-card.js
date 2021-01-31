import { Button } from '@material-ui/core'
import React from 'react'
import './order-card.css'

const OrderCard = function(props){


    return(
        <div className='order-card'>
          <p onClick={()=>{props.viewOrderHandler(props.order.id)}}><b>Order Id:</b> {props.order.id}</p>
          <p><b>Date:</b> {props.order.orderDate}</p>
          <p><b>Order Total</b> : Rs.{props.order.orderTotal}</p>
          <div style={{display:'flex',margin:'auto'}}>
          <div className='btn2' style={{margin:'auto',padding:'0 3px 0 3px'}}  onClick={() => props.deleteHandler(props.order.id)}>Delete</div>
          </div>
        </div>
    )
}

export default OrderCard