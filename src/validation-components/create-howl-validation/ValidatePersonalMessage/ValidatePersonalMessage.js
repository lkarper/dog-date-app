import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const ValidatePersonalMessage = (props) => {
    const { 
        personalMessage, 
        personalMessageError, 
        setPersonalMessageError, 
    } = props;

    useEffect(() => {
        if (personalMessage && personalMessage.trim().length === 0) {
            setPersonalMessageError('If you include a personal message, it must contain more than spaces.')
        } else {
            setPersonalMessageError('');
        }
    }, [personalMessage, setPersonalMessageError]);

    if (personalMessageError) {
        return (
            <p 
                className='ValidatePersonalMessage__validator error'
                id='personal-message-validator'
            >
                {personalMessageError} (Limited to 2000 characters.)
            </p>
        );
    }

    return (
        <p 
            className='ValidatePersonalMessage__validator'
            id='personal-message-validator'
        >
            Personal message optional. (Limited to 2000 characters.)
        </p>
    );
}

ValidatePersonalMessage.defaultProps = {
    personalMessage: '',
    personalMessageError: '',
    setPersonalMessageError: () => {},
};

ValidatePersonalMessage.propTypes = {
    personalMessage: PropTypes.string.isRequired,
    personalMessageError: PropTypes.string.isRequired,
    setPersonalMessageError: PropTypes.func.isRequired,
};

export default ValidatePersonalMessage;
