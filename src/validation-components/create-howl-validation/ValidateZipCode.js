import React, { useEffect } from 'react';

const ValidateZipCode = (props) => {
    
    const { zipcode, zipcodeError, setZipcodeError } = props;

    useEffect(() => {
        
        if (!/(^[0-9]{5}$)|(^[0-9]{5}-[0-9]{4}$)/.test(zipcode)) {
            setZipcodeError(`ZIP code is required and must match format '12345' or '12345-6789'.`);
        } else {
            setZipcodeError('');
        }

    }, [zipcode, setZipcodeError]);

    if (zipcodeError) {
        return <p id='zipcode-validator'>{zipcodeError}</p>;
    }

    return <p id='zipcode-validator'>ZIP code set to {zipcode}.</p>;
}

export default ValidateZipCode;