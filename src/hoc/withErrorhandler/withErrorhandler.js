import React, {Component} from 'react';
import Model from './../../components/UI/Modal/Modal';
import Hoc from './../../hoc/AuxComponent/AuxComponent';

const withErrorhandler = (WrapperComponent ,axios)=>{
  return class extends Component {

    constructor(){
        super();
        this.state = {
            error: null
        }
    }
componentWillMount(){
   this.reqInterceptor = axios.interceptors.request.use(req=>{
        this.setState({
            error: null
          });
          return req;
    })
    this.respInterceptor = axios.interceptors.response.use(resp=>resp, error=>{
      this.setState({
        error: error
      })
    })
}

componentWillUnmount(){
  axios.interceptors.request.eject(this.reqInterceptor);
  axios.interceptors.response.eject(this.respInterceptor);
}

errorConfirmedHandler(){
    this.setState({
        error: null
      })
}

    render(){
        return (
            <Hoc>
            <Model show={this.state.error}
            modalClosed ={this.errorConfirmedHandler}
            >{this.state.error? this.state.error.message: null}</Model>
           <WrapperComponent {...this.props} />
            </Hoc> 
          )
    }    
  }
}

export default withErrorhandler;