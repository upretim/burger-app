import React, {Component} from 'react';
import Order from './../../components/Order/Order';
import axios from './../../axios-orders';
import withErrorhandler from './../../hoc/withErrorhandler/withErrorhandler';

class Orders extends Component {

    constructor(props){
        super(props);
        this.state = {
            orders : [],
            loading: true
        }
    }

    componentDidMount(){
        axios.get('/orders.json')
        .then(response=>{
            const fetchedData = [];
            for(let key in response.data){
                fetchedData.push({...response.data[key],
                id:key}) 
            }
            console.log(response.data);
            this.setState({
                orders : fetchedData,
                loading: false
            })
        })
        .catch(error=>{
            this.setState({
                loading: false
            })
        })
    }
    render(){
        return(
            <div>
               {this.state.orders.map(order=>{
                   return <Order key = {order.id}
                   ingredients= {order.ingredients}
                   price = {Number.parseFloat(order.price).toFixed(2)} 
                   />
               })} 
            </div>
        )
    }

}

export default withErrorhandler(Orders,axios);