import React, { useState, useEffect, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import PublicOnlyRoute from '../utils/PublicOnlyRoute';
import PrivateOnlyRoute from '../utils/PrivateOnlyRoute';
import UserContext from '../contexts/UserContext';
import IdleService from '../services/idle-service';
import TokenService from '../services/token-service';
import AuthApiService from '../services/auth-api-service';
import DogProfilesService from '../services/dog-profiles-service';
import HowlsService from '../services/howls-service';
import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import LoginPage from '../LoginPage/LoginPage';
import HowlsList from '../HowlsList/HowlsList';
import Homepage from '../Homepage/Homepage';
import CreateHowlPage from '../CreateHowlPage/CreateHowlPage';
import DogProfilePage from '../DogProfilePage/DogProfilePage';
import CreateDogReviewPage from '../CreateDogReviewPage/CreateDogReviewPage';
import CreateDogProfile from '../CreateDogProfile/CreateDogProfile';
import HowlPageView from '../HowlPageView/HowlPageView';
import ReviewPage from '../ReviewPage/ReviewPage';
import PageNotFound from '../PageNotFound/PageNotFound';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import './App.css';

const useForceUpdate = () => {
  const [value, setValue] = useState(0); 
  return () => setValue(value + 1); 
}

const App = (props) => {
  const context = useContext(UserContext);

  const forceUpdate = useForceUpdate();

  const logoutFromIdle = () => {
      // Removes data from local storage
      TokenService.clearAuthToken();
      
      // Clears the timeout function set to make an api call to the refresh endpoint
      TokenService.clearCallbackBeforeExpiry();

      // Removes the timeout that auto logs-out when idle and the event listeners that reset it
      IdleService.unRegisterIdleResets();

      // Resets context and rerenders the app after local storage has been cleared
      context.setUser({});
      context.setDogs([]);
      context.setUserPackMembers([]);
      context.setUserSavedHowls([]);
      forceUpdate();
  }

  useEffect(() => {
    if (TokenService.hasAuthToken() && Object.keys(context.user).length === 0) {

      // Retrieves user data saved in local storage without needing to make an api call
      context.setUser({
        id: parseInt(window.sessionStorage.getItem('id')),
        username: window.sessionStorage.getItem('username'),
        email: window.sessionStorage.getItem('email'),
        phone: window.sessionStorage.getItem('phone'),
      });

      context.setLoading(true);

      // Retrieves basic user data on login
      Promise.all([
          DogProfilesService.fetchUserDogs(), 
          DogProfilesService.fetchPackMembers(),
          HowlsService.fetchUserSavedHowls(),
          HowlsService.fetchHowlsByUser(),
      ])
      .then(res => Promise.all(res.map(res => res.json())))
      .then(values => {
          const userDogs = values[0];
          const packMembers = values[1];
          const userSavedHowls = values[2];
          const howls = values[3];
          context.setDogs(userDogs);
          context.setUserPackMembers(packMembers);
          context.setUserSavedHowls(userSavedHowls);
          context.setHowls(howls);
          context.setLoading(false);
          context.setError(false);
          forceUpdate();
      })
      .catch(error => {
        console.log(error);
        context.setLoading(false);
        context.setError(true);
      });
    }
  }, [props, context, forceUpdate]);

  useEffect(() => {

      /* 
        Sets the callback that will be added to the timeout 
        that will logout a user due to inactivity 
      */
      IdleService.setIdleCallback(logoutFromIdle);

      // If a user is logged in
      if (TokenService.hasAuthToken()) {
          
          // Registers the event listeners that will reset the idle timeout
          IdleService.regiserIdleTimerResets();

          // Queues a callback that will fire just before the jwt in local storage expires
          TokenService.queueCallbackBeforeExpiry(() => {
              // Calls the api to send a new jwt
              AuthApiService.postRefreshToken();
          });
      }

      return function cleanup() {
          
          // Clear local storage and remove event listeners when App unmounts
          IdleService.unRegisterIdleResets();
          TokenService.clearCallbackBeforeExpiry();
      }
      
  });

  return (
    <div className="App">
      <Header forceUpdate={forceUpdate} />
      <main>
        <ErrorBoundary>
          {context.error 
            ?
              <section>
                <header>
                  <h1>Woof...</h1>
                </header>
                  <p>Looks like something went wrong. Check your connection and try again.</p>
              </section> 
            : 
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
                <PrivateOnlyRoute 
                  path='/howls/:howl_id'
                  component={HowlPageView}
                />
                <PrivateOnlyRoute 
                  path='/home'
                  component={Homepage}
                />
                <PrivateOnlyRoute 
                  path='/create-howl'
                  component={CreateHowlPage}
                />
                <PrivateOnlyRoute
                  path='/dog-profile/:id'
                  component={DogProfilePage} 
                />
                <PrivateOnlyRoute 
                  path='/reviews/:id'
                  component={ReviewPage}
                />
                <PrivateOnlyRoute 
                  path='/leave-review/:dog_id'
                  component={CreateDogReviewPage}
                />
                <PrivateOnlyRoute 
                  path='/create-dog-profile'
                  component={CreateDogProfile}
                />
                <Route 
                  component={PageNotFound}
                />
              </Switch>
          }
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;
