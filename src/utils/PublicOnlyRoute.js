import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../services/token-service';

/* 
    Redirects any users who are logged in to the landing page;
    used to prevent logged-in users from registering 
    or trying to log in while already logged in.
*/

const PublicOnlyRoute = ({ render, component, ...props }) => {
    const Component = render ? render : component;
    return (
        <Route 
            {...props}
            render={componentProps => (
                TokenService.hasAuthToken()
                    ? <Redirect to={'/'} />
                    : <Component {...componentProps} />
            )}
        />
    );
}

export default PublicOnlyRoute;
