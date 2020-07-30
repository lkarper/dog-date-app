import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';

const ValidateEmail = (props) => {
    const { emailValidationError, emailAlreadyRegistered } = props;

    useEffect(() => {
        const { email, setEmailValidationError } = props;
        if (isEmail(email)) {
            setEmailValidationError(null);
        } else {
            setEmailValidationError('Email invalid.')
        }
    }, [props]);

    if (emailValidationError) {
        return (
            <p id='email-validation'>A valid email address is required.
                {emailAlreadyRegistered ? `A registered account is already linked to the email address '${emailAlreadyRegistered}'.  If that account belongs to you, ${<Link to='/login'>click here</Link>} to login.` : ''}    
            </p>
        );
    }

    return (
        <p id='email-validation'>Email properly formatted.
            {emailAlreadyRegistered ? `A registered account is already linked to the email address '${emailAlreadyRegistered}'.  If that account belongs to you, ${<Link to='/login'>click here</Link>} to login.` : ''}    
        </p>
    );
   
}

export default ValidateEmail;