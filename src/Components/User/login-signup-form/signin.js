import React,{useEffect} from 'react';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux'
import {signIn} from '../../../store/actions/auth'
import {loadUserAsync} from '../../../store/actions/user'
import Spinner from  '../../UI/spinner/spinner'





 const  SignIn = function(props) {
 
  const firstRenderEmail = React.useRef(true)
  const [email,setEmail] = React.useState('')
  const [password,setPassword] = React.useState('')
  const [error,setError] = React.useState({})

  const rules ={
    email:{
      type:'email',
      required:true
    }
  }

  useEffect(()=>{
    if(firstRenderEmail.current){
      firstRenderEmail.current=false
      return
    }
      if((rules.email.required && email === '')){
        setError({...error,email:'Email cannot be Empty'})
      }
      else if (rules.email.type=== 'email' &&  !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))){
        setError({...error,email:'Email is Not Valid'})
      }
      else {
        setError({...error,email:null})
      }

  },[email])


  const submitHandler = function(event){
    event.preventDefault()
    props.authHandler(email,password)
    setTimeout(()=>{
      props.onClose()
    },4000)
   // props.loadUser(email)
  }

  let message
  return(
    <div style={{width:'200px',borderRadius:'3px', padding:'10px',margin:'0 60px'}}>
    <div style={{margin:'auto', width:'max-content'}}>
    <h2 style={{textAlign:'center'}}>SignIn</h2>
    <form onSubmit={submitHandler}>
    <input className='neutral-input' style={{background:'inherit'}} type='text' value={email} onChange={(event) => setEmail(event.target.value.trim())} placeholder='email'/>
    {error.email && <p style={{fontSize:'10px',color:'coral',margin:'1px'}}>{error.email}</p>}
    <br/>
    <input className='neutral-input' style={{background:'inherit'}} type='password' value={password} onChange={(event) => setPassword(event.target.value.trim())} placeholder='password'/>      
    <br/>
    <br/>
    <input type='submit' value={'SignIn'}/>&nbsp;&nbsp;&nbsp;&nbsp;
    <p style={{ display:'inline',cursor:'pointer',textDecoration:'underline',color:'voilet'}} onClick={()=>{props.setIsSignUp(true)}}>SignUp</p>
    </form>
    </div>
    <p style={{fontSize:'14px',color:'coral'}}>{props.error}</p>
    <br/>
    {props.loading && <Spinner/>}
    <br/>
    {props.isAuthenticated && <p style={{color:'green'}}>You are Signed In!!</p>}
    </div>
  )
}

const mapStatetoProps = function(state){
  return{
    error:state.auth.signInError,
    loading:state.auth.loading,
    isAuthenticated:state.auth.isAuthenticated
  }
}

const mapDispatchToProps = function(dispatch){

  return{
   authHandler:(email,password)=>{dispatch(signIn(email,password))},
   loadUser:(email) => {dispatch(loadUserAsync(email))}
  }
}

export default connect(mapStatetoProps,mapDispatchToProps)(SignIn)


