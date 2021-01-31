import React,{Component} from 'react'
import Component2 from  './Component2'
import {connect} from 'react-redux'
import {loadCartAsync} from '../store/actions/cart'

class Component1 extends Component{

    constructor(props){
        console.log('Component1 Constructor called')
        super(props)

        this.state={
            text:'Hello World',
            number:10,
            showComponent2:true
        }
    }

    componentDidMount(){
        this.setState({text:'Hello World'})
       console.log('[Component 1] Component Did Mount called')
    }
    
    componentWillUnmount(){
        console.log('[Component1] Component Will Unmount called')
    }

     render(){
           console.log('Component1: Render called')
         return(
             <div>
                 {this.props.data1}
                 <br/>
                 {this.props.data2}
                 <br/>
                 {this.props.data3}
                 <br/>
                 <br/>
                 <button onClick={() => this.props.load()}>Load</button>
                 <br/>
                 {this.props.total}
             </div>
         )
     }
}

const mapStateToProps = function(state){
return {
    data1: state.test.data1,
    data2: state.test.data2,
    data3: state.test.data3,
    total:state.cart.cartTotal,
    burgers:state.cart.burgers

}
}

const mapDispatchToProps = function(dispatch){

    return {
          setData1 :(data1)=>{dispatch({type:'SET_DATA1',value:data1})},
          setData2 :(data2)=>{dispatch({type:'SET_DATA2',value:data2})},
          setData3 :(data3)=>{dispatch({type:'SET_DATA3',value:data3})},
          load: ()=>{dispatch(loadCartAsync())}

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Component1)