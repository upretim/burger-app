import React, {Component} from 'react';
import Aux from './../AuxComponent/AuxComponent';
import classes from './Layout.css';
import Toolbar from './../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from './../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    constructor(props){
        super(props);
        this.state = {
            showSideDrawer: false
        }
    }

    sideDrawerClosedHandler = ()=> {
        this.setState({
            showSideDrawer: false
        })
    }

    sideDrawerToggleHandler = ()=>{
        this.setState((prevState)=>({
             showSideDrawer: !prevState.showSideDrawer
        }))
     }
    render(){
        return(
            <Aux>
            <Toolbar drawertoggleClicked ={this.sideDrawerToggleHandler}/>
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
            <main className={classes.Content}>{this.props.children}</main>
            </Aux>   
        )
    }
}

export default Layout;