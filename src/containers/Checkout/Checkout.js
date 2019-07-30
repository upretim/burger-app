import React, {Component} from 'react';
import classes from './Checkout.css';
import CheckoutSummary  from './../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './../../containers/Checkout/ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component {
    constructor(props){
     super(props);
    }

   /* componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price;
        for (let params of query.entries()){
            if(params[0]==='price'){
             price = Number.parseFloat(params[1])
            }
            else{
                ingredients[params[0]] =  +params[1]              
            }         
        }
        this.setState({
            ingredients : ingredients,
            totalPrice : price
        })
    }*/

    checkoutCanacelledHandler = ()=>{
         this.props.history.goBack()
    }

    checkoutContintedHandler = ()=>{
        this.props.history.replace('/check-out/contact-data')
    }
  render(){
      return(
          <div>
           <CheckoutSummary ingredients={this.props.ings}
           onCheckoutCancelled={this.checkoutCanacelledHandler}
           onCheckoutContinuted={this.checkoutContintedHandler}/>
           <Route 
            path ={this.props.match.path + "/contact-data"} 
            component= {ContactData}/>
          </div>          
      )
  }
}

const mapstateToProps =(state)=>{
    return {
        ings: state.ingredients
    }
}

const mapDispatchToProps = ()=>{
// no need to implement it here...
}
export default connect(mapstateToProps)(Checkout);