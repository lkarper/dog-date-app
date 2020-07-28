import React, { useState } from 'react';
import Map from '../Map/Map';
import ForwardGeocodeAddress from '../ForwardGeocodeAddress/ForwardGeocodeAddress';
import './MapForm.css';

const MapForm = (props) => {
    const { setCoordinates } = props;

    const [tempCoordinates, setTempCoordinates] = useState({});

    return (
        <fieldset>
            <legend>Set coordinates for your meeting here</legend>
            <p>Using this feature will make it easier for others to find the location you set, but it is not required.</p>
            <Map tempCoordinates={tempCoordinates} setTempCoordinates={setTempCoordinates} />
            <button type='button' onClick={() => setCoordinates(tempCoordinates)}>Set above coordinates to my location</button>
        </fieldset>
    );
}

export default MapForm;