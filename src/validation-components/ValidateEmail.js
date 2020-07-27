import React from 'react';
import isEmail from 'validator/lib/isEmail';

const ValidateEmail = (props) => {
    const { email, setEmailValidationError } = props;
    if (isEmail(email)) {
        setEmailValidationError(null);
        return <p id='email-validation'>Email accepted.</p>
    } else {
        setEmailValidationError('Email invalid.')
        return (
            <p id='email-validation'>A valid email address is required.</p>
        );
    }
}

export default ValidateEmail;