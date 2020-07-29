import React, { useEffect } from 'react';
import isEmail from 'validator/lib/isEmail';

const ValidateEmail = (props) => {
    const { emailValidationError } = props;

    useEffect(() => {
        const { email, setEmailValidationError } = props;
        if (isEmail(email)) {
            setEmailValidationError(null);
        } else {
            setEmailValidationError('Email invalid.')
        }
    }, [props]);

    if (emailValidationError) {
        return <p id='email-validation'>A valid email address is required.</p>;
    }

    return <p id='email-validation'>Email accepted.</p>
   
}

export default ValidateEmail;