import React from 'react';
import Aux from './../../../hoc/AuxComponent/AuxComponent';
import Button from './../../UI/Button/Button';

const orderSummary =(props)=>{
    const ingerdientSummary = Object.keys(props.ingredients)
    .map(igKey=>{
        return (<li key={igKey}>
                 <span style={{textTransform:'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}
               </li>)
    })
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delecious burger with following ingredients:</p>
            <ul>
                {ingerdientSummary}
            </ul>
            <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button  btnType="Success" clicked={props.purchaseContinuted}>CONTINUE</Button>
        </Aux>
    )

}

export default orderSummary;