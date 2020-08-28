import React, { useState, useEffect } from 'react';
import ValidateAddress from '../validation-components/create-howl-validation/ValidateAddress';
import ValidateCity from '../validation-components/create-howl-validation/ValidateCity';
import StateSelector from '../StateSelector/StateSelector';
import ValidateState from '../validation-components/create-howl-validation/ValidateState';
import ValidateZipCode from '../validation-components/create-howl-validation/ValidateZipCode';
import './LocationForm.css';

const LocationForm = (props) => {

    const { setLocation, setLocationError, location } = props;

    const [address, setAddress] = useState(location.address);
    const [addressError, setAddressError] = useState('');
    const [city, setCity] = useState(location.city);
    const [cityError, setCityError] = useState('');
    const [state, setState] = useState(location.state);
    const [stateError, setStateError] = useState('');
    const [zipcode, setZipcode] = useState(location.zipcode);
    const [zipcodeError, setZipcodeError] = useState('');

    useEffect(() => {
        const errorsArray = [];

        if (addressError) {
            errorsArray.push(addressError);
        }
        
        if (cityError) {
            errorsArray.push(cityError);
        }

        if (stateError) {
            errorsArray.push(stateError);
        }

        if (zipcodeError) {
            errorsArray.push(zipcodeError);
        }

        setLocationError(errorsArray);

    }, [addressError, cityError, stateError, zipcodeError, setLocationError]);

    useEffect(() => {
        setLocation({
            address,
            city,
            state,
            zipcode
        });
    }, [address, city, state, zipcode, setLocation]);

    return (
        <fieldset className='LocationForm__fieldset'>
            <legend>Enter the location for your meeting place here</legend>
            <div>
                <label htmlFor='address'>Location or street address:</label>
                <input 
                    type="text" 
                    id="address" 
                    name="address"
                    value={address}
                    aria-describedby='address-validator'
                    onChange={(e) => setAddress(e.target.value)} 
                    required
                />
            </div>
            <div role='alert'>
                <ValidateAddress 
                    address={address}
                    addressError={addressError}
                    setAddressError={setAddressError}
                />
            </div>
            <div>
                <label htmlFor='city'>City:</label>
                <input 
                    type='text'
                    id='city'
                    name='city'
                    value={city}
                    aria-describedby='city-validator'
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
            </div>
            <div role='alert'>
                <ValidateCity 
                    city={city}
                    cityError={cityError}
                    setCityError={setCityError}
                />
            </div>
            <StateSelector 
                propState={state}
                setState={setState}
            />
            <div role='alert'>
                <ValidateState 
                    state={state}
                    stateError={stateError}
                    setStateError={setStateError}
                />
            </div>
            <div>
                <label htmlFor='zipcode'>ZIP code:</label>
                <input 
                    type='text'
                    id='zipcode'
                    name='zipcode'
                    value={zipcode}
                    aria-describedby='zipcode-validator'
                    onChange={(e) => setZipcode(e.target.value)}
                    required
                />
            </div>
            <div role='alert'>
                <ValidateZipCode 
                    zipcode={zipcode}
                    zipcodeError={zipcodeError}
                    setZipcodeError={setZipcodeError}
                />
            </div>
        </fieldset>
    );
}

export default LocationForm;
