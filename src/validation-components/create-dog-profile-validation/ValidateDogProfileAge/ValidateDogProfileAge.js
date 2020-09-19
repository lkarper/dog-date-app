import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const ValidateDogProfileAge = (props) => {
    const { 
        ageYears, 
        ageMonths, 
        ageError, 
        setAgeError,
    } = props;

    useEffect(() => {
        if (!ageYears && !ageMonths) {
            setAgeError(`You must enter an age.`);
        } else {
            setAgeError('');
        }
    }, [ageYears, ageMonths, setAgeError]);

    if (ageError) {
        return (
            <p
                className='ValidateDogProfileAge__validator error' 
                id='age-validator'
            >
                {ageError}
            </p>
        );
    }

    if (ageYears && ageMonths) {
        return (
            <p 
                className='ValidateDogProfileAge__validator valid'
                id='age-validator'
            >
                Age set to: {ageYears}{' '}{ageYears === 1 ? `year` : `years`},{' '} 
                {ageMonths}{' '}{ageMonths === 1 ? `month ` : `months `}old.
            </p>
        );
    }

    if (ageYears) {
        return (
            <p 
                className='ValidateDogProfileAge__validator valid'
                id='age-validator'
            >
                Age set to: {ageYears}{' '}{ageYears === 1 ? `year ` : `years `}old.
            </p>
        );
    }

    return (
        <p 
            className='ValidateDogProfileAge__validator valid'
            id='age-validator'
        >
            Age set to: {ageMonths}{' '}{ageMonths === 1 ? `month ` : `months `}old.
        </p>
    );

}

ValidateDogProfileAge.defaultProps = {
    ageYears: '',
    ageMonths: '',
    ageError: 'You must enter an age.',
    setAgeError: () => {},
};

ValidateDogProfileAge.propTypes = {
    ageYears: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    ageMonths: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    ageError: PropTypes.string.isRequired,
    setAgeError: PropTypes.func.isRequired,
};

export default ValidateDogProfileAge;
