import React, { useEffect } from 'react';

const ValidateState = (props) => {

    const { state, stateError, setStateError } = props;

    useEffect(() => {
        if (state.length === 0) {
            setStateError('You must select a state.');
        } else {
            setStateError('');
        }
    }, [state, setStateError]);

    if (stateError) {
        return <p id='state-validator'>{stateError}</p>;
    }

    return <p id='state-validator'>State set to {state}.</p>;
}

export default ValidateState;
