import React from 'react';
import PropTypes from 'prop-types';

const ForwardGeocodeResult = (props) => {
    const { 
        result, 
        setMarkerCoordinates, 
    } = props;

    // Sets map marker to coordinates that match the selected address displayed in results
    const handleClick = () => {
        const { lat, lon } = result;
        setMarkerCoordinates({
            lat,
            lon,
        });
    }

    if (!result.display_name) {
        return (
            <li>
                <p>Error: Check your connection and try again.</p>
            </li>
        );
    }

    return (
        <li>
            <p>{result.display_name}</p>
            <button 
                className='ForwardGeocodeResult__button button'
                type='button' 
                onClick={handleClick}
            >
                Select
            </button>
        </li>
    );
}

ForwardGeocodeResult.defaultProps = {
    result: {
        display_name: '',
        lat: 0,
        lon: 0,
    },
    setMarkerCoordinates: () => {},
};

ForwardGeocodeResult.propTypes = {
    result: PropTypes.shape({
        display_name: PropTypes.string,
        lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        lon: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    setMarkerCoordinates: PropTypes.func.isRequired,
};

export default ForwardGeocodeResult;
