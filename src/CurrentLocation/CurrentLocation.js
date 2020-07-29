import React, { useEffect } from 'react';

const CurrentLocation = (props) => {
    
    const { coordinates, address, setLocationError } = props;

    useEffect(() => {
        if (address.trim().length) {
            setLocationError(null);
        } else {
            setLocationError('Address or location name required.') 
        }
    }, [address, setLocationError])

    if (address.trim().length) {
        return (
            <p id='current-location'>Location set to: {address} ({Object.keys(coordinates).length ? `${coordinates.lat}, ${coordinates.lon}` : 'No coordinates set'})</p>
        );
    }
    
    return <p id='current-location'>Enter a location above to set a meeting place. An address or location name is required; coordinates are optional.</p>;
    
}

export default CurrentLocation;