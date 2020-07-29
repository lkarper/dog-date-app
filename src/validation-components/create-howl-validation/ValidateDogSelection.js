import React, { useContext, useEffect } from 'react';
import UserContext from '../../contexts/UserContext';

const ValidateDogSelection = (props) => {
    const { dogsForHowl, dogsForHowlError, setDogsForHowlError } = props;

    const context = useContext(UserContext);

    useEffect(() => {
        if (dogsForHowl.length === 0) {
            setDogsForHowlError('You must select at least one dog.');
        } else {
            setDogsForHowlError(null);
        }
    }, [dogsForHowl, setDogsForHowlError])

    if (dogsForHowlError) {
        return <p id='dogs-validation'>{dogsForHowlError}</p>;
    } else {
        const selectionText = dogsForHowl.map(dogId => 
            context.dogs.find(dog => dog.id === dogId).name
        );
        return <p id='dogs-validation'>
            You have selected: {selectionText.join(', ')}
        </p>;
    }
    
}

export default ValidateDogSelection;