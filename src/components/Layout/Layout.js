import React from 'react';
import Aux from './../../hoc/Aux';
import classes from './Layout.css';

const layout = (props)=>{
    return(
        <Aux>
        <div> tool bar, side Drawer, Backdrop...</div>
        <main className={classes.Content}>{props.children}</main>
        </Aux>   
    )

}

export default layout;