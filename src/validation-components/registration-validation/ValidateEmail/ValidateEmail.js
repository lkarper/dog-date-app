import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import PropTypes from 'prop-types';

const ValidateEmail = (props) => {
    const { 
        emailValidationError, 
        emailAlreadyRegistered,
        suffix, 
        email, 
        setEmailValidationError
    } = props;

    useEffect(() => {
        if (isEmail(email)) {
            setEmailValidationError('');
        } else {
            setEmailValidationError('Email invalid.')
        }
    }, [email, setEmailValidationError]);

    const accountExistsText = (
        <>
            <span
                style={{ color: 'red'}}
            >
                A registered account is already linked to the email address '{emailAlreadyRegistered}'.
            </span>
            <br />
            {!suffix && 
                <span
                    style={{ color: 'black' }}
                >
                    If that account belongs to you, <span style={{ color: 'hsl(245, 100%, 50%)' }}>{<Link to='/login'>click here</Link>}</span> to login.
                </span>
            }
        </>
    );

    if (emailValidationError) {
        return (
            <p 
                className='ValidateEmail__validator error'
                id='email-validation'
            >
                A valid email address is required.
                <br />
                {emailAlreadyRegistered && accountExistsText}    
            </p>
        );
    }

    return (
        <p 
            className='ValidateEmail__validator valid'
            id='email-validation'
        >
            Email properly formatted.
            <br />
            {emailAlreadyRegistered && accountExistsText}    
        </p>
    );  
}

ValidateEmail.defaultProps = {
    emailValidationError: 'Email invalid.', 
    emailAlreadyRegistered: '',
    suffix: '', 
    email: '', 
    setEmailValidationError: () => {},
};

ValidateEmail.propTypes = {
    emailValidationError: PropTypes.string.isRequired,
    emailAlreadyRegistered: PropTypes.string.isRequired,
    suffix: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    setEmailValidationError: PropTypes.func.isRequired,
};

export default ValidateEmail;
