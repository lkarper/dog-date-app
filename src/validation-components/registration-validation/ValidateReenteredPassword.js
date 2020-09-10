import React, { useEffect } from 'react';

const ValidateReenteredPassword = (props) => {
    const { reenteredPasswordError } = props;

    useEffect(() => {
        const { setReenteredPasswordError, password, reenteredPassword } = props;
        if (password === reenteredPassword) {
            setReenteredPasswordError(null);
        } else {
            setReenteredPasswordError('Passwords do not match.');
        }
    }, [props]);

    if (reenteredPasswordError) {
        return (
            <p 
                className='ValidateReenteredPassword__validator error'
                id="reenter-password-validation"
            >
                {reenteredPasswordError}
            </p> 
        );
    }

    return (
        <p 
            className='ValidateReenteredPassword__validator valid'
            id="reenter-password-validation"
        >
            Passwords match.
        </p>
    );
    
}

export default ValidateReenteredPassword;
