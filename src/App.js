import React from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';
import Orders  from './containers/Orders/Orders';

// https://react-my-burger-prac.firebaseio.com/ db url

function App() {
  return (
    <Layout>
      <Switch>
      <Route path="/check-out" component={Checkout}/>
      <Route path="/orders" component={Orders}/>
      <Route path="/" exact component={BurgerBuilder}/>
      </Switch>

    </Layout>
  );
}

export default App;
