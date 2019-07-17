import React from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';

// https://react-my-burger-prac.firebaseio.com/ db url

function App() {
  return (
    <Layout>
      <Switch>
      <Route path="/check-out" component={Checkout}/>
      <Route path="/" exact component={BurgerBuilder}/>
      </Switch>

    </Layout>
  );
}

export default App;
