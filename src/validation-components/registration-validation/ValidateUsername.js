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

    if (usernameValidationError) {
        return (
            <p id='username-validation'>Username required and must be 3-72 characters in length.
                {usernameExists ? `The username '${usernameExists}' is already linked to a registered account.  If that account belongs to you, <Link to='/login'>click here</Link> to log in.` : ''}
            </p>
        );
    }

    return (
        <p id='username-validation'>Username properly formatted.
             {usernameExists ? `The username '${usernameExists}' is already linked to a registered account.  If that account belongs to you, ${<Link to='/login'>click here</Link>} to log in.` : ''}
        </p>
    );
}

export default ValidateUsername;