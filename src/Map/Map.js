import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import config from '../config';
import './Map.css';

const Map = (props) => {

    const [markerCoordinates, setMarkerCoordinates] = useState({});
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);

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
            center: [-73.9665, 40.7812],
            zoom: 12
        });

        setMap(map);

        const marker = new mapboxgl.Marker(markerRef, {
            draggable: true,
        })
            .setLngLat([-73.9665, 40.7812])
            .addTo(map);
        
        setMarker(marker);

        const onDragEnd = () => {
            const lngLat = marker.getLngLat();
            setMarkerCoordinates(lngLat);
        }

        marker.on('dragend', onDragEnd);

    }, [props]);


    return (
        <div className='Map__map-outer-container'>
            <div id='map-container' ref={el => setRefMap(el)} className='Map__map-container'>
            </div>
            <div className='Map__marker' ref={el => setRefMark(el)}></div>
            <div id='coordinates' className='Map__coordinates'>{Object.keys(markerCoordinates).length ? `Latitude: ${markerCoordinates.lat}, Longitude: ${markerCoordinates.lng}`  : ''}</div>
        </div>
    );
}

export default Map;