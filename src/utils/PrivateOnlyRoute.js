import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../services/token-service';

// Redirects any users who are not logged in to the login page
const PrivateRoute = ({ component, ...props }) => {
    const Component = component;
    return (
        <Route
            {...props}
            render={componentProps => (
                TokenService.hasAuthToken()
                    ? <Component {...componentProps} />
                    : <Redirect
                        to={{
                            pathname: '/login',
                            /* 
                                Passing the original location that caused the redirect in state
                                allows the login page to redirect the user back to the page 
                                that they were originally redirected from 
                            */
                            state: { from: componentProps.location },
                        }}
                />
            )}
        />
    );
}

export default PrivateRoute;
