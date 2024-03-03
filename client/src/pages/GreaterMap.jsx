import React, { useRef, useEffect  } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleMap, LoadScript } from '@react-google-maps/api'

const bounds = { 
    
    width : '50%',
    height : '400px'

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


const GreaterMap = () => {

    const history = useHistory();

    const mapRef = useRef(null);

    const onLoad = (map) => {

        mapRef.current = map;

        map.data.addGeoJson(KanataNorthGeoJSON);
        map.data.addGeoJson(SandyHillGeoJSON);

    };

    map.data.addListener('click' , (event) => {

        name = event.feature.getProperty('name');
        history.push(`/community/${name}`)

    })

    return (
    <LoadScript
        async googleMapsApiKey="AIzaSyCygEHJWZdXCELGXxk9k7iarJMVJ2JWVU0" 
    >
        <GoogleMap
        mapContainerStyle={bounds}
        center={center}
        zoom={10.9}
        onLoad={onLoad}
        >
        </GoogleMap>

    </LoadScript>


    );


};


export default GreaterMap;
