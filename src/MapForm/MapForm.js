import React, { useState } from 'react';
import Map from '../Map/Map';
import CurrentLocation from '../CurrentLocation/CurrentLocation';
import './MapForm.css';

const MapForm = (props) => {
    const { coordinates, setCoordinates } = props;

    const [tempCoordinates, setTempCoordinates] = useState(coordinates);

    return (
        <fieldset 
            className='MapForm__coordinates-fieldset sub-fieldset'
        >
            <legend>Set coordinates for your meeting here</legend>
            <p>Using this feature will make it easier for others to find the location you set, but it is not required.</p>
            <Map 
                tempCoordinates={tempCoordinates} 
                setTempCoordinates={setTempCoordinates} 
            />
            <button 
                className='MapForm__set-coordinates-button button'
                type='button' 
                onClick={() => setCoordinates(tempCoordinates)}
            >
                Set meeting place to above coordinates
            </button>
            <CurrentLocation 
                coordinates={coordinates}
            />
        </fieldset>
    );
}

export default MapForm;
