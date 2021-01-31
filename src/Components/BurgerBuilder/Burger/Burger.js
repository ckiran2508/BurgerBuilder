import React from 'react'
import ContainerWrapper from '../../UI/container-wrapper'
import BurgerIngredient from './BreadIngredient'
import {v4 as uuid} from 'uuid'


const Burger = React.memo(function(props){
        return(
           
            <ContainerWrapper style={props.style} >
             <BurgerIngredient type='bread-top'/>
             {props.ingredients.length>=1 ? props.ingredients.map(key => <BurgerIngredient key={uuid()} type={key} />) : <h4 style={{'text-align':'center'}}>Add Ingredients!! </h4>}
             <BurgerIngredient type='bread-bottom'/>
             </ContainerWrapper>
          
        )
    })
export default Burger

