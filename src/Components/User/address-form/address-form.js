import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import {updateUserAsync} from '../../../store/actions/user'
import {connect} from 'react-redux'

const AddressForm = function(props){

    const rules = {
        addressName:{
            type:'string',
            required:true,
            length1:15
        },
        line1:{
            type:'string',
            required:true,
            length1:25,
        },
        line2:{
            type:'string',
            required:true,
            length1:25,
        },
        line3:{
            type:'string',
            required:true,
            length1:25
        },
        zipCode:{
            type:'number',
            required:true,
            length:7
        }
    }

    const firstRenderAddressName= React.useRef(true)
    const firstRenderLine1 = React.useRef(true)
    const firstRenderLine2 = React.useRef(true)
    const firstRenderLine3 = React.useRef(true)
    const firstRenderZipCode = React.useRef(true)
    const [error,setError] = React.useState({})
    const [formStatus,setFormStatus]=React.useState('')
    const [addressName,setAddressName] = React.useState(props.address.name ? props.address.name : '');
    const [line1,setLine1] = React.useState(props.address.line1 ? props.address.line1 : '')
    const [line2,setLine2] = React.useState(props.address.line2 ? props.address.line2 : '')
    const [line3,setLine3] = React.useState(props.address.line3 ? props.address.line3 : '')
    const [zipCode,setZipCode] = React.useState(props.address.zipCode ? props.address.zipCode : '')


      useEffect(()=>{       
        if(firstRenderAddressName.current){
            firstRenderAddressName.current=false
            return
        }
        if((rules.addressName.required && addressName === '')) setError({...error,addressName:'[AddressName required]'})
        else if(rules.addressName.length1 <= addressName.length)  setError({...error,addressName:'[Address Name is exceeding characters limit]'})
        else setError({...error,addressName:undefined})
      },[addressName])
      
      useEffect(()=>{       
        if(firstRenderLine1.current){
            firstRenderLine1.current=false
            return
        }
        if((rules.line1.required && line1 === '')) setError({...error,line1:'[Line1 required]'})
        else if(rules.line1.length1 <= line1.length) setError({...error,line1:'[Line1 is exceeding characters limit]'})
        else setError({...error,line1:undefined})
      },[line1]) 

      useEffect(()=>{    
        if(firstRenderLine2.current){
            firstRenderLine2.current=false
            return
        }   
        if((rules.line2.required && line2 === '')) setError({...error,line2:'[Line2 required]'})
        else if(rules.line2.length1 <= line2.length) setError({...error,line2:'[Line2 is exceeding characters limit]'})
        else setError({...error,line2:undefined})
      },[line2]) 

      useEffect(()=>{     
          if(firstRenderLine3.current){
              firstRenderLine3.current=false
              return
          }  
        if((rules.line3.required && line3 === '')) setError({...error,line3:'[Line3 required]'})
        else if(rules.line3.length1 <= line3.length) setError({...error,line3:'[Line3 is exceeding characters limit]'})
        else setError({...error,line3:undefined})
      },[line3]) 

      useEffect(()=>{    
        if(firstRenderZipCode.current){
            firstRenderZipCode.current=false
            return
        }   
        if((rules.zipCode.required && zipCode === '')) setError({...error,zipCode:'[ZipCode required]'})
        else if((rules.zipCode.length <= zipCode.length)) setError({...error,zipCode:'[ ZipCode and should not exceed 7 characters]'})
        else if((rules.zipCode.type=== 'number' && !(/[^a-z]/i.test(zipCode)))) setError({...error,zipCode:'[Zipcode should contain only number]'})
        else setError({...error,zipCode:undefined})
      },[zipCode]) 

      const handleSave= function(){
          for(let key in error){
              if(error[key]!==undefined) {
                   setFormStatus('Cannot Save. Invalid Form Inputs')
                   return
              }
          }
          const {loading,userServerResponse,...user} = props.user
          if(props.addAddress){
               const newAddress={
                   name:addressName,
                   line1:line1,
                   line2:line2,
                   line3:line3,
                   zipCode:zipCode
               }
               user.addresses.push(newAddress)
          }else{
              const address = user.addresses.find(a => a.name === props.address.name)
              address.name=addressName
              address.line1=line1
              address.line2=line2
              address.line3=line3
              address.zipCode=zipCode
          }
          
          props.updateUser(user)
          props.closeModal()

      }

    return(
        <div className='address-form'>     
            <h3 style={{textAlign:'center'}}>{props.formHeading}</h3>
            <input type='text' className= {error.addressName ? 'wrong-input':'neutral-input'} placeholder='Address Name*' value={addressName} onChange={(event) => setAddressName(event.target.value)}/>
            <p style={{fontSize:'10px',color:'coral', margin:'0 45px'}}>{error.addressName}</p>
            <input type='text' className= {error.line1 ? 'wrong-input':'neutral-input'} placeholder='Line1' value={line1} onChange={(event) => setLine1(event.target.value)}/>
            <p style={{fontSize:'10px',color:'coral',margin:'0 45px'}}>{error.line1}</p>
            <input type='text' className={error.line2 ? 'wrong-input':'neutral-input'} placeholder='Line2' value={line2} onChange={(event) => setLine2(event.target.value)}/>
            <p style={{fontSize:'10px',color:'coral',margin:'0 45px'}}>{error.line2}</p>
            <input type='text' className={error.line3 ? 'wrong-input':'neutral-input'}placeholder='Line3' value={line3} onChange={(event) => setLine3(event.target.value)}/> 
           <p style={{fontSize:'10px',color:'coral',margin:'0 45px'}}>{error.line3}</p> 
            <input type='text' className={error.zipCode ? 'wrong-input':'neutral-input'} placeholder='ZipCode' value={zipCode} onChange={(event) => setZipCode(event.target.value)}/> 
           <p style={{fontSize:'10px',color:'coral',margin:'0 45px'}}>{error.zipCode}</p>
            <br/>
        <br/>
        <span style={{margin:'auto'}}> 
        <Button onClick={props.closeModal} style={{width:'max-content',margin:'5px'}} variant="contained" color='secondary'>Cancel</Button>
        <Button style={{width:'max-content',margin:'5px'}} variant="contained" color='primary' onClick={handleSave}>Save</Button>
        </span>
        <p style={{color:'coral'}}>{formStatus}</p>
        </div>
    )
}

const mapStateToProps = function(state){

    return {
        user:state.user
    }
}

const mapDispatchToProps = function(dispatch){

    return{
        updateUser:(user)=> {dispatch(updateUserAsync(user))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddressForm)