import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

const Header = (props) => {
    return (
        <header className="Header__header">
            <h1>
                <Link 
                    to='/'
                >
                    Dog Date
                </Link>
            </h1>
            <nav>
                <NavLink 
                    className='Header__navlink' 
                    to='/home'
                >
                    Homepage
                </NavLink>
                <NavLink 
                    className='Header__navlink'  
                    to='/howls'
                >
                    Howls
                </NavLink>
                <Link 
                    className='Header__navlink' 
                    to='/register'
                >
                    Register
                </Link>
                <Link 
                    className='Header__navlink' 
                    to='/login'
                >
                    Log in
                </Link>
            </nav>
        </header>
    );
}

export default Header;