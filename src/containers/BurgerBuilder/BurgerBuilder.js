import React, { Component } from 'react';
import Aux from '../../hoc/AuxComponent/AuxComponent';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import axios from './../../axios-orders';
import Spinner from './../../components/UI/Spinner/Spinner';
import WithErrorHandler from './../../hoc/withErrorhandler/withErrorhandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';
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
            ...this.props.ingredients
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
            let queryParams=[];
            for (let i in this.state.ingredients){
                queryParams.push(encodeURIComponent(i)+ "="+ encodeURIComponent(this.state.ingredients[i]))
            }
            queryParams.push('price='+this.state.totalPrice)
            const queryString = queryParams.join('&')
            this.props.history.push({
                pathname: '/check-out',
                search: '?'+ queryString
            });
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
       

        let burger = <Spinner />
        if (this.props.ings) {
            burger = <Aux>  
                <Burger ingredients={this.props.ings} />
                <BuildControls
                    price={this.state.totalPrice}
                    ingredentAdded={this.props.onIngredientAdded}
                    ingredentRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchable={this.state.purchable}
                    ordered={this.purchaseHandler} />
            </Aux>
            orderSummary = <OrderSummary
            ingredients={this.props.ings}
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

const mapStateToProps = (state)=>{
    return{
        ings: state.ingredients
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        onIngredientAdded: (ingName)=> dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName)=> dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName:ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (WithErrorHandler(BugerBuilder, axios));