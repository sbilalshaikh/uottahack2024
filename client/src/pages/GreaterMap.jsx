import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Loader } from "@googlemaps/js-api-loader";

const response = await fetch("http://localhost:8000/neighbourhood/get-all");

const GEO_JSON_DATA = await response.json();

const bounds = {
    width: '50%',
    height: '500px',
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
            version: 'weekly', 
        });

        loader.load().then(() => {
            const map = new window.google.maps.Map(mapRef.current, {
                center: center,
                zoom: 11.2,
                mapId: 'uOttaHacks6',
            });

            const infoWindow = new window.google.maps.InfoWindow();

            const neighborhoods = GEO_JSON_DATA.neighbourhoods;
        
            neighborhoods.forEach(element => {
                element.geoJSON.properties.ndvi = parseFloat(element.ndvi).toFixed(3);
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
            // Add event listener for hover over feature
            map.data.addListener('mouseover', (event) => {
                infoWindow.setContent(`Neighborhood: ${event.feature.getProperty('name')}<br>NDVI: ${event.feature.getProperty('ndvi')}`);
                infoWindow.setPosition(event.latLng);
                infoWindow.open(map);
            });

            // Close info window when mouse leaves the feature
            map.data.addListener('mouseout', () => {
                infoWindow.close();
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
    
    const textSectionStyle = {
        width: '35%',
        padding: '20px',
        backgroundColor: '#f2f2f2',
    };

    return (
        <div>
            <div style={bounds}>
                <div ref={mapRef} style={mapStyle}></div>
                <div style={textSectionStyle}>
                    <h2>Understanding NDVI</h2>
                    <p>NDVI (Normalized Difference Vegetation Index) is a measure of vegetation health and density. It is calculated from the difference between near-infrared (which vegetation strongly reflects) and red light (which vegetation absorbs) that is captured by satellites or other remote sensing devices. NDVI values range from -1 to 1, with higher values indicating healthier and denser vegetation.</p>
                    <h3>How to Use the Map</h3>
                    <p>Hover over a neighborhood to see its name and NDVI value. Click on a neighborhood to explore more details.</p>
                </div>
            </div>
        </div>
    );
};

export default GreaterMap;
