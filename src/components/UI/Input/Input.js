import React from 'react';
import classes from './Input.css';

const input = (props)=>{
     let inputElement = null;
     const inputClasses = [classes.InputElement];
     if (props.valid && props.shouldValidate && props.touched){
        inputClasses.push(classes.invalid);
     }
    switch(props.elementType){
        case('input'):
            inputElement = <input  className={inputClasses.join(' ')} 
            {...props.elementConfig}
             value={props.value}
             onChange={props.changed}/>
            break;
        case('email'):
            inputElement = <textarea className={inputClasses.join(' ')} 
             {...props.elementConfig} 
             value={props.value}
             onChange={props.changed}/>
            break;
        case('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')} 
            {...props.elementConfig}
             value={props.value}
             onChange={props.changed}/>
            break; 
        case('select'):
            inputElement = <select className={inputClasses.join(' ')} 
             value={props.value}
             onChange={props.changed}> 
              {props.elementConfig.options.map(option=>{
                  return(
                      <option key ={option.value}>{option.displayValue}</option>
                  )
              })}
             </select>
            break;       
            default:
            inputElement = <input className={inputClasses.join(' ')} 
             {...props.elementConfig} 
             value={props.value}
             onChange={props.changed}/>
            break;  
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;