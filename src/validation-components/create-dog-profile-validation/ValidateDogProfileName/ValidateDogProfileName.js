import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const ValidateDogProfileName = (props) => {

    const { 
        name, 
        nameError, 
        setNameError 
    } = props;

    useEffect(() => {
        if (name.trim().length === 0) {
            setNameError(`A name is required. (Max 72 characters.)`);
        } else {
            setNameError('');
        }
    }, [name, setNameError]);

    if (nameError) {
        return (
            <p 
                className='ValidateDogProfile__validator error'
                id='name-validator'
            >
                {nameError}
            </p>
        );
    }

    return (
        <p 
            className='ValidateDogProfile__validator valid'
            id='name-validator'
        >
            Name accepted. (Max 72 characters.)
        </p>
    );
    
}

ValidateDogProfileName.defaultProps = {
    name: '',
    nameError: 'A name is required. (Max 72 characters.)',
    setNameError: () => {},
};

ValidateDogProfileName.propTypes = {
    name: PropTypes.string.isRequired,
    nameError: PropTypes.string.isRequired,
    setNameError: PropTypes.func.isRequired,
};

export default ValidateDogProfileName;
