import React, { useState, useEffect } from 'react';
import './SelectDogForHowl.css';

const SelectDogForHowl = (props) => {

    const { dog, dogsForHowl, updateDogsForHowl } = props;

    const [checked, setChecked] = useState(dogsForHowl.includes(dog.id));

    useEffect(() => {

        if (checked === true && !dogsForHowl.includes(dog.id)) {
            updateDogsForHowl(dog.id, checked);
        } else if (checked === false && dogsForHowl.includes(dog.id)) {
            updateDogsForHowl(dog.id, checked);
        }

    }, [checked, dog.id, dogsForHowl, updateDogsForHowl]);

    return (
        <div
            className='SelectDogForHowl__outer-container'
        >
            <input 
                className='SelectDogForHowl__checkbox'
                type="checkbox" 
                id={dog.id} 
                name={dog.id} 
                value={dog.id}
                aria-label={dog.name}
                checked={checked}
                aria-describedby='dogs-validation'
                onChange={() => setChecked(!checked)}
            />  
            <label 
                className='SelectDogForHowl__label'    
                htmlFor={dog.id}
            >
                <div
                    className='SelectDogForHowl__label-container'
                >
                    {dog.name}
                <img 
                    className='SelectDogForHowl__img'
                    src={dog.profile_img_url}
                    alt={`Avatar for the dog named ${dog.name}`}
                />
                </div>
            </label>
        </div>
    );
}

export default SelectDogForHowl;