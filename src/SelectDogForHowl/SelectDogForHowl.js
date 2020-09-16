import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './SelectDogForHowl.css';

const SelectDogForHowl = (props) => {

    const { 
        dog, 
        dogsForHowl, 
        updateDogsForHowl 
    } = props;

    const [checked, setChecked] = useState(dogsForHowl.includes(dog.id));

    useEffect(() => {

        if (checked === true && !dogsForHowl.includes(dog.id)) {
            updateDogsForHowl(dog.id, checked);
        } else if (checked === false && dogsForHowl.includes(dog.id)) {
            updateDogsForHowl(dog.id, checked);
        }

    }, [checked, dog.id, dogsForHowl, updateDogsForHowl]);

    if (!dog.id) {
        return (
            <div
                className='SelectDogForHowl__outer-container error'
            >
                <p>Error: something went wrong. Check your connection and the URL and try again.</p>
            </div>
        );
    }

    return (
        <div
            className='SelectDogForHowl__outer-container'
        >
            <input 
                className='SelectDogForHowl__checkbox checkbox'
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
                    {dog.profile_img_url 
                            ?
                                <img
                                    className='SelectDogForHowl__img' 
                                    src={dog.profile_img_url} 
                                    alt={`Avatar of the dog named ${dog.name}.`} 
                                />
                            :
                                <img
                                    className='SelectDogForHowl__img' 
                                    src='/images/photo_not_available.png'
                                    alt={`Avatar of the dog named ${dog.name} not available.`} 
                                />
                    }
                </div>
            </label>
        </div>
    );
}

SelectDogForHowl.defaultProps = {
    dog: {
        id: '',
        name: '',
        profile_img_url: '',
    }, 
    dogsForHowl: [], 
    updateDogsForHowl: () => {}, 
};

SelectDogForHowl.propTypes = {
    dog: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
        profile_img_url: PropTypes.string,
    }),
    dogsForHowl: PropTypes.array.isRequired,
    updateDogsForHowl: PropTypes.func.isRequired,
};

export default SelectDogForHowl;
