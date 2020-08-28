import React, { useEffect } from 'react';

const ValidateDogProfileEnergy = (props) => {

    const { energy, energyError, setEnergyError } = props;

    useEffect(() => {
        if (energy) {
            setEnergyError('');
        } else {
            setEnergyError(`You must select your dog's energy level.`);
        }
    }, [energy, setEnergyError]);

    if (energy) {
        return <p id='energy-validator'>Energy set to: '{energy}'</p>;
    }

    return <p id='energy-validator'>{energyError}</p>;
}

export default ValidateDogProfileEnergy;
