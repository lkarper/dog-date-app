import React, { useEffect } from 'react';

const ValidatePersonalMessage = (props) => {
    const { personalMessage, personalMessageError, setPersonalMessageError } = props;

    useEffect(() => {
        if (personalMessage && personalMessage.trim().length === 0) {
            setPersonalMessageError('If you include a personal message, it must contain more than spaces.')
        } else {
            setPersonalMessageError(null);
        }

    }, [personalMessage, setPersonalMessageError]);

    if (personalMessageError) {
        return <p id='personal-message-validator'>{personalMessageError} (Limited to 2000 characters.)</p>
    }

    return <p id='personal-message-validator'>Personal message optional. (Limited to 2000 characters.)</p>
}


export default ValidatePersonalMessage;
