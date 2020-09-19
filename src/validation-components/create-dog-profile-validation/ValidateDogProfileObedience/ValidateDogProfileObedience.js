import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const ValidateDogProfileObedience = (props) => {
    const { 
        obedience, 
        obedienceError, 
        setObedienceError, 
    } = props;

    useEffect(() => {
        if (obedience) {
            setObedienceError('');
        } else {
            setObedienceError(`You must select your dog's obedience level.`);
        }
    }, [obedience, setObedienceError]);

    if (obedience) {
        return (
            <p 
                className='ValidateDogProfileObedience__validator valid'
                id='obedience-validator'
            >
                    Obedience-level set to: '{obedience}.'
            </p>
        );
    }

    return (
        <p 
            className='ValidateDogProfileObedience__validator error'
            id='obedience-validator'
        >
            {obedienceError}
        </p>
    );
}

ValidateDogProfileObedience.defaultProps = {
    obedience: '',
    obedienceError: `You must select your dog's obedience level.`,
    setObedienceError: () => {},
};

ValidateDogProfileObedience.propTypes = {
    obedience: PropTypes.string.isRequired,
    obedienceError: PropTypes.string.isRequired,
    setObedienceError: PropTypes.func.isRequired,
};

export default ValidateDogProfileObedience;
