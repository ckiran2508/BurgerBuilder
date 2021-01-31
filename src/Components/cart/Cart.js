import React from 'react'
import CartItem from './cart-item/cart-item'
import Spinner from '../UI/spinner/spinner'
import TransitionModal from '../UI/modal/modal'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import {loadCartAsync,removeFromCartAsync, updateCartAsync} from '../../store/actions/cart'
import './cart.css'
import {v4 as uuid} from 'uuid'
import axiosInstance from '../../axios-orders'
import ButtonSpinner from '../UI/button-spinner/button-spinner'



class Cart extends React.Component{

    state={
        showSpinner:false,
        modalOpen:false,
        selectedAddress:null,
        selectedDeliveryMethod:'Fastest',
        serverResponse:null
    }

    cartTray = function(){
        return (
         <React.Fragment>
        {this.props.cart.burgers.map(burger => <CartItem key={burger.id} removeItemHandler={this.removeCartItemHandler}  burger={burger} />)}
        <div style={{width:'90%',height:'50px',margin:'15px auto',borderRadius:'3px',boxShadow:'0 0 5px gray',background:'#fff5e6'}}>
        <p style={{textAlign:'center'}}>Cart Total. <b>Rs.{this.props.cart.cartTotal}</b></p>  
        </div>
        <div className='place-order' onClick={()=>{this.setState({modalOpen:true})}} style={{width:'90%',height:'50px',margin:'15px auto',borderRadius:'3px',border:'1px solid lightgray',background:'#fff5e6'}}>
        <p style={{textAlign:'center'}} ><b>Place Order</b></p> 
        </div>
        </React.Fragment>
        )
    }


    getSelectedAddress = (event)=>{
        const addressName = event.target.value
        const address = this.props.addresses.find(a => a.name === addressName)
        this.setState({selectedAddress:address})
    }

    setDeliveryMethod = (event) =>{
        const deliverymethod = event.target.value
        this.setState({selectedDeliveryMethod:deliverymethod})
    }

    placeOrderHandler = ()=>{
        if(this.state.selectedAddress === null){
            this.setState({serverResponse:'No Address is Selected. Please add and select address'})
            this.setState({showSpinner:false})
            return
        }
        var currentdate = new Date(); 
        var datetime = currentdate.getDate() + '-'
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getFullYear() + '  '  
                + currentdate.getHours() + ':' 
                + currentdate.getMinutes() 

         const order ={
             id:uuid(),
             userid:this.props.userid,
             orderDate:datetime,
             orderTotal:this.props.cart.cartTotal,
             burgers:this.props.cart.burgers,
             address:this.state.selectedAddress,
             deliveryMethod:this.state.selectedDeliveryMethod
         }
         this.setState({showSpinner:true})
         axiosInstance.post('/orders',order)
         .then(response => this.setState({serverResponse:'Your Order has been placed Successfully'}))
         .catch(err => this.setState({serverResponse:'Something went wrong.Try Later'}))
         this.setState({showSpinner:false})
         setTimeout(()=>{
          this.setState({modalOpen:false})
         },6000)
    }

    contents= function(){

        return(
            <React.Fragment>
                 {this.props.cart.loading ? <Spinner/> : this.props.cart.burgers.length> 0 ? this.cartTray() : <h4 style={{margin:'auto'}}>Cart is Empty</h4>}        
             <TransitionModal open={this.state.modalOpen} onClose={()=>{this.setState({modalOpen:false})}}>
             <div style={{margin:'7px', borderRadius:'3px'}}>
                 <h3 style={{textAlign:'center'}}>CheckOut</h3>
                 <table>
                 <tbody>
                 <tr>
                 <td><label style={{display:'inline'}}>Select Address:</label></td>
                 <td>{this.props.addresses.length >0 ? <select onChange={this.getSelectedAddress}>
                     <option>Select</option>
                     {this.props.addresses.map(address => <option>{address.name}</option>)}
                 </select>: <p>No Address Added</p>}
                 </td>
                 </tr>
                 <br/>
                 <tr>
                 <td><label style={{display:'inline'}}>Delivery Method:</label>&nbsp;</td>
                <td><select onChange={this.setDeliveryMethod}>
                     <option>Fastest</option>
                     <option>Cheapest</option>                    
                 </select>
                 </td>
                 </tr>
                 <br/>
                 </tbody>
                 </table>
                 <br/>
                 <Button size='small' onClick={()=>{this.setState({modalOpen:false})}} variant="contained" color="secondary">Back</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                 <Button size='small' variant="contained" color="primary" onClick={this.placeOrderHandler}>{this.state.showSpinner ? <ButtonSpinner/>:'Place Order'}</Button>  
                 {this.state.serverResponse && (this.state.serverResponse.includes('Success') ? <p style={{color:'green'}}>{this.state.serverResponse}</p>: <p style={{color:'coral'}}>{this.state.serverResponse}</p> )}
             </div>
             </TransitionModal>
            </React.Fragment>
        )
    }


   componentDidMount(){
     this.props.loadCartHandler()
   }

   componentWillUnmount(){
    console.log('Cart Component Will Unmount called')
}

     removeCartItemHandler= (burger)=>{
        const {loading,serverResponse,...cart} = this.props.cart
        const cartTotal=function(){
            const burgerToBeRemoved = cart.burgers.find(current=> current.id===burger.id)
             return cart.cartTotal - (burgerToBeRemoved.quantity * burgerToBeRemoved.totalPrice)
         }()
        const burgers = cart.burgers.filter(b => b.id !== burger.id)
        cart.cartTotal=cartTotal
        cart.burgers = burgers
        this.props.updateCart(cart)
     }

    render(){

            return(
                <div className='cart'>
                    <p style={{width:'100%',border:'1px solid lightgray',borderRadius:'3px',textAlign:'center'}}><b>Cart</b></p>
                {this.props.isAuthenticated ? this.contents() : <p> You are not Signed In . Please SignIn (demo creds email:test@test.com , password:test123) </p> }
        </div>
            )
    }
}

const mapStatetoProps = (state)=>{

    return{
        cart: state.cart,
        isAuthenticated:state.auth.isAuthenticated,
        addresses:state.user.addresses,
        userid:state.user.id
    }
}

const mapDispatchToProps = (dispatch) =>{

    return{
        loadCartHandler: () => {dispatch(loadCartAsync())},
        removeFromCartHandler: (cartItem) => { dispatch(removeFromCartAsync(cartItem))},     
        updateCart: (cart) =>  {dispatch(updateCartAsync(cart))}
    }
}



export default connect(mapStatetoProps,mapDispatchToProps)(Cart)