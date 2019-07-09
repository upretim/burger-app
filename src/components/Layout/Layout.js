import React from 'react';
import Aux from '../../hoc/AuxComponent';
import classes from './Layout.css';
import Toolbar from './../Navigation/Toolbar/Toolbar';

const layout = (props)=>{
    return(
        <Aux>
        <div> tool bar, side Drawer, Backdrop...</div>
        <Toolbar/>
        <main className={classes.Content}>{props.children}</main>
        </Aux>   
    )

}

export default layout;