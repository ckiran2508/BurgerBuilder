import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'
import ButtonSpinner from '../UI/button-spinner/button-spinner'
import Alert from '@material-ui/lab/Alert';
import {connect} from 'react-redux'
import {updateCartAsync} from '../../store/actions/cart'



const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
});

const IngredientsSummary=function(props) {
  const classes = useStyles();

  const [disable,setDisable] = React.useState(false)
  const [showSpinner,setShowSpinner] = React.useState(false)
  const [status,setStatus] = React.useState({type:'',message:'',fromServer:false})
  const [quantity,setQuantity] = React.useState(1)
  const [showAlert,setShowAlert] = React.useState(false)


  useEffect(()=>{props.getSummaryHandler()},[])

  const addToCartHandler = function(){
      props.addToCart()
      setShowAlert(true)
      setTimeout(()=>setShowAlert(false),10000)
  }

  const contents = function(){
    return(
      <React.Fragment>
      <Table className={classes.table} >
      <TableHead>
        <TableRow >
          <TableCell align="center"><b>Ingredient</b></TableCell>
          <TableCell align="center"><b>Quantity</b></TableCell>
          <TableCell align="center"><b>Unit Price</b></TableCell>
          <TableCell align="center"><b>Total</b></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>       
              {
                 Object.keys(props.burger.ingredientsSummary).map(key =>
                     <TableRow key={key} className={classes.tableRow}>
                         <TableCell style={{'text-transform': 'capitalize'}} align="center">{key}</TableCell>
                         <TableCell align="center">{props.burger.ingredientsSummary[key]}</TableCell>
                         <TableCell align="center">{props.prices[key]}</TableCell>
                         <TableCell align="center">{props.burger.ingredientsSummary[key] * props.prices[key]}</TableCell>
                     </TableRow>
                 )
              }
      <TableRow >
      <TableCell align="center">Base</TableCell>
      <TableCell align="center">1</TableCell>
      <TableCell align="center">4</TableCell>
      <TableCell align="center">4</TableCell>
      </TableRow>
      <TableRow >
      <TableCell align="center"></TableCell>
      <TableCell align="center"></TableCell>
      <TableCell align="center"><b>Total</b></TableCell>
      <TableCell align="center"><b>Rs.&nbsp;{props.burger.totalPrice}</b></TableCell>
      </TableRow>
      <TableRow >
      <TableCell align="center"></TableCell>
      <TableCell align="center"></TableCell>
      <TableCell align="center">Qty</TableCell>
      <TableCell align="center">x&nbsp;<input style={{marginLeft:'20px'}} type="number" name="quantity" placeholder='Qty' value={props.burger.quantity} onChange={(event)=>{props.setQuantityHandler(event.target.value)}} min="1" max="10"/></TableCell>
      </TableRow>  
      <TableRow >
      <TableCell align="center"></TableCell>
      <TableCell align="center"></TableCell>
      <TableCell align="center"><b>Total Price</b></TableCell>
      <TableCell align="center"><b>Rs.&nbsp;{props.burger.quantity * props.burger.totalPrice}</b></TableCell>
      </TableRow>  
      </TableBody>
    </Table>
    <br/>
    <Button variant="contained"  size='small' color='secondary' onClick={props.onBackClick}>Back</Button>
    <Button style={{marginLeft:'20px'}} variant="contained" size='small' color='primary'  disabled={props.loading && disable} onClick={addToCartHandler}>{props.loading ? <ButtonSpinner/> : 'Add To Cart'}</Button> 
    { showAlert ? props.serverResponse && (props.serverResponse.includes('failed')  ?  <Alert style={{'margin-top':'10px','padding':'1px'}} severity={'error'}>Something went wrong. Please try Later...</Alert> : <Alert style={{'margin-top':'10px','padding':'1px'}} severity={'info'}>Added to Cart</Alert>) : ''}
    </React.Fragment>
    )
  }

  return (
      <React.Fragment>
       {props.isAuthenticated ? contents() : <h4>You are not Signed In . Please SignIn (demo creds email:test@test.com , password:test123)</h4>}     
      </React.Fragment>
  );
}

const mapStateToProps = function(state){

  return{
    cart:state.cart
  }
}
 const mapDispatchToProps = function(dispatch){

  return {
    updateCart : (cart) => {dispatch(updateCartAsync(cart))}
  }
 }

 export default connect(mapStateToProps,mapDispatchToProps)(IngredientsSummary)

