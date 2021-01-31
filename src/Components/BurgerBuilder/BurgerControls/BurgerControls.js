import React,{Component} from 'react'
import ContainerWrapper from '../../UI/container-wrapper'
import Button from '@material-ui/core/Button';
import ButtonGroup from '../BurgerControls/ButtonGroup/ButtonGroup'

class BurgerControls extends Component{
       constructor(props){
         super(props)
         this.state={
           ingredients:[],
           ingredientsSummary:{

           },
           totalPrice:4
         }
       }

    render() {     
      return (
        <ContainerWrapper  style={{'box-shadow': '0 0 5px gray',width:'max-content','text-align':'center'}}>
            <p>Total Price: <b>Rs.{this.state.totalPrice}</b></p>
        <ButtonGroup ingredientName='Salad'/>
        <ButtonGroup ingredientName='Bacon'/>
        <ButtonGroup ingredientName='Cheese'/>
        <ButtonGroup ingredientName='Meat'/>
        <div className='btn'>Order</div>
        </ContainerWrapper>     
      );
    }
  }
export default BurgerControls

