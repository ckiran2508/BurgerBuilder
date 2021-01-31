import React, { Component } from 'react'
import ContainerWrapper from '../UI/container-wrapper'
import Button from '@material-ui/core/Button';
import ButtonGroup from './BurgerControls/ButtonGroup/ButtonGroup'
import BurgerIngredient from './Burger/BreadIngredient'
import './BurgerBuilder.css'
import TransitionsModal from '../UI/modal/modal'
import Burger from './Burger/Burger'
import IngredientSummary from './IngredientSummary'
import {connect} from 'react-redux'
import {addIngredient,addtoCart,removeIngredient,getSummary,setQuantity}  from '../../store/actions/burger'
import {fetchPrices,initPrices} from '../../store/actions/prices'
import {fetchIngredients} from '../../store/actions/ingredients'
import {addToCartAsync, updateCartAsync} from '../../store/actions/cart'
import {v4 as uuid} from 'uuid'
import Spinner from '../UI/spinner/spinner'


const burgerStyle={width:'50%',height:'270px','overflow-y':'auto'}

const MAX_LAYERS=8

class BurgerBuilder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen:false
        }
    }

    showModal=()=>{
        this.setState({modalOpen:!this.state.modalOpen})
    }

   placeOrderHandler =()=>{
    this.showModal()
    }


    componentDidMount(){
        this.props.fetchPricesHandler()
        this.props.fetchIngredientsHandler()
    }

    componentWillUnmount(){
        console.log('Burger Builder Component Will Unmount called')
    }


    addToCartHandler=()=>{
        const {loading,serverResponse,...cart} = this.props.cart
        const {error,...burger}=this.props.burger
        burger.id=uuid()
        cart.burgers.push(burger)   
       const cartTotal=function(){
            return Object.keys(cart.burgers).reduce((total,key) => {
                return total+= (cart.burgers[key].totalPrice * cart.burgers[key].quantity)      
              },0)
          }()
        cart.cartTotal=cartTotal
        this.props.updateCart(cart)
        setTimeout(()=>{
             this.setState({modalOpen:false})
        },3000)
    }

    buttonControls = ()=>{

        return (
            <React.Fragment>
                 <p>Total Price: <b>Rs.{this.props.burger.totalPrice}</b></p>
                    {
                      this.props.ingredients ? this.props.ingredients.ingredientsArray.map(key => <ButtonGroup onAdd={()=> this.props.addIngredientHandler(key,this.props.prices[key])} onRemove={() => this.props.removeIngredientHandler(key,this.props.prices[key])}  key={key} ingredientName={key} />) : 'Loading...'
                    }
                    <div onClick={this.placeOrderHandler} className='btn2'>Continue</div>
            </React.Fragment>
        )
    }

    render() {
       
        return (
            <ContainerWrapper>
                <TransitionsModal open={this.state.modalOpen} onClose={() => {this.setState({modalOpen:false})}}>
                {this.props.burger.ingredients.length>=1 ?  <IngredientSummary burger={this.props.burger} prices={this.props.prices} getSummaryHandler={() => this.props.getSummaryHandler()} setQuantityHandler={(quantity)=> this.props.setQuantityHandler(quantity)} loading={this.props.loading} addToCart={this.addToCartHandler} serverResponse={this.props.serverResponse} isAuthenticated={this.props.isAuthenticated} onBackClick={this.showModal}/> : <h4>&nbsp;&nbsp;Your Order is Empty. Please build you burger&nbsp;&nbsp;</h4> }
                </TransitionsModal>       
                <ContainerWrapper style={{background:'#fff2e6',width:'100%'}}>        
                <Burger ingredients={this.props.burger.ingredients} style={burgerStyle}/>
                </ContainerWrapper>
                <ContainerWrapper style={{ 'box-shadow': '0 0 5px gray', width: 'max-content', 'text-align': 'center' }}>
                   {this.props.prices.loading ? <Spinner/> : this.buttonControls()}
                </ContainerWrapper>
            </ContainerWrapper>
        );
    }
}

const mapStatetoProps= function(state){
      
    return{
        ingredients:state.ingredients,
        prices:state.prices,
        burger:state.burger,
        serverResponse:state.cart.serverResponse,
        loading:state.cart.loading,
        isAuthenticated:state.auth.isAuthenticated,
        cart:state.cart
    }
}

const mapDispatchToProps= function(dispatch){
    return{
        addIngredientHandler: (ingredientName,price)=>{
            dispatch(addIngredient(ingredientName,price))
        },
        removeIngredientHandler:(ingredientName,price)=>{
            dispatch(removeIngredient(ingredientName,price))
        },
        placeOrderHandler: (ingredientName)=>{
            dispatch(addtoCart(ingredientName))
        },
        fetchPricesHandler: ()=>{
            dispatch(fetchPrices())
        },
        fetchIngredientsHandler: ()=>{
            dispatch(fetchIngredients())
        },
        getSummaryHandler: ()=>{
            dispatch(getSummary())
        },
        setQuantityHandler: (quantity)=>{
            dispatch(setQuantity(quantity))
        },
        updateCart:(cart)=>{
            dispatch(updateCartAsync(cart))
        }
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(BurgerBuilder)

