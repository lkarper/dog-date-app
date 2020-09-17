import React, { useEffect } from 'react';

const ValidateDogProfileObedience = (props) => {
    
    const { obedience, obedienceError, setObedienceError } = props;

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

export default ValidateDogProfileObedience;
