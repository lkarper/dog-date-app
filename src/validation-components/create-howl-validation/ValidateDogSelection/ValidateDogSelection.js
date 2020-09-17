import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../../../contexts/UserContext';

const ValidateDogSelection = (props) => {
    const { 
        dogsForHowl, 
        dogsForHowlError, 
        setDogsForHowlError 
    } = props;

    const context = useContext(UserContext);

    useEffect(() => {
        if (dogsForHowl.length === 0) {
            setDogsForHowlError('You must select at least one dog.');
        } else {
            setDogsForHowlError('');
        }
    }, [dogsForHowl, setDogsForHowlError])

    if (dogsForHowlError) {
        return (
            <p 
                className='ValidateDogSelection__validator error'
                id='dogs-validation'
            >
                {dogsForHowlError}
            </p>
        );
    } else {
        const selectionText = dogsForHowl.map(dogId => 
            context.dogs.find(dog => dog.id === dogId).name
        );
        return (
            <p 
                className='ValidateDogSelection__validator valid'
                id='dogs-validation'
            >
                You have selected: {selectionText.join(', ')}
            </p>
        );
    }
}

ValidateDogSelection.defaultProps = {
    dogsForHowl: [],
    dogsForHowlError: 'You must select at least one dog.',
    setDogsForHowlError: () => {},
};

ValidateDogSelection.propTypes = {
    dogsForHowl: PropTypes.arrayOf(PropTypes.number).isRequired,
    dogsForHowlError: PropTypes.string.isRequired,
    setDogsForHowlError: PropTypes.func.isRequired,
};

export default ValidateDogSelection;
