import React from 'react';
import './CurrentLocation.css';

const CurrentLocation = (props) => {
    
    const { coordinates } = props;

    return (
        <div 
            className='CurrentLocation__alert-div'
            role='alert'
        >
            <p id='current-set-coordinates'>
                {
                    coordinates.lat !== 0 || coordinates.lon !== 0
                        ? 
                            <>
                                <span>Coordinates set to:{' '}</span>
                                <br /> 
                                <span>Lat: {coordinates.lat}</span>
                                <br />
                                <span>Lon: {coordinates.lon}</span>
                            </>
                        : 
                            'No coordinates set (coordinates are optional).'
                }
            </p>
        </div>
    );
}

export default CurrentLocation;
