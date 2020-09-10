import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';

const ValidateEmail = (props) => {
    const { 
        emailValidationError, 
        emailAlreadyRegistered,
        suffix = '', 
    } = props;

    useEffect(() => {
        const { email, setEmailValidationError } = props;
        if (isEmail(email)) {
            setEmailValidationError(null);
        } else {
            setEmailValidationError('Email invalid.')
        }
    }, [props]);

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

export default ValidateEmail;
