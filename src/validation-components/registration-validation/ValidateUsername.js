import React, { useEffect } from 'react';

const ValidateUsername = (props) => {
    const { usernameValidationError } = props;

    useEffect(() => {
        const { username, setUsernameValidationError } = props;
        if (username.trim().length >= 3 && username.trim().length <= 72) {
            setUsernameValidationError(null);
        } else {
            setUsernameValidationError('Invalid username.');
        }
        
    }, [props]);

    if (usernameValidationError) {
        return <p id='username-validation'>Username required and must be 3-72 characters in length.</p>;
    }

    return <p id='username-validation'>Username properly formatted.</p>;
}

export default ValidateUsername;