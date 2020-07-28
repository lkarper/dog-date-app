import React, { useEffect } from 'react';

const CurrentLocation = (props) => {
    
    const { coordinates, address } = props;

    if (address) {
        return (
            <p>Location set to: {address} ({Object.keys(coordinates).length ? `${coordinates.lat}, ${coordinates.lon}` : 'No coordinates set'})</p>
        )
    }

    return <p>Enter a location above to set a meeting place.</p>;
}

export default CurrentLocation;