import React from 'react'
import './User.css'
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import TransitionsModal from '../UI/modal/modal'
import Spinner from '../UI/spinner/spinner'
import UserForm from './user-form/user-form'
import AddressForm from './address-form/address-form'
import {connect} from 'react-redux'
import { updateUserAsync } from '../../store/actions/user';


class User extends React.Component{

       state={
           selectedAddress:{},
           addAddress:true,
           showAddressFormModal:false,
           showUserFormModal:false
       }

       setSelectedAddress= (address) =>{
           this.setState({selectedAddress:{...address}})
       }

       handleDelete = (address)=>{
                const {loading,userServerResponse,...user}= this.props.user
                const addresses = user.addresses.filter(a => a.name !== address.name)
                user.addresses = [...addresses]
                this.props.updateUser(user)
       }

        contents = function(){
           return(
            <React.Fragment>
            <TransitionsModal  open={this.state.showUserFormModal}  onClose={ ()=>{this.setState({showUserFormModal:false})} } >
            <UserForm formHeading='Update User' closeModal={()=>this.setState({showUserFormModal:false})}  user={this.props.user}/>
           </TransitionsModal>

           <TransitionsModal open={this.state.showAddressFormModal} onClose={ ()=>{this.setState({showAddressFormModal:false})} }>
           <AddressForm  addAddress={this.state.addAddress} formHeading='Update/Add Address' closeModal={()=>this.setState({showAddressFormModal:false})} address={this.state.selectedAddress} />
           </TransitionsModal>
       <div style={{display:'flex', border:'1px solid lightgray', width:'max-content'}}>
       <PersonIcon style={{height:'200px',width:'200px',background:'#ffe0b3',borderRadius:'10px',border:'1px solid lightgray',margin:'10px',color:'#006699'}} />
       <div style={{margin:'5px',padding:'0 7px',borderRadius:'5px',height:'max-content',width:'250px'}}>
       <EditIcon onClick={()=>{this.setState({showUserFormModal:true})}}  className='edit-icon' style={{float:'right'}}fontSize='small'/>
       <h4>{this.props.user.firstName}&nbsp;&nbsp;{this.props.user.lastName}</h4>
       <p>Email: {this.props.user.email}</p>
       <p>Phone: {this.props.user.phone}</p>
       </div>
       </div>
       <br/>
       <p>Addresses:</p>
       <br/>
       <div style={{display:'flex',overflowX:'overlay'}}>
           {
               this.props.user.addresses && this.props.user.addresses.map(address => <AddressCard  key={address.name} address={address} onEditClick={()=>{this.setState({showAddressFormModal:true,addAddress:false})}} setSelectedAddress={this.setSelectedAddress} handleDelete={this.handleDelete} closeModal={()=>this.setState({showAddressFormModal:false})}/>)
           }
          <AddressCard clickHandler={()=>{this.setState({selectedAddress:{},showAddressFormModal:true,addAddress:true})}} closeModal={()=>this.setState({showAddressFormModal:false})} />
       </div>
       </React.Fragment>
           )
       }


    render(){
        return(
            <div className='User'>
            {this.props.isAuthenticated ? this.props.user.loading ? <Spinner/> : this.contents() : <p>You are not Signed In . Please SignIn (demo creds email:test@test.com , password:test123)</p>}
            </div>
        )
    }
}

const mapStatetoProps = function(state){

    return{
        isAuthenticated:state.auth.isAuthenticated,
        user:state.user
    }
}

const mapDispatchToProps = function(dispatch){

    return{
        updateUser:(user)=> dispatch(updateUserAsync(user))
    }
}



export default connect(mapStatetoProps,mapDispatchToProps)(User)



const AddressCard = function(props){
     
      const handleEditClick= function(){
          props.onEditClick()
          props.setSelectedAddress(props.address)
      }

      const handleDeleteClick = function(){
          props.handleDelete(props.address)  
      }

    if(props.address){
    return(
        <div className='address-card'>
        <span style={{float:'right'}}>
        <EditIcon onClick={handleEditClick} className='edit-icon' style={{margin:'5px'}}  fontSize='small'/>
        <DeleteIcon onClick={handleDeleteClick} className='delete-icon'  style={{margin:'5px'}} fontSize='small' />
        </span>
        <br/>
        {props.address && <ul style={{listStyle:'none'}}><li><b>{props.address.name}</b></li>
                              <div className='line'></div>
                              <li>{props.address.line1}</li>
                              <div className='line'></div>
                              <li>{props.address.line2}</li>
                              <div className='line'></div>
                              <li>{props.address.line3}</li>
                              <div className='line'></div>
                              <li>ZipCode: {props.address.zipCode}</li>
                              <div className='line'></div>
                              </ul> 
        }
        </div>
    )
    }
    return(
        <div className='blank-address-card' onClick={props.clickHandler}>
             <AddIcon className='add-icon' style={{position:'relative',top:'40%',left:'40%',margin:'0'}} fontSize='large' />
        </div>
    )
}


