import React from 'react';

const ForwardGeocodeResult = (props) => {
    const { result, setMarkerCoordinates } = props;

    const handleClick = () => {
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