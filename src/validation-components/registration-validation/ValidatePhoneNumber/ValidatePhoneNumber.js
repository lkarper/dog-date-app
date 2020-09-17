import React, { useEffect, useState } from 'react';

const ValidatePhoneNumber = (props) => {

    const { 
        phone, 
        phoneValidationError,
        setPhoneValidationError 
    } = props;

    const [phoneValidationMessage, setPhoneValidationMessage] = useState(`Phone number optional, but if provided must match format '123-456-7890'`);

    useEffect(() => {

        const regex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
        const validPhone = regex.test(phone);

        if (phone && validPhone) {
            setPhoneValidationError(null);
            setPhoneValidationMessage('Phone number properly formatted.'); 
        } else if (phone && !validPhone) {
            setPhoneValidationError('Phone number not valid.');
            setPhoneValidationMessage(`Phone number does not match format '123-456-7890'.`);
        } else {
            setPhoneValidationError(null);
            setPhoneValidationMessage(`Phone number optional, but if provided must match format '123-456-7890'.`);
        }

    }, [phone, setPhoneValidationError, setPhoneValidationMessage]);

    return (
        <p 
            className={`ValidatePhoneNumber__validator ${phoneValidationError ? 'error' : ''} ${phoneValidationMessage === 'Phone number properly formatted.' ? 'valid' : ''}`}
            id="phone-validation"
        >
            {phoneValidationMessage}
        </p>
    );
}

export default ValidatePhoneNumber;
