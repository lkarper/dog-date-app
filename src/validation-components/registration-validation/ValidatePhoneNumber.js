import React, { useEffect, useState } from 'react';

const ValidatePhoneNumber = (props) => {

    const [phoneValidationMessage, setPhoneValidationMessage] = useState(`Phone number optional, but if provided must match format '123-456-7890'`);

    useEffect(() => {
        const { phone, setPhoneValidationError } = props;

        const regex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
        const validPhone = regex.test(phone);

        if (phone && validPhone) {
            setPhoneValidationError(null);
            setPhoneValidationMessage('Phone number accepted'); 
        } else if (phone && !validPhone) {
            setPhoneValidationError('Phone number not valid');
            setPhoneValidationMessage(`Phone number does not match format '123-456-7890'`);
        } else {
            setPhoneValidationError(null);
            setPhoneValidationMessage(`Phone number optional, but if provided must match format '123-456-7890'`);
        }

    }, [props]);

    return <p id="phone-validation">{phoneValidationMessage}</p>;
}

export default ValidatePhoneNumber;