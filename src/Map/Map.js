import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import config from '../config';
import './Map.css';

const Map = (props) => {

    let mapContainer = useRef(null);

    const setRef = (el) => {
        mapContainer = el;
    }

    useEffect(() => {

        mapboxgl.accessToken = config.mapbox_key;

        const map = new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-73.9665, 40.7812],
            zoom: 5
        });

        const marker = new mapboxgl.Marker()
            .setLngLat([-73.9665, 40.7812])
            .addTo(map);

    }, [props]);

    return (
        <div className='Map__map-outer-container'>
            <div id='map-container' ref={el => setRef(el)} className='Map__map-container'>
            </div>
        </div>
    );
}

export default Map;