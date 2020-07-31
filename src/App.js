import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header/Header';
import Landing from './Landing/Landing';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import LoginPage from './LoginPage/LoginPage';
import HowlsList from './HowlsList/HowlsList';
import Homepage from './Homepage/Homepage';
import CreateHowl from './CreateHowl/CreateHowl';
import DogProfilePage from './DogProfilePage/DogProfilePage';
import DogReviewPage from './DogReviewPage/DogReviewPage';
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
          path='/login'
          component={LoginPage}
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
        <Route
          path='/dog-profile/:id'
          component={DogProfilePage} 
        />
        <Route 
          path='/leave-review/:dog_id'
          component={DogReviewPage}
        />
      </main>
    </div>
  );
}

export default App;
