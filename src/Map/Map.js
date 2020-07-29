import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import ForwardGeocodeAddress from '../ForwardGeocodeAddress/ForwardGeocodeAddress';
import config from '../config';
import './Map.css';

const Map = (props) => {

    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [markerCoordinates, setMarkerCoordinates] = useState({ lat: 40.7812, lon: -73.9665 });

    let mapContainer = useRef(null);
    let markerRef = useRef(null);

    const setRefMap = (el) => {
        mapContainer = el;
    }

    const setRefMark = (el) => {
        markerRef = el;
    }

    const setMarkerToMyLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {

            setMarkerCoordinates({
                lat: position.coords.latitude,
                lon: position.coords.longitude 
            });
        });
    }

    useEffect(() => {

        const locationiqKey = config.mapbox_key;

        const map = new mapboxgl.Map({
            container: mapContainer,
            attributionControl: false,
            style: `https://tiles.locationiq.com/v2/streets/vector.json?key=${locationiqKey}`,
            center: [markerCoordinates.lon, markerCoordinates.lat],
            zoom: 12
        });

        setMap(map);

        const marker = new mapboxgl.Marker(markerRef, {
            draggable: true,
        })
            .setLngLat([markerCoordinates.lon, markerCoordinates.lat])
            .addTo(map);
        
        setMarker(marker);

        const onDragEnd = () => {
            const lngLat = marker.getLngLat();
            setMarkerCoordinates({ lat: lngLat.lat, lon: lngLat.lng });
        }

        marker.on('dragend', onDragEnd);

    }, [props.setTempCoordinates]);

    useEffect(() => {
        if (marker) {
            map.setCenter([markerCoordinates.lon, markerCoordinates.lat]);
            marker.setLngLat([markerCoordinates.lon, markerCoordinates.lat]).addTo(map);
            setMarker(marker);

            const onDragEnd = () => {
                const lngLat = marker.getLngLat();
                setMarkerCoordinates({ lat: lngLat.lat, lon: lngLat.lng });
            }

            marker.on('dragend', onDragEnd);

            if (props.tempCoordinates.lat !== markerCoordinates.lat && props.tempCoordinates.lon !== markerCoordinates.lon) {
                console.log('lower')
                const { lat, lon } = markerCoordinates;
                props.setTempCoordinates({
                    lon,
                    lat
                });
            }
        }
    }, [markerCoordinates, props.tempCoordinates, props.setTempCoordinates])


    return (
        <div className='MapForm__container'>
            <div className='Map__map-outer-container'>
                <button type='button' onClick={setMarkerToMyLocation}>Set marker to my location</button>
                <div id='map-container' ref={el => setRefMap(el)} className='Map__map-container'>
                </div>
                <div className='Map__marker' ref={el => setRefMark(el)}></div>
                <div id='coordinates' className='Map__coordinates'>Latitude: {markerCoordinates.lat}, Longitude: {markerCoordinates.lon}</div>
            </div>
            <ForwardGeocodeAddress setMarkerCoordinates={setMarkerCoordinates} />
        </div>
    );
}

export default Map;