import React from 'react'
import OrderCard from './order-card/order-card'
import './orders.css'
import Spinner from '../UI/spinner/spinner'
import {connect} from 'react-redux'
import { render } from '@testing-library/react'
import axiosInstance from '../../axios-orders'
import TransitionModal from '../UI/modal/modal'
import Burger from '../BurgerBuilder/Burger/Burger'
import axios from 'axios'




class Orders extends React.Component{
  
    state={
        showSpinner: false,
        orders:[],
        errormessage:null,
        showModal:false,
        selectedOrder:{}
    }

    componentDidMount(){

      this.setState({showSpinner:true})
       axiosInstance.get('/orders/'+this.props.userid)
       .then(response => this.setState({showSpinner:false,orders:response.data}))
       .catch(error => this.setState({showSpinner:false,errormessage:'Failed to Get Orders'}))
    }

    componentWillUnmount(){
      console.log('Orders Component Will Unmount called')
  }

  deleteHandler=(orderid)=>{
    this.setState({showSpinner:true})
    axiosInstance.delete('/orders/'+orderid)
    .then(response => {axiosInstance.get('/orders/'+this.props.userid)
                      .then(response => this.setState({showSpinner:false,orders:response.data}))
                      .catch(error => this.setState({showSpinner:false,errormessage:'Failed to Delete Orders'}))})
                      .catch(error => this.setState({showSpinner:false,errormessage:'Failed to Get Orders'}))
  }

  viewOrderHandler = (orderid)=>{
    const selectedOrder = this.state.orders.find(order => order.id === orderid)
    this.setState({showModal:true,selectedOrder:selectedOrder})
  }

    render(){
    return(
        <div className='orders'>
          <p style={{textAlign:'center',border:'1px solid lightgray',borderRadius:'3px'}}><b>Orders</b></p>
           {this.props.isAuthenticated ? this.state.showSpinner? <Spinner/> : this.state.orders? this.state.orders.map(order => <OrderCard key={order.id} order={order} viewOrderHandler={this.viewOrderHandler} deleteHandler={this.deleteHandler} />): <p style={{margin:'auto'}}>No Orders Found</p> : <p>You are not Signed In . Please SignIn (demo creds email:test@test.com , password:test123)</p>}
           <p>{this.state.errormessage}</p>
          <TransitionModal open={this.state.showModal} onClose={() => {this.setState({showModal:false})}}>
            <ViewOrder {...this.state.selectedOrder}/>
          </TransitionModal>
        </div>
    )
    }
}

const mapStatetoProps = function(state){

  return{
    isAuthenticated:state.auth.isAuthenticated,
    userid:state.user.id
  }
    
}

export default connect(mapStatetoProps,null)(Orders)



const ingredients=['salad','bacon','cheese','meat']

const burgerStyle={margin:'3px',marginLeft:'10px',width:'100px',height:'75px','overflow-y':'auto'}

const ViewOrder = function(props){

  
  return(
      <div className='view-order'>
        <b style={{margin:'auto'}}>Order Details</b>
         <div className='burgers-wrapper'>
       { props.burgers.map(burger => <div className='burger-box'>
         <Burger ingredients={ingredients}  style={burgerStyle}/>
         <p style={{textAlign:'center'}}>Price: Rs.{burger.quantity*burger.totalPrice}</p>
         </div>)}
         </div>
         
     <table height='200' width='400'>
       <tbody>
         <tr>
           <td>Address:</td>
           <td>{Object.keys(props.address).map(line => <p style={{margin:'0'}}>{props.address[line]}</p>)}</td>
         </tr>
         <tr>
           <td>DeliveryMethod:</td>
           <td>{props.deliveryMethod}</td>
         </tr>
         <tr>
           <td>OrderTotal:</td>
           <td><b>Rs.{props.orderTotal}</b></td>
         </tr>
       </tbody>
     </table>
      </div>
  )


}