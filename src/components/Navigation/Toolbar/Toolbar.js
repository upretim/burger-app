import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NaviagationItems from './../NavigationItems/NavigationItems';

 const toolbar = (props)=>{
  return (
      <header className={classes.Toolbar}>
          <div>MENU</div>
         <Logo/>
          <nav>
              <NaviagationItems/>
          </nav>
      </header>
  )
 }
 export default toolbar;