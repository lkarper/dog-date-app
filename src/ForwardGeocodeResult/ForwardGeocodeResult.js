import React from 'react';

const ForwardGeocodeResult = (props) => {
    const { result, setMarkerCoordinates, setHidden } = props;

    const handleClick = (event) => {
        const { lat, lon } = result;
        setMarkerCoordinates({
            lat,
            lon
        });
    }

    return (
        <li>
            <p>{result.display_name}</p>
            <button type='button' onClick={handleClick}>Select</button>
        </li>
    )
}

export default ForwardGeocodeResult;