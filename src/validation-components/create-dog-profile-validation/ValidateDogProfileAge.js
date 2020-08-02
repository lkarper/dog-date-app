import React, { useEffect } from 'react';

const ValidateDogProfileAge = (props) => {

    const { ageYears, ageMonths, ageError, setAgeError } = props;

    useEffect(() => {
        if (!ageYears && !ageMonths) {
            setAgeError(`You must enter an age.`);
        } else {
            setAgeError('');
        }
    }, [ageYears, ageMonths, setAgeError]);

    if (ageError) {
        return <p id='age-validator'>{ageError}</p>;
    }

    if (ageYears && ageMonths) {
        return <p id='age-validator'>Age set to: {ageYears}{' '}{ageYears === 1 ? `year` : `years`}, {ageMonths}{' '}{ageMonths === 1 ? `month ` : `months `}old.</p>;
    }

    if (ageYears) {
        return <p id='age-validator'>Age set to: {ageYears}{' '}{ageYears === 1 ? `year ` : `years `}old.</p>;
    }

    return <p id='age-validator'>Age set to: {ageMonths}{' '}{ageMonths === 1 ? `month ` : `months `}old.</p>;

}

export default ValidateDogProfileAge;