import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import TokenService from '../services/token-service';
import IdleService from '../services/idle-service';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

const Header = (props) => {

    const context = useContext(UserContext);

    const { forceUpdate } = props;

    const handleLogout = () => {
        TokenService.clearAuthToken();
        TokenService.clearCallbackBeforeExpiry();
        IdleService.unRegisterIdleResets();
        context.setUser({});
        context.setDogs([]);
        context.setUserPackMembers([]);
        context.setUserSavedHowls([]);
        forceUpdate();
    }

    const location = Object.keys(props).includes('location') ? props.location.pathname : '/home';

    const logoutLink = (
        <Link
            className="Header__link"
            onClick={handleLogout}
            to='/'
        >
            Logout
        </Link>
    );

    const loginLink = (
        <>
            <Link 
                className="Header__link" 
                to='/register'
            >
                Register
            </Link>
            <Link
                className="Header__link" 
                to={{
                    pathname: '/login',
                    state: { from: location || '/' }
                }}
            >
                Log in
            </Link>
        </>
    );

    return (
        <header className="Header__header">
            <Link 
                className='Header__dog-date'
                to='/'
            >
                Dog Date
            </Link>
            <nav>
                {TokenService.hasAuthToken()
                    ? 
                        <NavLink 
                            className='Header__navlink' 
                            to='/home'
                        >
                            Homepage
                        </NavLink>
                    : 
                        ''
                }
                <NavLink 
                    className='Header__navlink'  
                    to='/howls'
                >
                    Howls
                </NavLink>
                {TokenService.hasAuthToken() ? logoutLink : loginLink }
            </nav>
        </header>
    );
}

export default Header;
