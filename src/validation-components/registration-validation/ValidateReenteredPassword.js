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

    if (!reenteredPasswordError) {
        return <p id="reenter-password-validation">Passwords match.</p>;
    } else {
        return <p id="reenter-password-validation">{reenteredPasswordError}</p>; 
    }
}

export default ValidateReenteredPassword;