import React from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

// https://react-my-burger-prac.firebaseio.com/ db url

function App() {
  return (
    <Layout>
      <BurgerBuilder/>
    </Layout>
  );
}

export default App;
