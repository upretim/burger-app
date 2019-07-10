import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NaviagationItems from './../NavigationItems/NavigationItems';
import DrawerToggle from './../SideDrawer/DrawerToggle/DrawerToggle';

 const toolbar = (props)=>{
  return (
      <header className={classes.Toolbar}>
          <DrawerToggle clicked = {props.drawertoggleClicked}/>
          <div className={classes.Logo}>
             <Logo/>
          </div>
        
          <nav className={classes.DesktopOnly}>
              <NaviagationItems/>
          </nav>
      </header>
  )
 }
 export default toolbar;