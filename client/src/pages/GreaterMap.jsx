import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript } from '@react-google-maps/api'

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


const KanataNorthGeoJSON = {
    "type": "Feature",
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-75.93388889, 45.34277778],
            [-75.93083333, 45.34500000],
            [-75.91527778, 45.35388889],
            [-75.90055556, 45.34611111],
            [-75.89305556, 45.33250000],
            [-75.91861111, 45.33694444],
            [-75.93361111, 45.34250000],
            [-75.93388889, 45.34277778]
        ]]
    },
    "properties": {
        "name": "Kanata North"
    }
};

const SandyHillGeoJSON = {
    "type": "Feature",
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-75.66777778, 45.42111111],
            [-75.66694444, 45.42000000],
            [-75.66611111, 45.41972222],
            [-75.66416667, 45.41861111],
            [-75.66388889, 45.41694444],
            [-75.67805556, 45.41833333],
            [-75.68861111, 45.42250000],
            [-75.68638889, 45.42388889],
            [-75.68555556, 45.42527778],
            [-75.68750000, 45.42777778],
            [-75.67333333, 45.43388889],
            [-75.67222222, 45.43361111],
            [-75.67222222, 45.43111111],
            [-75.67194444, 45.42805556],
            [-75.66888889, 45.42416667],
            [-75.66777778, 45.42111111]
        ]]
    },
    "properties": {
        "name": "Sandy Hill"
    }
};


const CarlingwoodGeoJSON = {
    "type": "Feature",
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-75.73250000, 45.37333333],
            [-75.73083333, 45.36527778],
            [-75.74000000, 45.36138889],
            [-75.74861111, 45.37583333],
            [-75.73972222, 45.38361111],
            [-75.72722222, 45.38916667],
            [-75.71944444, 45.37666667],
            [-75.72111111, 45.37611111],
            [-75.73250000, 45.37333333]
        ]]
    },
    "properties": {
        "name": "Carlingwood"
    }
};





const GreaterMap = () => {

    const navigate = useNavigate();

    const mapRef = useRef(null);

    const onLoad = (map) => {

        mapRef.current = map;

        map.data.addGeoJson(KanataNorthGeoJSON);
        map.data.addGeoJson(SandyHillGeoJSON);
        map.data.addGeoJson(CarlingwoodGeoJSON);

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
