import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const ValidateState = (props) => {
    const { 
        state, 
        stateError, 
        setStateError, 
    } = props;

    useEffect(() => {
        if (state.length === 0) {
            setStateError('You must select a state.');
        } else {
            setStateError('');
        }
    }, [state, setStateError]);

    if (stateError) {
        return (
            <p 
                className='ValidateState__validator error'
                id='state-validator'
            >
                {stateError}
            </p>
        );
    }

    return (
        <p 
            className='ValidateState__validator valid'
            id='state-validator'
        >
            State set to '{state}'.
        </p>
    );
}

ValidateState.defaultProps = {
    state: '',
    stateError: 'You must select a state.',
    setStateError: () => {}, 
};

ValidateState.propTypes = {
    state: PropTypes.string.isRequired,
    stateError: PropTypes.string.isRequired,
    setStateError: PropTypes.func.isRequired,
};

export default ValidateState;
