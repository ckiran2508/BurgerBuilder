
import React from 'react'
import axiosInstance from '../../axios-orders'
import TransitionModal from '../UI/modal/modal'


const withErrorHandler= function(WrappedComponent,axios){


    return class extends React.Component{

        state={
            error:null
        }

        componentDidMount(){
            axiosInstance.interceptors.request.use(req => {this.setState({error:null})})
            axiosInstance.interceptors.response.use(null,error =>{
                this.setState({error:error})
            })
        }

        render(){


            return(
                <React.Fragment>
                    <TransitionModal open={this.state.error!==null?true:false}>
                    {this.state.error ? this.state.error.message : null}
                    </TransitionModal>
                    <WrappedComponent {...this.props}/>
                </React.Fragment>
            )
          }
    }

} 

export default withErrorHandler