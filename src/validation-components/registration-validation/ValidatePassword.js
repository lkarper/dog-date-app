import React, { useEffect } from 'react';
import PasswordChecklist from './PasswordChecklist';
import './ValidatePassword.css';

const ValidatePassword = (props) => {

    const { passwordErrorMessage, passwordError } = props;
    
    useEffect(() => {
        const password = props.password;
        const setPasswordError = props.setPasswordError;
        const setPasswordErrorMessage = props.setPasswordErrorMessage;
        const newPasswordError = {}
        const passwordErrorArray = [];

        if (password.length < 8) {
            newPasswordError.tooShort = true;
            passwordErrorArray.push('Password must be at least 8 characters in length.');
        } else {
            newPasswordError.tooShort = false;
        }

        if (password.length > 72) {
            newPasswordError.tooLong = true;
            passwordErrorArray.push('Password must be 72 characters or fewer in length.');
        } else {
            newPasswordError.tooLong = false;
        }

        if (password.startsWith(' ') || password.endsWith(' ')) {
            newPasswordError.endSpaces = true;
            passwordErrorArray.push('Password must not begin or end with a space.');
        } else {
            newPasswordError.endSpaces = false;
        }

        if (!/[a-z]/.test(password)) {
            newPasswordError.lowerCase = true;
            passwordErrorArray.push('Password must contain at least one lowercase character.');
        } else {
            newPasswordError.lowerCase = false;
        }

        if (!/[A-Z]/.test(password)) {
            newPasswordError.upperCase = true;
            passwordErrorArray.push('Password must contain at least one uppercase character.');
        } else {
            newPasswordError.upperCase = false;
        }

        if (!/\d/.test(password)) {
            newPasswordError.number = true;
            passwordErrorArray.push('Password must contain at least one number.');
        } else {
            newPasswordError.number = false;
        }

        if (!/\W/.test(password)) {
            newPasswordError.specialChar = true;
            passwordErrorArray.push('Password must contain at least one special character.');
        } else {
            newPasswordError.specialChar = false;
        }
        setPasswordError(newPasswordError);
        setPasswordErrorMessage(passwordErrorArray);
    }, [props.password, props.setPasswordError, props.setPasswordErrorMessage]);

    return (
        <>
            <PasswordChecklist passwordError={passwordError} />
            <div
                role="alert"
                className='ValidatePassword__password-error-message'
            >
                <p id="password-error-message">
                    {passwordErrorMessage.length ? passwordErrorMessage.join(' ') : 'Password meets all requirements.'}
                </p>
            </div>
        </>
    );
}

export default ValidatePassword;