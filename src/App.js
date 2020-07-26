import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header/Header';
import Landing from './Landing/Landing';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import HowlsList from './HowlsList/HowlsList';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <Route
          exact path='/'
          component={Landing}
        />
        <Route 
          path='/register'
          component={RegistrationForm}
        />
        <Route 
          path='/howls'
          component={HowlsList}
        />
      </main>
    </div>
  );
}

export default App;
