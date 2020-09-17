import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ValidateUsername = (props) => {
    const { 
        username,
        usernameValidationError, 
        usernameExists,
        setUsernameValidationError 
    } = props;

    useEffect(() => {
        if (username.trim().length >= 3 && username.trim().length <= 72) {
            setUsernameValidationError('');
        } else {
            setUsernameValidationError('Username required and must be 3-72 characters in length.');
        }
        
    }, [username, setUsernameValidationError]);

    const accountExistsText = (
        <>
            <span
                style={{ color: 'red' }}
            >
                The username {usernameExists} is already linked to a registered account.
            </span>
            <br />
            <span
                style={{ color: 'black' }}
            >
                    If that account belongs to you,{' '} 
                    <span 
                        style={{ color: 'hsl(245, 100%, 50%)' }}
                    >
                        {<Link to='/login'>click here</Link>}
                    </span> 
                    {' '}to login.            
            </span>
        </>
    );

    if (usernameValidationError) {
        return (
            <p
                className='ValidateUserName__validator error' 
                id='username-validation'
            >
                {usernameValidationError}
                <br />
                {usernameExists && accountExistsText}
            </p>
        );
    }

    return (
        <p 
            className='ValidateUserName__validator valid'
            id='username-validation'
        >
            Username properly formatted.
            <br />
            {usernameExists && accountExistsText}
        </p>
    );
}

ValidateUsername.defaultProps = {
    username: '',
    usernameValidationError: 'Username required and must be 3-72 characters in length.', 
    usernameExists: '',
    setUsernameValidationError: () => {},
};

ValidateUsername.propTypes = {
    username: PropTypes.string.isRequired,
    usernameValidationError: PropTypes.string.isRequired,
    usernameExists: PropTypes.string.isRequired,
    setUsernameValidationError: PropTypes.func.isRequired,
};

export default ValidateUsername;
