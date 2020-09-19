import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const ValidateReenteredPassword = (props) => {
    const { 
        password, 
        reenteredPassword, 
        reenteredPasswordError,
        setReenteredPasswordError,
    } = props;

    useEffect(() => {
        if (password === reenteredPassword) {
            setReenteredPasswordError('');
        } else {
            setReenteredPasswordError('Passwords do not match.');
        }
    }, [password, reenteredPassword, setReenteredPasswordError]);

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

ValidateReenteredPassword.defaultProps = {
    password: '', 
    reenteredPassword: '', 
    reenteredPasswordError: '',
    setReenteredPasswordError: () => {},
};

ValidateReenteredPassword.propTypes = {
    password: PropTypes.string.isRequired, 
    reenteredPassword: PropTypes.string.isRequired, 
    reenteredPasswordError: PropTypes.string.isRequired,
    setReenteredPasswordError: PropTypes.func.isRequired,
};

export default ValidateReenteredPassword;
