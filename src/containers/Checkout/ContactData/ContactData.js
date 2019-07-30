import React, {Component} from 'react';
import classes from './ContactData.css';
import Button from './../../../components/UI/Button/Button';
import axios from './../../../axios-orders';
import Spinner from './../../../components/UI/Spinner/Spinner';
import Input from './../../../components/UI/Input/Input';
import {connect} from 'react-redux';

class ContactData extends Component {
    constructor(props){
        super(props)
        this.state = {
            orderFrom : {
            name: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder: "Your Name"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type:'email',
                    placeholder: "Your email"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street:{
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder: "Street Name"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder: "Postal Code"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder: "Country"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMothod: {
                elementType: 'select',
                elementConfig: {
                    options: 
                    [
                        {value:'fastest', displayValue: 'Fastest'},
                        {value:'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
                validation: {},
                valid: false,
                touched: false
            }
            },
        loading: false

        }
    }


    orderHandler = (event)=>{
        event.preventDefault();
        const fromData = {};
        for(let fromElementIdentifier in this.state.orderFrom){
            fromData[fromElementIdentifier] = this.state.orderFrom[fromElementIdentifier].value
        }
        
        this.setState({
            loading: true
        });

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: fromData
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            })
            .catch((error) => {
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            }) 
    }

    checkValidity(value, rules){
        let isValid = true;
        if(!rules){
            return isValid;
        }
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    inputChangedHandler =(event, inputIndentifier)=>{
        const updatedOrderFrom = {
            ...this.state.orderFrom
        }
        const updateFormElement = {...updatedOrderFrom[inputIndentifier]};
        updateFormElement.value = event.target.value;
        updateFormElement.touched = true;
        updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation)
        updatedOrderFrom[inputIndentifier]  = updateFormElement;
        this.setState({
            orderFrom: updatedOrderFrom
        })
    }

    render(){
        const fromElementArray = [];
        for(let key in this.state.orderFrom){
            fromElementArray.push({
                id: key,
                config:this.state.orderFrom[key]
            })
        }
        let from = (
            <from onSubmit={this.orderHandler}>
                 {fromElementArray.map(fromElement=>{
                    return <Input 
                    elementType={fromElement.config.elementType}
                    elementConfig = {fromElement.config.elementConfig}
                    value = {fromElement.config.value}
                    key = {fromElement.id}
                    valid= {!fromElement.config.invalid}
                    shouldValidate ={fromElement.config.validation}
                    changed={(event)=>this.inputChangedHandler(event, fromElement.id)}
                    touched= {!fromElement.config.touched}
                    />
                })}
                 <Button btnType='Success'clicked = {this.orderHandler}>ORDER</Button>
            </from>
        )
        
  

        if(this.state.loading){
            from =<Spinner/>
        }
       return(
           <div className={classes.ContactData}>
               <h1>Enter Contact Data</h1>
               {from}
           </div>
       )
    }

}
const mapStateToProps = (state)=>{
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}
export default connect(mapStateToProps)(ContactData);