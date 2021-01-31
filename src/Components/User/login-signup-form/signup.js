import React,{useEffect} from 'react';
import {connect} from 'react-redux'
import {signUp} from '../../../store/actions/auth'
import Spinner from '../../UI/spinner/spinner'




  const SignUp = function(props) {


  const firstRenderFirstName = React.useRef(true)
  const firstRenderLastName = React.useRef(true)
  const firstRenderEmail= React.useRef(true)
  const firstRenderPhone = React.useRef(true)
  const firstRenderPassword1 = React.useRef(true)
  const firstRenderPassword2 = React.useRef(true)
  const [firstName,setFirstName] = React.useState('')
  const [lastName,setLastName] = React.useState('')
  const [email,setEmail] = React.useState('')
  const [phone,setPhone] = React.useState('')
  const [password1,setPassword1]  = React.useState('')
  const [password2,setPassword2]  = React.useState('')
  const [error,setError] = React.useState({})
  const [formValidationMessage,setFormValidationMessage] = React.useState('')

  const rules ={
     firstName:{
       type:'string',
       required:true
     },
     lastName:{
       type:'string',
       required:true
     },
     email:{
       type:'email',
       required:true
     },
     phone:{
       type:'number',
       required:false,
       length1:10
     },
     password1:{
          type:'string',
          required:true,
          minLength:4
     },
     password2:{
      type:'string',
      required:true
     }
  }


  useEffect(()=>{

    if(firstRenderFirstName.current){
      firstRenderFirstName.current=false
      return
    }
    
    if(rules.firstName.required === true && rules.firstName.type==='string' && firstName === ''){
      setError({...error,firstName : 'First Name Required' })  
    }
    else if((/\d/.test(firstName))){
      setError({...error,firstName : 'Invalid FirstName' })  
    }
    else{
      setError({...error,firstName : null }) 
    }
  },
  [firstName])

  useEffect(()=>{
    if(firstRenderLastName.current){
      firstRenderLastName.current=false
      return
    }
    if(rules.lastName.required === true && rules.lastName.type==='string' && lastName === ''){
     setError({...error,lastName:'Last Name Required'})  
    }
    else if((/\d/.test(lastName))){
      setError({...error,lastName : 'Invalid LastName' })  
    }
    else setError({...error,lastName:null}) 
  },
  [lastName])

  useEffect(()=>{
    if(firstRenderEmail.current){
      firstRenderEmail.current=false
      return
    }
    if(rules.email.required === true && rules.email.type==='email' && email === ''){
      setError({...error,email:'Email Required'})  
    }
    else if(!email.includes('@') || !email.includes('.com')){
      setError({...error,email:'Invalid Email'})
    }
    else setError({...error,email:null})
  },
  [email])

  useEffect(()=>{
    if(firstRenderPhone.current){
      firstRenderPhone.current=false
      return
    }
    if(rules.phone.required === true && rules.phone.type==='number' && phone === ''){
      setError({...error,phone:'Phone Required'})  
    }
    else if(phone.length != rules.phone.length1 && (/[^a-z]/i.test(phone))){
     setError({...error,phone:'Phone number invalid'})
    }else{
      setError({...error,phone:null})
    }
  },
  [phone])

  useEffect(()=>{
    if(firstRenderPassword1.current){
      firstRenderPassword1.current=false
      return
    }
    if(rules.password1.minLength > password1.length){
      setError({...error,password1 : 'Password must atleast 4 characters'})
    }
    else setError({...error,password1 :null})
  },
  [password1])

  useEffect(()=>{
    if(firstRenderPassword2.current){
      firstRenderPassword2.current=false
      return
    }
     if(password1 !== password2){
    setError({...error,password2:'Passwords do not match'})
    }
    else setError({...error,password2:null})
  },
  [password2])


  const handleSubmit= function(event){

    event.preventDefault()
  
    if(Object.keys(error).length === 0){
      setFormValidationMessage('Form Empty')
      return
    }
    for(let key in error){
      if(error[key]!== null){
        setFormValidationMessage('Invalid inputs')
        return
      }
    }
    setFormValidationMessage('Success')
    const userData ={
      firstName:firstName,
      lastName:lastName,
      email:email,
      phone:phone,
      password:password1,
      addresses:[]
    }
     props.signUp(userData)
  }


  return (
      <div style={{width:'200px',borderRadius:'3px', padding:'10px',margin:'0 60px'}}>
      <div style={{margin:'0px auto', width:'max-content'}}>
      <h2 style={{textAlign:'center'}}>SignUp</h2>
      <form onSubmit={handleSubmit}>
      <input className='neutral-input' style={{background:'inherit'}} type='text' placeholder='First Name' value={firstName} onChange={(event)=>{setFirstName(event.target.value.trim())}}/>
       {error.firstName  && <p style={{fontSize:'10px',color:'coral',margin:'0'}}>{error.firstName}</p>}
      <br/>
      <input className='neutral-input' style={{background:'inherit'}} type='text' placeholder='Last Name' value={lastName} onChange={(event)=>{setLastName(event.target.value.trim())}} />     
      {error.lastName  && <p style={{fontSize:'10px',color:'coral',margin:'0'}}>{error.lastName}</p>} 
      <br/>
      <input className='neutral-input' style={{background:'inherit'}} type='text' placeholder='Email (any random email)' value={email} onChange={(event)=>{setEmail(event.target.value.trim())}}/>
      {error.email  && <p style={{fontSize:'10px',color:'coral',margin:'0'}}>{error.email}</p>}
      <br/>
      <input className='neutral-input' style={{background:'inherit'}} type='text' placeholder='Phone (Optional or some 10 digits)' value={phone} onChange={(event)=>{setPhone(event.target.value.trim())}}/>
      {error.phone  && <p style={{fontSize:'10px',color:'coral',margin:'0'}}>{error.phone}</p>}
      <br/>
      <input className='neutral-input' style={{background:'inherit'}} type='password' placeholder='Password (min 4 characters)' value={password1} onChange={(event)=>{setPassword1(event.target.value.trim())}}/>
      {error.password1  && <p style={{fontSize:'10px',color:'coral',margin:'0'}}>{error.password1}</p>}
      <br/>
      <input className='neutral-input' style={{background:'inherit'}} type='password' placeholder='Renter-password' value={password2} onChange={(event)=>{setPassword2(event.target.value.trim())}}/>
      {error.password2  && <p style={{fontSize:'10px',color:'coral',margin:'0'}}>{error.password2}</p>}
      <br/>
      <br/>
       <input type='submit' value='Sign Up'/>&nbsp;&nbsp;&nbsp;&nbsp;
      <p style={{ display:'inline',cursor:'pointer',textDecoration:'underline',color:'voilet'}} onClick={()=>{props.setIsSignUp(false)}}>SignIn</p>
      </form>
      {!formValidationMessage.includes('Success') && <p style={{color:'coral'}}>{formValidationMessage}</p>}
      <br/>
      {props.loading  ? <Spinner/> : props.isResponseFromServer  && ( props.error ?  <p style={{color:'coral'}}>{props.error}</p> : <p style={{color:'green'}}>You are Signed Up!!</p>)}
      <br/>
      </div>
      </div>
    )
}

const mapStateToProps = function(state){

  return{
       error:state.auth.signUpError,
       loading:state.auth.loading,
       isResponseFromServer:state.auth.isResponseFromServer
  }
}

const mapDispatchToProps = function(dispatch){

  return{
       signUp:(userData) => {dispatch(signUp(userData))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp)