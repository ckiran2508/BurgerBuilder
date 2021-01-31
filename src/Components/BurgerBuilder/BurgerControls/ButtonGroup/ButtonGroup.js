import React from 'react'
import './ButtonGroup.css'



const ButtonGroup = function(props){

    return(
    <div className='btn-grp'>
    <div className='btn' onClick={props.onRemove}><b>-</b></div>
    <div className='label'style={{'text-transform': 'capitalize'}} >
     {props.ingredientName}
    </div>
    <div className='btn' onClick={props.onAdd}><b>+</b></div>
    </div>
    )
}

export default ButtonGroup