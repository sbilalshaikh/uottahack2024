import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import { fill } from 'lodash';

const bounds = { 
    
    width : '50%',
    height : '400px',
    margin : '2.5% auto 0',
    border: '3px solid #000000'

}

const center = {

    lat: 45.340186, 
    lng:-75.726175

}

const response = await fetch("http://localhost:8000/neighbourhood/get-all");

const GEO_JSON_DATA = await response.json();

const neighborhoods = GEO_JSON_DATA.neighbourhoods;

const GreaterMap = () => {

    const navigate = useNavigate();

    const mapRef = useRef(null);

    const onLoad = (map) => {

        mapRef.current = map;
        neighborhoods.forEach(element => {
            const feature = map.data.addGeoJson(element.geoJSON);
            const fillColor = element.color;
            map.data.setStyle(function(feature) {
                return {
                  fillColor: fillColor,
                  strokeWeight: 2,
                  strokeColor: "black",
                  fillOpacity: 0.5
                };
            });
        });

        // map.data.addGeoJson(KanataNorthGeoJSON);
        // map.data.addGeoJson(SandyHillGeoJSON);
        // map.data.addGeoJson(CarlingwoodGeoJSON);

        map.data.addListener('click' , (event) => {

            name = event.feature.getProperty('name');
            console.log(name);
            navigate(`/community/${name}`);

        })

    };


    const mapStyle = {

        width: '65%',
        height: '300px',
        margin: '0 auto', 
        padding: '20px',

    }



return (

    <div>

        <LoadScript
            async googleMapsApiKey="AIzaSyCygEHJWZdXCELGXxk9k7iarJMVJ2JWVU0" 
        >

            <GoogleMap 
            mapContainerStyle={bounds}
            center={center}
            zoom={10.9}
            onLoad={onLoad}
            style={mapStyle}

            >
            </GoogleMap>


        </LoadScript>



    </div>



    );


};


export default GreaterMap;
