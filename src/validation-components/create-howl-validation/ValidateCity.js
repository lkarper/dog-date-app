import React, { useEffect } from 'react';

const ValidateCity = (props) => {

    const { city, cityError, setCityError } = props;

    useEffect(() => {
        
        if (city.trim().length === 0) {
            setCityError(`You must enter a city. (Max 100 chars.)`);
        } else {
            setCityError('');
        }

    }, [city, setCityError]);

    if (cityError) {
        return (
            <p 
                className='ValidateCity__validator error'
                id='city-validator'
            >
                {cityError}
            </p>
        );
    }

    return (
        <p
            className='ValidateCity__validator valid'   
            id='city-validator'
        >
            City set to '{city}'. (Max 100 chars.).
        </p>
    );
}

export default ValidateCity;
