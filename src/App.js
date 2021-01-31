import React  from 'react'
import './App.css';
import ComponentWrapper from './Components/UI/container-wrapper'
import BurgerBuilderAppBar from './Components/app-bar'
import BurgerBuilder from './Components/BurgerBuilder/BurgerBuilder'
import Cart from './Components/cart/Cart'
import RightMenu from './Components/RightMenu/RightMenu'
import Orders from './Components/orders/orders'
import User from './Components/User/User'
import SignIn from './Components/User/login-signup-form/signin'
import SignUp from './Components/User/login-signup-form/signup'
import {connect} from 'react-redux'
import {signOut} from './store/actions/auth'
import TransitionModal from './Components/UI/modal/modal'
import About from './Components/About/About'
import {BrowserRouter as Router
  ,Route
  ,Switch} from 'react-router-dom' 



function App(props) {

    const [modalOpen,setIsModalOpen] = React.useState(false)
    const [modal2Open,setIsModal2Open] = React.useState(false)
    const [isSignUp,setIsSignUp] = React.useState(false)

    const handleClick= function(val){
          setIsSignUp(val)
    }

  return (
    <div className="App">
      <Router>
      <BurgerBuilderAppBar />
      <div className='div2'>
      <ComponentWrapper style={{'box-shadow':'10px 10px 5px #aaaaaa','margin-right':'30px',background:'#ffebcc',width:'60%'}}>
      <Switch>
      <Route path='/'exact>
         <BurgerBuilder/>
         </Route>
        <Route path='/BurgerBuilder'>
         <BurgerBuilder/>
         </Route>
        <Route path='/User'>
         <User/>
        </Route>
        <Route path='/Cart'>
         <Cart />
        </Route>
        <Route path='/Orders'>
         <Orders/>
        </Route>
        <Route path='/About'>
         <About/>
        </Route>
        </Switch>
    </ComponentWrapper>
    <RightMenu openModal={(val)=>{setIsModalOpen(val)}} openModal2={(val)=>{setIsModal2Open(val)}} isAuthenticated={props.isAuthenticated} signOut={props.signOut}/>
    </div>
    <TransitionModal open={modalOpen} onClose={() => {setIsModalOpen(false)}}>
        <div style={{background:'white', borderRadius:'3px'}}>
        {isSignUp ? <SignUp onClose={() => {setIsModalOpen(false)}} setIsSignUp={handleClick}/> : <SignIn onClose={() => {setIsModalOpen(false)}} setIsSignUp={handleClick}/>}
        </div>
     </TransitionModal>
     <TransitionModal open={modal2Open} onClose={() => {setIsModal2Open(false)}} >
        <div style={{background:'white', borderRadius:'3px'}}>
          You have been Signed Out!!!
        </div>
     </TransitionModal>
    </Router>
    </div>
  );
}


const mapStatetoProps = function(state){
  return{
  isAuthenticated:state.auth.isAuthenticated
  }
}

const mapDispatchToProps = function(dispatch){
  return{
    signOut:()=> {dispatch(signOut())}
  }
}

export default connect(mapStatetoProps,mapDispatchToProps)(App);
