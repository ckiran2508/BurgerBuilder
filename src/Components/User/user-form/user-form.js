import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import {updateUserAsync} from '../../../store/actions/user'


const UserForm = function(props){

    const formData ={
        firstName :{
            type:'string',
            required:true,
            isValid:true
        },
        lastName :{
            type:'string',
            required:true,
            isValid:true
        },
        phone :{
            type:'number',
            required:true,
            length1:10,
            isValid:true
        },
        email :{
            type:'email',
            required:true,
            isValid:true
        },
       
    }

    
    const firstRenderFirstName= React.useRef(true) 
    const firstRenderLastName= React.useRef(true)
    const firstRenderPhone= React.useRef(true)
    const firstRenderEmail= React.useRef(true)   
    const [firstName,setFirstName] = React.useState(props.user.firstName ? props.user.firstName : '' )
    const [lastName,setLastName] = React.useState(props.user.lastName ? props.user.lastName : '')
    const [phone,setPhone] = React.useState(props.user.phone ? props.user.phone : '')
    const [email,setEmail] = React.useState(props.user.email ? props.user.email : '')
    const [firstNameValid,setFirstNameValid] = React.useState(true)
    const [lastNameValid,setLastNameValid] = React.useState(true)
    const [phoneValid,setPhoneValid] = React.useState(true)
    const [emailValid, setEmailValid] = React.useState(true)
    const [error,setError] = React.useState('')

    useEffect(()=>{
        if(firstRenderFirstName.current){
            firstRenderFirstName.current=false
            return
        }
        formData.firstName.isValid =  formData.firstName.required && !(firstName==='') && (formData.firstName.type==='string' && !(/\d/.test(firstName)))  && formData.firstName.isValid     
        setFirstNameValid(formData.firstName.isValid)
    },[firstName])

    useEffect(()=>{
        if(firstRenderLastName.current){
            firstRenderLastName.current=false
            return
        }
        formData.lastName.isValid =  formData.lastName.required && !(lastName==='') && (formData.lastName.type==='string' && !(/\d/.test(lastName))) && formData.lastName.isValid      
        setLastNameValid(formData.lastName.isValid) 
    },[lastName])

    useEffect(()=>{
        if(firstRenderPhone.current){
            firstRenderPhone.current=false
            return
        }
        formData.phone.isValid =  formData.phone.required && !(phone==='') && (formData.phone.type==='number' && (/[^a-z]/i.test(phone))) && (phone.length === formData.phone.length1) && formData.phone.isValid  
        setPhoneValid(formData.phone.isValid)
    },[phone])

    useEffect(()=>{
        if(firstRenderEmail.current){
            firstRenderEmail.current=false
            return
        }
        formData.email.isValid =  formData.email.required && !(email==='') && (formData.email.type==='email' && email.includes('@') && email.includes('.com')  ) && formData.email.isValid      
        setEmailValid(formData.email.isValid)
    },[email])


    const handleClick= function(){
        if(firstNameValid && lastNameValid && phoneValid && emailValid){
            const user={
                id:props.user.id,
                firstName:firstName,
                lastName:lastName,
                email:email,
                phone:phone,
                addresses:[...props.user.addresses]
            }
            props.handleUpdate(user)
            props.closeModal()
        }else{
             setError('Form Invalid. Please Check the inputs')
        }
    }

    return(
        <div className='user-form'>
            <h3 style={{textAlign:'center'}}>{props.formHeading}</h3>
            <input type='text' className={firstNameValid? 'neutral-input':'wrong-input'} placeholder='First Name*' value={firstName} onChange={(event)=> setFirstName(event.target.value.trim())}/>
            <input type='text' className={lastNameValid? 'neutral-input':'wrong-input'} placeholder='Last Name*' value={lastName} onChange={(event => setLastName(event.target.value.trim()))}/>
            <input type='text' className={phoneValid? 'neutral-input':'wrong-input'} placeholder='Phone*' value={phone} onChange={(event => setPhone(event.target.value.trim()))}/>
            <input type='text' className={emailValid? 'neutral-input':'wrong-input'} disabled={true} placeholder='Email*' value={email} onChange={(event => setEmail(event.target.value.trim()))}/>
            <br/>
        <span style={{margin:'auto'}}>
        <Button onClick={props.closeModal} style={{width:'max-content',margin:'5px'}} variant="contained" color='secondary'>Cancel</Button>
        <Button  style={{width:'max-content',margin:'5px'}} variant="contained" color='primary' onClick={handleClick}>Save</Button>
        </span>
        <p style={{color:'red'}}>{error}</p>
        </div>
    )
}

const mapStateToProps= function(state){

    return{
        user:state.user
    }
}

const mapDispatchToProps = function(dispatch){

    return{
      handleUpdate : (user)=> {dispatch(updateUserAsync(user))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserForm)


