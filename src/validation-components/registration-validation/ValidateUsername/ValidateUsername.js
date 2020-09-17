import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ValidateUsername = (props) => {
    const { usernameValidationError, usernameExists } = props;

    useEffect(() => {
        const { username, setUsernameValidationError } = props;
        if (username.trim().length >= 3 && username.trim().length <= 72) {
            setUsernameValidationError(null);
        } else {
            setUsernameValidationError('Invalid username.');
        }
        
    }, [props]);

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
                    If that account belongs to you, <span style={{ color: 'hsl(245, 100%, 50%)' }}>{<Link to='/login'>click here</Link>}</span> to login.            </span>
        </>
    );

    if (usernameValidationError) {
        return (
            <p
                className='ValidateUserName__validator error' 
                id='username-validation'
            >
                Username required and must be 3-72 characters in length.
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

export default ValidateUsername;
