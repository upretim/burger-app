import React from 'react';
import BurgerIngredent from './BurgerIngredent/BurgerIngredent';
import classes from './Burger.css';

const burger = (props)=>{

   let TransformedIngredents = Object.keys(props.ingredients)
   .map(igKey=>{
      return [...Array(props.ingredients[igKey])].map(( _ , index)=>{
          return <BurgerIngredent key = {igKey + index} type= {igKey}/>
      })
   }).reduce((arr, currentValue)=>{
      return arr.concat(currentValue)
   }, []);

    if (TransformedIngredents.length ===0){
      TransformedIngredents= <p>Please start adding ingredents</p>
    }
   return(
      <div className= {classes.Burger}>
      <BurgerIngredent type="bread-top"/>
       {TransformedIngredents}
      <BurgerIngredent type="bread-bottom"/>
    </div>
   )
}
export default burger;