import ContainerWrapper from '../UI/container-wrapper'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'
import './right-menu.css'

const RightMenu= function(props){

   const onClickHandler= function(){
    props.signOut()
    props.openModal2(true)
    }
    return(
        <ContainerWrapper style={{'box-shadow':'10px 10px 5px #aaaaaa',display:'flex',flexDirection:'column',margin:'40px 30px 0 20px',background:'#ffebcc',width:'15%',height:'max-content'}}>
        <Link to='/Cart' className='link2' >Cart</Link>
        <Link to='/Orders' className='link2' >Orders</Link>
        {props.isAuthenticated ? <div className='btn2'  onClick={onClickHandler}>Sign Out</div> : <div  className='btn2' onClick={()=> {props.openModal(true)}}>Sign In</div>}
        </ContainerWrapper>
    )
}

export default RightMenu