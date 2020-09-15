import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import UserContext from '../contexts/UserContext';
import TokenService from '../services/token-service';
import IdleService from '../services/idle-service';
import NativeClickListener from '../utils/NativeClickListener';
import './Header.css';

const Header = (props) => {

    const context = useContext(UserContext);

    const { forceUpdate } = props;

    const [showMenu, setShowMenu] = useState(false);

    const handleLogout = () => {
        setShowMenu(false);
        TokenService.clearAuthToken();
        TokenService.clearCallbackBeforeExpiry();
        IdleService.unRegisterIdleResets();
        context.setUser({});
        context.setDogs([]);
        context.setUserPackMembers([]);
        context.setUserSavedHowls([]);
        context.setHowls([]);
        forceUpdate();
    }

    const location = Object.keys(props).includes('location') ? props.location.pathname : '/home';

    const logoutLink = (
        <li>
            <Link
                className="Header__link"
                onClick={handleLogout}
                to='/'
            >
                Logout
            </Link>
        </li>
    );

    const loginLink = (
        <>
            <li>
                <NavLink 
                    className="Header__link" 
                    activeClassName='selected'
                    to='/register'
                    onClick={() => setShowMenu(false)}
                >
                    Register
                </NavLink>
            </li>
            <li>
                <NavLink
                    className="Header__link" 
                    activeClassName='selected'
                    to={{
                        pathname: '/login',
                        state: { from: location || '/' }
                    }}
                    onClick={() => setShowMenu(false)}
                >
                    Log in
                </NavLink>
            </li>
        </>
    );

    return (
        <header className="Header__header">
            <div
                className='Header__mobile-container'
            >
                <Link 
                    className='Header__dog-date'
                    to='/'
                    onClick={() => setShowMenu(false)}
                >
                    Dog Date
                </Link>
                <button
                    className='Header__hamburger button'
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <FontAwesomeIcon 
                        icon={faBars}  
                    />
                </button>
            </div>
            <NativeClickListener
                id='Header__native-click-div'
                onClick={() => setShowMenu(false)}
            >
                <nav 
                    className={`Header__nav${showMenu ? ' active' : ''}`}
                    aria-live='polite'
                >  
                    <ul
                        className={`Header__ul`}
                    >
                        {TokenService.hasAuthToken()
                            ? 
                                <li>
                                    <NavLink 
                                        className='Header__navlink' 
                                        activeClassName='selected'
                                        to='/home'
                                        onClick={() => setShowMenu(false)}
                                    >
                                        Homepage
                                    </NavLink>
                                </li>
                            : 
                                ''
                        }
                        <li>
                            <NavLink 
                                className='Header__navlink' 
                                activeClassName='selected' 
                                to='/howls'
                                onClick={() => setShowMenu(false)}
                            >
                                Howls
                            </NavLink>
                        </li>
                        {TokenService.hasAuthToken() ? logoutLink : loginLink }
                    </ul> 
                </nav>
            </NativeClickListener>
        </header>
    );
}

Header.defaultProps = {
    forceUpdate: () => {},
    location: {
        pathname: '/home',
    }
};

Header.propTypes = {
    forceUpdate: PropTypes.func.isRequired,
    location: PropTypes.object,
}

export default Header;
