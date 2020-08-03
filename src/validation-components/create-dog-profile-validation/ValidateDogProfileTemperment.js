import React, { useEffect } from 'react';

const ValidateDogProfileTemperment = (props) => {

    const { temperment, tempermentError, setTempermentError } = props;

    useEffect(() => {
        if (temperment) {
            setTempermentError('');
        } else {
            setTempermentError(`You must select your dog's temperment.`)
        }
    }, [temperment, setTempermentError]);

    if (temperment) {
        return <p id='temperment-validator'>Temperment set to: '{temperment}.'</p>;
    }

    return <p id='temperment-validator'>{tempermentError}</p>;
}

export default ValidateDogProfileTemperment;