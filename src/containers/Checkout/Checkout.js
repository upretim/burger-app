import React, {Component} from 'react';
import classes from './Checkout.css';
import CheckoutSummary  from './../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './../../containers/Checkout/ContactData/ContactData';

class Checkout extends Component {
    constructor(props){
     super(props);
     this.state = {
         ingredients: null,
         totalPrice: 0
     }
    }

    componentWillMount(){
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
    }

    checkoutCanacelledHandler = ()=>{
         this.props.history.goBack()
    }

    checkoutContintedHandler = ()=>{
        this.props.history.replace('/check-out/contact-data')
    }
  render(){
      return(
          <div>
           <CheckoutSummary ingredients={this.state.ingredients}
           onCheckoutCancelled={this.checkoutCanacelledHandler}
           onCheckoutContinuted={this.checkoutContintedHandler}/>
           <Route 
            path ={this.props.match.path + "/contact-data"} 
            render={(props)=><ContactData 
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice} {...props}
              />}/>
          </div>
          
      )
  }
}
export default Checkout;