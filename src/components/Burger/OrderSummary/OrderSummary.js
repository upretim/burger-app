import React from 'react';
import Aux from './../../../hoc/AuxComponent'

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
            <p>COntinue to checkout?</p>
        </Aux>
    )

}

export default orderSummary;