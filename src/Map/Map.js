import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import ForwardGeocodeAddress from '../ForwardGeocodeAddress/ForwardGeocodeAddress';
import config from '../config';
import './Map.css';

const Map = (props) => {
    const { 
        tempCoordinates, 
        setTempCoordinates, 
    } = props;

    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [markerCoordinates, setMarkerCoordinates] = useState(tempCoordinates);

    let mapContainer = useRef(null);
    let markerRef = useRef(null);

    const setRefMap = (el) => {
        mapContainer = el;
    }

    const setRefMark = (el) => {
        markerRef = el;
    }

    const setMarkerToMyLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setMarkerCoordinates({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude 
                });
            }, 
            (error) => window.alert(`Error: ${error.message}`),
            { 
                enableHighAccuracy: true,
                timeout: 5000,
            }
        );
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

        // Resets location coordinates when the draggable marker has been dragged
        const onDragEnd = () => {
            const lngLat = marker.getLngLat();
            setMarkerCoordinates({ lat: lngLat.lat, lon: lngLat.lng });
        }

        if (marker) {
            marker.on('dragend', onDragEnd);
        }

    }, [props.setTempCoordinates, markerCoordinates.lat, markerCoordinates.lon]);

    useEffect(() => {
        if (marker) {
            map.setCenter([markerCoordinates.lon, markerCoordinates.lat]);
            marker.setLngLat([markerCoordinates.lon, markerCoordinates.lat]).addTo(map);
            setMarker(marker);

            // Resets location coordinates when the draggable marker has been dragged
            const onDragEnd = () => {
                const lngLat = marker.getLngLat();
                setMarkerCoordinates({ lat: lngLat.lat, lon: lngLat.lng });
            }

            if (marker) {
                marker.on('dragend', onDragEnd);
            }

            // Resets the temporary coordinates to equal those of the map marker
            if (tempCoordinates.lat !== markerCoordinates.lat && tempCoordinates.lon !== markerCoordinates.lon) {
                const { lat, lon } = markerCoordinates;
                setTempCoordinates({
                    lon,
                    lat
                });
            }
        }
    }, [markerCoordinates, tempCoordinates, setTempCoordinates, map, marker])


    return (
        <div className='Map__search-container'>
            <div className='Map__map-outer-container'>
                <ForwardGeocodeAddress setMarkerCoordinates={setMarkerCoordinates} />
                <div id='map-container' ref={el => setRefMap(el)} className='Map__map-container'>
                </div>
                <div className='Map__marker' ref={el => setRefMark(el)}></div>
                <div id='coordinates' className='Map__coordinates'>Latitude: {markerCoordinates.lat}, Longitude: {markerCoordinates.lon}</div>
            </div>
            <button 
                className='Map__set-marker-button button'
                type='button' 
                onClick={setMarkerToMyLocation}
            >
                Set marker to my location
            </button>
            <p className='Map__marker-draggable-p'>(Marker is draggable.)</p>
        </div>
    );
}

Map.defaultProps = {
    tempCoordinates: {
        lat: 0,
        lon: 0,
    },
    setTempCoordinates: () => {},
};

Map.propTypes = {
    tempCoordinates: PropTypes.shape({
        lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        lon: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    setTempCoordinates: PropTypes.func.isRequired,
};

export default Map;
