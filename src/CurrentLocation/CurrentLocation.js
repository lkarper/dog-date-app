import React from 'react';

const CurrentLocation = (props) => {
    
    const { coordinates } = props;

    return (
        <div role='alert'>
            <p id='current-set-coordinates'>
                {
                    Object.keys(coordinates).length 
                    ? `Coordinates set to: ${coordinates.lat}, ${coordinates.lon}.` 
                    : 'No coordinates set (coordinates are optional).'
                }
            </p>
        </div>
    );
}

export default CurrentLocation;