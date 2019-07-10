import React from 'react';
import NaviagationItems from './../NavigationItems/NavigationItems';
import Logo from './../../Logo/Logo';
import classes from './SideDrawer.css';
import Backdrop from './../../UI/Backdrop/Backdrop';
import Aux from './../../../hoc/AuxComponent/AuxComponent';

const sideDrawer = (props)=>{
   let attachedClasses =[classes.SideDrawer, classes.Close];
   if (props.open){
    attachedClasses =[classes.SideDrawer, classes.Open];
   }
   else{
    attachedClasses =[classes.SideDrawer, classes.Close];
   }
  return(
      <Aux>
          <Backdrop show = {props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
            <Logo/>
        </div>
         
          <nav>
           <NaviagationItems/>
          </nav>
      </div>

      </Aux>
      
  )
}

export default sideDrawer;