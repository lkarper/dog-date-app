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
import CreateDogProfile from './CreateDogProfile/CreateDogProfile';
import HowlPageView from './HowlPageView/HowlPageView';

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
          exact path='/howls'
          component={HowlsList}
        />
        <Route 
          path='/howls/:howl_id'
          component={HowlPageView}
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
        <Route 
          path='/create-dog-profile'
          component={CreateDogProfile}
        />
      </main>
    </div>
  );
}

export default App;
