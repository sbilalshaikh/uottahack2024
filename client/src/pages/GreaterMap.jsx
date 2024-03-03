import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Loader } from "@googlemaps/js-api-loader";

const response = await fetch("http://localhost:8000/neighbourhood/get-all");

const GEO_JSON_DATA = await response.json();

const bounds = {
    width: '50%',
    height: '400px',
    margin: '2.5% auto 0',
    border: '3px solid #000000'
}

const center = {
    lat: 45.340186,
    lng: -75.726175
}

const GreaterMap = () => {
    const navigate = useNavigate();
    const mapRef = useRef(null);

    useEffect(() => {
        const loader = new Loader({
            apiKey: 'AIzaSyCygEHJWZdXCELGXxk9k7iarJMVJ2JWVU0',
            version: 'weekly', // Change this to your desired version
        });

        loader.load().then(() => {
            const map = new window.google.maps.Map(mapRef.current, {
                center: center,
                zoom: 10.9,
                mapId: 'uOttaHacks6', // Change this to your desired map ID
            });

            // Load your neighborhoods here using fetch and addGeoJson
            const neighborhoods = GEO_JSON_DATA.neighbourhoods;
            // Example:
            neighborhoods.forEach(element => {
                const feature = map.data.addGeoJson(element.geoJSON);
                const fillColor = element.color;
                map.data.setStyle(function(feature) {
                    return {
                        fillColor: fillColor,
                        strokeWeight: 2,
                        strokeColor: "black",
                        fillOpacity: 0.8
                    };
                });
            });

            map.data.addListener('click', (event) => {
                const name = event.feature.getProperty('name');
                console.log(name);
                navigate(`/community/${name}`);
            });
        });
    }, [navigate]);

    const mapStyle = {
        width: '65%',
        height: '300px',
        margin: '0 auto',
        padding: '20px',
    }

    return (
        <div>
            <div ref={mapRef} style={bounds}></div>
        </div>
    );
};

export default GreaterMap;
