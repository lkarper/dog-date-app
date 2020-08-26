import React, { useState, useEffect, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import PublicOnlyRoute from './utils/PublicOnlyRoute';
import PrivateOnlyRoute from './utils/PrivateOnlyRoute';
import UserContext from './contexts/UserContext';
import IdleService from './services/idle-service';
import TokenService from './services/token-service';
import AuthApiService from './services/auth-api-service';
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
import PageNotFound from './PageNotFound/PageNotFound';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import './App.css';

const useForceUpdate = () => {
  const [value, setValue] = useState(0); 
  return () => setValue(value + 1); 
}

const App = (props) => {

  const context = useContext(UserContext);

  const forceUpdate = useForceUpdate();

  const logoutFromIdle = () => {
      /* remove the token from localStorage */
      TokenService.clearAuthToken();
      /* remove any queued calls to the refresh endpoint */
      TokenService.clearCallbackBeforeExpiry();
      /* remove the timeouts that auto logout when idle */
      IdleService.unRegisterIdleResets();
      /*
      react won't know the token has been removed from local storage,
      so we need to tell React to rerender
      */
      forceUpdate();
  }

  useEffect(() => {
      /*
      set the function (callback) to call when a user goes idle
      we'll set this to logout a user when they're idle
      */
      IdleService.setIdleCallback(logoutFromIdle);

      /* if a user is logged in */
      if (TokenService.hasAuthToken()) {
          /*
          tell the idle service to register event listeners
          the event listeners are fired when a user does something, e.g. move their mouse
          if the user doesn't trigger one of these event listeners,
              the idleCallback (logout) will be invoked
          */
          IdleService.regiserIdleTimerResets();

          /*
          Tell the token service to read the JWT, looking at the exp value
          and queue a timeout just before the token expires
          */
          TokenService.queueCallbackBeforeExpiry(() => {
              /* the timeout will call this callback just before the token expires */
              AuthApiService.postRefreshToken();
          });
      }

      return function cleanup() {
          /*
          when the app unmounts,
          stop the event listeners that auto logout (clear the token from storage)
          */
          IdleService.unRegisterIdleResets();
          /*
          and remove the refresh endpoint request
          */
          TokenService.clearCallbackBeforeExpiry();
      }
      
  });

  return (
    <div className="App">
      <Header forceUpdate={forceUpdate} />
      <main>
        <ErrorBoundary>
          <Switch>
            <Route
              exact path='/'
              component={Landing}
            />
            <PublicOnlyRoute
                path="/register"
                component={RegistrationForm}
            />
            <PublicOnlyRoute
                path="/login"
                render={rProps => <LoginPage {...rProps} forceUpdate={forceUpdate} />} 
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
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;
