import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header/Header';
import Landing from './Landing/Landing';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import HowlsList from './HowlsList/HowlsList';
import Homepage from './Homepage/Homepage';
import CreateHowl from './CreateHowl/CreateHowl';
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
        <Route 
          path='/home'
          component={Homepage}
        />
        <Route 
          path='/create-howl'
          component={CreateHowl}
        />
      </main>
    </div>
  );
}

export default App;
