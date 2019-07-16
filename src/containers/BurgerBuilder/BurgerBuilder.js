import React, { Component } from 'react';
import Aux from '../../hoc/AuxComponent/AuxComponent';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import axios from './../../axios-orders';
import Spinner from './../../components/UI/Spinner/Spinner';
import WithErrorHandler from './../../hoc/withErrorhandler/withErrorhandler';

const INGREDENT_PRICES = {
    salad: 0.4,
    bacon: 0.6,
    cheese: 0.9,
    meat: 1.2
}
// https://react-my-burger-prac.firebaseio.com/ingredients
class BugerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: null,
            totalPrice: 10,
            purchable: false,
            pruchasing: false,
            loading: false,
            error: false
        }
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then((response => {
                console.log(response.data);
                this.setState({
                    ingredients: response.data
                })
            }))
            .catch(error=>{
                console.log(error.message)
                this.setState({
                    error: error
                })
            })
    }

    updatePurchaseState(updatedIngerdents) {
        const sum = Object.keys(updatedIngerdents)
            .map((igKey) => {
                return updatedIngerdents[igKey]
            }).reduce((sum, element) => {
                return sum + element
            }, 0);

        this.setState({
            purchable: sum > 0
        })
    }
    addIngredentHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngerdents = {
            ...this.state.ingredients
        }
        updatedIngerdents[type] = updatedCount;
        const priceAddition = INGREDENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = (priceAddition + oldPrice)
        this.setState({
            ingredients: updatedIngerdents,
            totalPrice: updatedPrice
        })
        this.updatePurchaseState(updatedIngerdents);
    }

    removeIngredentHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount == 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngerdents = {
            ...this.state.ingredients
        }
        updatedIngerdents[type] = updatedCount;
        const priceSubstraction = INGREDENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = (oldPrice - priceSubstraction);
        this.setState({
            ingredients: updatedIngerdents,
            totalPrice: updatedPrice
        })
        this.updatePurchaseState(updatedIngerdents);
    }

    purchaseHandler = () => {
        this.setState({
            pruchasing: true
        })
    }
    cancelPurchaseHandler = () => {
        this.setState({
            pruchasing: false
        })
    }
    purchaseContinueHandler = () => {
        this.setState({
            loading: true
        })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Manoj",
                address: {
                    street: "Noida 126",
                    zipCode: '110059',
                    country: "India"
                },
                email: "test@test.com",
                deliveryMothod: "fastest"
            }
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({
                    loading: false,
                    pruchasing: false
                })
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    loading: false,
                    pruchasing: false
                })
            })
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
       

        let burger = <Spinner />
        if (this.state.ingredients) {
            burger = <Aux>  
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    price={this.state.totalPrice}
                    ingredentAdded={this.addIngredentHandler}
                    ingredentRemoved={this.removeIngredentHandler}
                    disabled={disabledInfo}
                    purchable={this.state.purchable}
                    ordered={this.purchaseHandler} />
            </Aux>
            orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.cancelPurchaseHandler}
            purchaseContinuted={this.purchaseContinueHandler}
            totalPrice={this.state.totalPrice}
        />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }



        return (
            <Aux>
                <Modal show={this.state.pruchasing} modalClosed={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default WithErrorHandler(BugerBuilder, axios);