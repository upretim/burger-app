import React from 'react';
import classes from './Order.css';
const order= (props)=>{
    const ingredients = [];

    for (let ingredientName in props.ingredients){
        ingredients.push({name:ingredientName,
        amount:props.ingredients[ingredientName]})
    }

    const ingredientsOutput = ingredients.map(key=>{
        return <span key ={ key.name
        } style={{
            textTransform: "capitalize",
            display: 'inline-block',
            margin:'0px 8px',
            border: '1px solid #ccc',
            padding: "5px"
        }}>{key.name} {(key.amount)} </span>
    })
    return(
        <div className={classes.Order}>
            <p>{ingredientsOutput}</p>
            <p>Price: <strong>{props.price}</strong></p>
        </div>
    )
}
export default order;