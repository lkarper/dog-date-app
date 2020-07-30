import React, { useState, useEffect } from 'react';
import ForwardGeocodeResult from '../ForwardGeocodeResult/ForwardGeocodeResult';
import config from '../config';
import './ForwardGeocodeAddress.css';

const ForwardGeocodeAddress = (props) => {

    const { setMarkerCoordinates } = props;

    const [results, setResults] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {

        const handleSearch = () => {

            const query = encodeURIComponent(search);
            const key = config.mapbox_key;
            fetch(`https://us1.locationiq.com/v1/search.php?key=${key}&q=${query}&format=json`)
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    throw new Error (res.statusText);
                })
                .then(res => {
                    setResults(res);
                })
                .catch(error => {
                    console.log(error);
                });
        }

        if (search) {
            const timeout = setTimeout(handleSearch, 2000);
            return () => clearTimeout(timeout);
        }
    }, [search, setResults]);

    return (
        <div className='ForwardGeocodeAddress__outer-container'>
            <label htmlFor='place-search'>Search for a place by name or address:</label>
            <input 
                type="text" 
                id="place-search" 
                name="place-search"
                aria-describedby='current-set-coordinates'
                value={search}
                onChange={(e) => setSearch(e.target.value)} 
            />
            <div 
                className='ForwardGeocodeAddress__results'
                role='alert'
            >
                <ol>
                    {results.map(result => <ForwardGeocodeResult key={result.place_id} result={result} setMarkerCoordinates={setMarkerCoordinates} />)}
                </ol>
            </div>
        </div>
    )
}

export default ForwardGeocodeAddress;