import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import config from '../config';
import './StaticMap.css';

const StaticMap = (props) => {

    const { lat, lon } = props;

    let mapContainer = useRef(null);
    let markerRef = useRef(null);

    const setRefMap = (el) => {
        mapContainer = el;
    }

    const setRefMark = (el) => {
        markerRef = el;
    }

    useEffect(() => {

        const locationiqKey = config.mapbox_key;

        const map = new mapboxgl.Map({
            container: mapContainer,
            attributionControl: false,
            style: `https://tiles.locationiq.com/v2/streets/vector.json?key=${locationiqKey}`,
            center: [lon, lat],
            zoom: 12
        });

        const marker = new mapboxgl.Marker(markerRef)
            .setLngLat([lon, lat])
            .addTo(map);

    }, [lat, lon]);

    return (
        <div className='StaticMap__outer-container'>
            <div 
                id='map-container' 
                ref={el => setRefMap(el)} 
                className='StaticMap__map-container'
            ></div>
            <div 
                className='StaticMap__marker' 
                ref={el => setRefMark(el)}
            ></div>
        </div>
    );
}

export default StaticMap;