import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ForwardGeocodeResult from '../ForwardGeocodeResult/ForwardGeocodeResult';
import config from '../config';
import NativeClickListener from '../utils/NativeClickListener';
import './ForwardGeocodeAddress.css';

const ForwardGeocodeAddress = (props) => {
    const { setMarkerCoordinates } = props;

    const [results, setResults] = useState([]);
    const [search, setSearch] = useState('');
    const [hidden, setHidden] = useState(true);
    const [apiError, setApiError] = useState(false);

    useEffect(() => {
        setHidden(true);
    }, [props]);

    useEffect(() => {

        // Searches for an address and its coordinates based on user input
        const handleSearch = () => {
            const query = encodeURIComponent(search);
            const key = config.mapbox_key;
            setApiError(false);

            fetch(`https://us1.locationiq.com/v1/search.php?key=${key}&q=${query}&format=json`)
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    throw new Error (res.statusText);
                })
                .then(res => {
                    setHidden(false);
                    setResults(res);
                })
                .catch(error => {
                    console.log(error);
                    setApiError(true);
                });
        }

        // Delays api call until the user stops typing for 2 seconds
        if (search) {
            const timeout = setTimeout(handleSearch, 2000);
            return () => clearTimeout(timeout);
        }
    }, [search, setResults]);

    // Displays drop-down results again if the user clicks inside the input search box
    const handleFocus = (event) => {
        if (results.length) {
            setHidden(false);
        }
    }

    return (
        <div
            aria-live='polite' 
            className='ForwardGeocodeAddress__outer-container'
        >
            <input 
                className='ForwardGeocodeAddress__search-input'
                type='text' 
                id='place-search' 
                name='place-search'
                placeholder='Search by name or address'
                aria-describedby='current-set-coordinates'
                aria-label='Search for a place by name or address.'
                value={search}
                onFocus={handleFocus}
                onChange={(e) => setSearch(e.target.value)} 
            />
            {/* 
                NativeClickListener fires a callback passed as the onClick prop if a user clicks 
                outside of NativeClickListener and its children.  Here, it closes the dropdown
                search results box if the user clicks outside of it.  
            */}
            <NativeClickListener
                id='ForwardGeocodeAddress__click-container'
                className={`ForwardGeocodeAddress__click-container ${hidden ? 'hidden' : ''}`}
                onClick={() => setHidden(true)}
            >
                <ol className={`ForwardGeocodeAddress__results ${hidden ? 'hidden' : ''}`}>
                    {results.map(result => 
                        <ForwardGeocodeResult 
                            key={result.place_id} 
                            result={result} 
                            setMarkerCoordinates={setMarkerCoordinates} 
                            setHidden={setHidden}
                        />
                    )}
                </ol>
            </NativeClickListener>
            <div role='alert'>
                {apiError && <p>Error: Looks like something went wrong. Please check your connection and try again.</p>}
            </div>
        </div>
    );
}

ForwardGeocodeAddress.defaultProps = {
    setMarkerCoordinates: () => {},
};

ForwardGeocodeAddress.propTypes = {
    setMarkerCoordinates: PropTypes.func.isRequired,
};

export default ForwardGeocodeAddress;
