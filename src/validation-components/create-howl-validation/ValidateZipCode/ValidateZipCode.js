import React, { useEffect } from 'react';

const ValidateZipCode = (props) => {
    
    const { 
        zipcode, 
        zipcodeError, 
        setZipcodeError, 
        notRequired = false 
    } = props;

    useEffect(() => {  
        if (notRequired && zipcode.length === 0) {
            setZipcodeError('');
        } else if (!/^[0-9]{5}$/.test(zipcode)) {
            if (notRequired) {
                setZipcodeError(`Zip code must be 5 digits in length if provided.`);
            } else {
                setZipcodeError(`ZIP code is required and must be 5 digits in length.`);
            } 
        } else {
            setZipcodeError('');
        }
    }, [zipcode, setZipcodeError, notRequired]);

    if (zipcodeError) {
        return (
            <p 
                className='ValidateZipCode__validator error'
                id='zipcode-validator'
            >
                {zipcodeError}
            </p>
        );
    }

    if (notRequired && !zipcodeError && !zipcode) {
        return (
            <p
                className='ValidateZipCode__validator' 
                id='zipcode-validator'
            >
                Zip code is optional, but must be 5 digits in length if provided.
            </p>
        );
    }

    return (
        <p 
            className='ValidateZipCode__validator valid'
            id='zipcode-validator'
        >
            ZIP code set to '{zipcode}'.
        </p>
    );
}

export default ValidateZipCode;
