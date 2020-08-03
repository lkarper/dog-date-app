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
        return <p id='obedience-validator'>Obedience-level set to: '{obedience}.'</p>;
    }

    return <p id='obedience-validator'>{obedienceError}</p>;
}

export default ValidateDogProfileObedience;
