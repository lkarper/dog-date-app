import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const ValidateDogProfileTemperment = (props) => {

    const { 
        temperment, 
        tempermentError, 
        setTempermentError 
    } = props;

    useEffect(() => {
        if (temperment) {
            setTempermentError('');
        } else {
            setTempermentError(`You must select your dog's temperment.`)
        }
    }, [temperment, setTempermentError]);

    if (temperment) {
        return (
            <p 
                className='ValidateDogProfileTemperment__validator valid'
                id='temperment-validator'
            >
                Temperment set to: '{temperment}.'
            </p>
        );
    }

    return (
        <p 
            className='ValidateDogProfileTemperment__validator error'
            id='temperment-validator'
        >
            {tempermentError}
        </p>
    );
}

ValidateDogProfileTemperment.defaultProps = {
    temperment: '',
    tempermentError: `You must select your dog's temperment.`,
    setTempermentError: () => {},
};

ValidateDogProfileTemperment.propTypes = {
    temperment: PropTypes.string.isRequired,
    tempermentError: PropTypes.string.isRequired,
    setTempermentError: PropTypes.func.isRequired,
};

export default ValidateDogProfileTemperment;
