import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/container';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

 const BurgerBuilderAppBar = function(props) {
  return (
    <div>
      <AppBar position="static" style={{padding:'15px','background':'#804000'}} height='10%'>
        <Container style={{'display':'flex','justify-content':'space-between'}}  maxWidth='md' >
          <Link to='/BurgerBuilder' className='link' style={{'margin':'0 7px',cursor:'pointer'}}>
           <p style={{margin:'0',padding:'0',fontSize:'20px'}}> Burger Builder</p>
          </Link>
          <div style={{'margin':'0','padding':'0'}}>
           <Link to='/User' className='link' style={{'margin':'0 7px',cursor:'pointer', textDecoration:'none'}}>Hi {props.name ? props.name : 'Guest'}</Link>
           <Link to='/About' className='link' style={{'margin':'0 7px',cursor:'pointer'}}>About</Link>
          </div>
        </Container>
      </AppBar>
    </div>
  );
}

const mapStateToProps = function(state){

  return{
    name:state.user.firstName
  }
}

export default connect(mapStateToProps,null)(BurgerBuilderAppBar)
