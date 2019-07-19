import React, {Component} from 'react';
import classes from './ContactData.css';
import Button from './../../../components/UI/Button/Button';
import axios from './../../../axios-orders';
import Spinner from './../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: "",
            email: "",
            address: {
                street: "",
                postalCode: ""
            },
        loading: false
        }
    }

    orderHandler = (event)=>{
        event.preventDefault();
        
         this.setState({
            loading: true
        })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
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
                    loading: false
                });
                this.props.history.push('/');
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            }) 
    }

    render(){
        let from =(<form>
            <input  className={classes.Input}  type="text" name= "name" placeholder="Your Name"/>
            <input className={classes.Input}  type="email" name= "email" placeholder="Email"/>
            <input className={classes.Input}  type="text" name= "street" placeholder="Street"/>
            <input className={classes.Input}  type="text" name= "postalCode" placeholder="Postal Code"/>                  
        </form>);

        if(this.state.loading){
            from =<Spinner/>
        }
       return(
           <div className={classes.ContactData}>
               <h1>Enter Contact Data</h1>
                {from}
               <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
           </div>
       )
    }

}

export default ContactData;