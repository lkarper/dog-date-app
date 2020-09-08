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
        return (
            <p 
                className='ValidateDogProfileSex__validator valid'
                id='sex-validator'
            >
                Sex set to: '{sex}.'
            </p>
        );
    }

    return (
        <p 
            className='ValidateDogProfileSex__validator error'
            id='sex-validator'
        >
            {sexError}
        </p>
    );
}

export default ValidateDogProfileSex;
