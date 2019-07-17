import React, {Component} from 'react';
import classes from './Checkout.css';
import CheckoutSummary  from './../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    constructor(props){
     super(props);
     this.state= {
         ingredients: {
             salad:1,
             bacon:1,
             meat:1,
             cheese: 1
         }
     }
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {}
        for (let params of query.entries()){
            ingredients[params[0]] =  +params[1]
        }
        this.setState({
            ingredients : ingredients
        })
    }

    checkoutCanacelledHandler = ()=>{
         this.props.history.goBack()
    }

    checkoutContintedHandler = ()=>{
        this.props.history.replace('/checkout/contact-data')
    }
  render(){
      return(
          <div>
           <CheckoutSummary ingredients={this.state.ingredients}
           onCheckoutCancelled={this.checkoutCanacelledHandler}
           onCheckoutContinuted={this.checkoutContintedHandler}/>
          </div>
          
      )
  }
}
export default Checkout;