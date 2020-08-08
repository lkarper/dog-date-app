import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header/Header';
import Landing from './Landing/Landing';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import LoginPage from './LoginPage/LoginPage';
import HowlsList from './HowlsList/HowlsList';
import Homepage from './Homepage/Homepage';
import CreateHowlPage from './CreateHowlPage/CreateHowlPage';
import DogProfilePage from './DogProfilePage/DogProfilePage';
import CreateDogReviewPage from './CreateDogReviewPage/CreateDogReviewPage';
import CreateDogProfile from './CreateDogProfile/CreateDogProfile';
import HowlPageView from './HowlPageView/HowlPageView';
import ReviewPage from './ReviewPage/ReviewPage';
import './App.css';
import PageNotFound from './PageNotFound/PageNotFound';


const App = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <Switch>
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
            component={CreateHowlPage}
          />
          <Route
            path='/dog-profile/:id'
            component={DogProfilePage} 
          />
          <Route 
            path='/reviews/:id'
            component={ReviewPage}
          />
          <Route 
            path='/leave-review/:dog_id'
            component={CreateDogReviewPage}
          />
          <Route 
            path='/create-dog-profile'
            component={CreateDogProfile}
          />
          <Route 
            component={PageNotFound}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
