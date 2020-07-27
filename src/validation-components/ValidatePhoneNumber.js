import React from 'react';

const ValidatePhoneNumber = (props) => {
    const { phone, setPhoneValidationError } = props;

    const regex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    const validPhone = regex.test(phone);

    if (phone && validPhone) {
        setPhoneValidationError(null);
        return <p id="phone-validation">Phone number accepted</p>; 
    } else if (phone && !validPhone) {
        setPhoneValidationError('Phone number not valid');
        return <p id="phone-validation">Phone number does not match format '123-456-7890'</p>;
    }

    setPhoneValidationError(null);
    return <p id="phone-validation">Phone number optional, but if provided must match format '123-456-7890'</p>;
}

export default ValidatePhoneNumber;