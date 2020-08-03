import React, { useEffect } from 'react';

const ValidateDogProfileName = (props) => {

    const { name, nameError, setNameError } = props;

    useEffect(() => {
        if (name.trim().length === 0) {
            setNameError(`A name is required. (Max 72 characters.)`);
        } else {
            setNameError('');
        }
    }, [name, setNameError]);

    if (nameError) {
        return <p id='name-validator'>{nameError}</p>;
    }

    return <p id='name-validator'>Name accepted. (Max 72 characters.)</p>;
    
}

export default ValidateDogProfileName;