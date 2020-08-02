import React, { useEffect } from 'react';

const ValidateDogProfileSex = (props) => {

    const { sex, sexError, setSexError } = props;

    useEffect(() => {
        if (sex) {
            setSexError('');
        } else {
            setSexError(`You must select your dog's sex.`);
        }
    }, [sex, setSexError]);

    if (sex) {
        const sexDisplay = sex
            .split('-')
            .join(', ');
        const newSexDisplay = `${sexDisplay.charAt(0).toUpperCase()}${sexDisplay.slice(1)}`;

        return <p id='sex-validator'>Sex set to: {newSexDisplay}.</p>;
    }

    return <p id='sex-validator'>{sexError}</p>;

}

export default ValidateDogProfileSex;