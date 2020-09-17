import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const ValidateCity = (props) => {

    const { 
        city, 
        cityError, 
        setCityError 
    } = props;

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

ValidateCity.defaultProps = {
    city: '',
    cityError: 'You must enter a city. (Max 100 chars.)',
    setCityError: () => {},
};

ValidateCity.propTypes = {
    city: PropTypes.string.isRequired,
    cityError: PropTypes.string.isRequired,
    setCityError: PropTypes.func.isRequired,
};

export default ValidateCity;
