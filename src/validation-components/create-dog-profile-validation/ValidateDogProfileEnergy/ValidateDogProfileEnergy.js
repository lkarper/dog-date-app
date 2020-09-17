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
        return (
            <p 
                className='ValidateDogProfileEnergy__validator valid'
                id='energy-validator'
            >
                Energy set to: '{energy}'
            </p>
        );
    }

    return (
        <p 
            className='ValidateDogProfileEnergy__validator error'            
            id='energy-validator'
        >
            {energyError}
        </p>
    );
}

export default ValidateDogProfileEnergy;
