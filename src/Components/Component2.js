import React,{Component} from 'react'


class Component2 extends Component{

    constructor(props){
        console.log('Component2 Constructor called')
        super(props)
    }

    componentDidMount(){
        console.log('Component2 : Component Did Mount Called')
    }

    componentDidUpdate(){
        console.log('Component2 : Component Did Update called')
    }

    shouldComponentUpdate(nextProps,nextState){
            if(this.props.text!= nextProps.text){
                return true
            }
            return false
    }
    

    componentWillUnmount(){
        console.log('[Component2] Component Will Unmount called')
    }

     render(){
        console.log('Component2 : Render Called')
         return(
             <React.Fragment>
            <p>{this.props.state.text}</p>
            <p>{this.props.state.number}</p>
             </React.Fragment>
         )
     }
}

export default Component2