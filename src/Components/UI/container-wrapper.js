import React from 'react'
import Container from '@material-ui/core/Container';
import '../../App.css'


const ContainerWrapper = function(props){
    return(
        <Container style={{...props.style}} className='container'>
            {props.children}
        </Container>
    )
}

export default  ContainerWrapper