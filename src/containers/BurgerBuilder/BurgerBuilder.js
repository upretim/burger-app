import React, {Component} from 'react';
import Aux from '../../hoc/AuxComponent';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';

const INGREDENT_PRICES = {
    salad: 0.4,
    bacon:0.6,
    cheese:0.9,
    meat:1.2
}

class BugerBuilder extends Component {
    constructor(props){
        super(props);
        this.state = {
            ingredients : {
                salad:0,
                bacon:0,
                cheese:0,
                meat:0
            },
            totalPrice: 10,
            purchable: false,
            pruchasing: false
        }
    }

updatePurchaseState(updatedIngerdents){
    const sum = Object.keys(updatedIngerdents)
    .map((igKey)=>{
        return updatedIngerdents[igKey]
    }).reduce((sum, element)=>{
      return sum + element
    },0);

    this.setState({
        purchable: sum>0
    })
}
addIngredentHandler = (type)=>{
    const oldCount =  this.state.ingredients[type];
    const updatedCount =  oldCount + 1;
    const updatedIngerdents = {
        ...this.state.ingredients
    }
    updatedIngerdents[type]=updatedCount;
    const priceAddition = INGREDENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = (priceAddition + oldPrice)
    this.setState({
        ingredients: updatedIngerdents,
        totalPrice: updatedPrice
    })
    this.updatePurchaseState(updatedIngerdents);
}

removeIngredentHandler = (type)=>{
    const oldCount =  this.state.ingredients[type];
    if(oldCount==0){
        return;
    }
    const updatedCount =  oldCount - 1;
    const updatedIngerdents = {
        ...this.state.ingredients
    }
    updatedIngerdents[type]=updatedCount;
    const priceSubstraction = INGREDENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = (oldPrice - priceSubstraction);
    this.setState({
        ingredients: updatedIngerdents,
        totalPrice: updatedPrice
    })
    this.updatePurchaseState(updatedIngerdents);
}

   purchaseHandler=()=>{
    this.setState({
        pruchasing: true
    })
}
cancelPurchaseHandler=()=>{
    this.setState({
        pruchasing: false
    })
}
purchaseContinueHandler = ()=>{
    console.log('You continue');
}

    render(){
     const disabledInfo = {
         ...this.state.ingredients
     }
     for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0;       
     }

        return(
             <Aux>
                <Modal show={this.state.pruchasing} modalClosed={this.cancelPurchaseHandler}>
                  <OrderSummary 
                   ingredients = {this.state.ingredients}
                   purchaseCancelled = {this.cancelPurchaseHandler}
                   purchaseContinuted = {this.purchaseContinueHandler}
                   totalPrice = {this.state.totalPrice}
                  />
                </Modal>
                 <Burger ingredients = {this.state.ingredients}/>
                  <BuildControls 
                    price = {this.state.totalPrice}
                    ingredentAdded={this.addIngredentHandler} 
                    ingredentRemoved= {this.removeIngredentHandler}
                    disabled = {disabledInfo}
                    purchable = {this.state.purchable}
                    ordered = {this.purchaseHandler} />
             </Aux>
        )
    }
}

export default BugerBuilder;