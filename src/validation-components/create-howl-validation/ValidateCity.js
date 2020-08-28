import React, { useEffect } from 'react';

const ValidateCity = (props) => {

    const { city, cityError, setCityError } = props;

    useEffect(() => {
        
        if (city.trim().length === 0) {
            setCityError(`You must enter a city.`);
        } else {
            setCityError('');
        }

    }, [city, setCityError]);

    if (cityError) {
        return <p id='city-validator'>{cityError}</p>;
    }

    return <p id='city-validator'>City set to {city}</p>;
}

export default ValidateCity;
