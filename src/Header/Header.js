import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = (props) => {
    return (
        <header className="Header__header">
            <h1>
                <Link to='/'>
                    Dog Date
                </Link>
            </h1>
            <nav>

            </nav>
        </header>
    );
}

export default Header;