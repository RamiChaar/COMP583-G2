import {useState, useEffect} from 'react';

const LOCAL_STORAGE_KEY_LOCATION = 'react-practice.location'

const useGeolocation = () => {
    const [location, setLocation] = useState({
        loaded: false, 
        coordinates: {lat: '', lng: ''}
    });

    const onSuccess = location => {
        let locationObj = {
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            }
        }
        setLocation(locationObj);
        localStorage.setItem(LOCAL_STORAGE_KEY_LOCATION, JSON.stringify(locationObj))
    }

    const onError = error => {
        setLocation({
            loaded: true,
            error: error.message,
        });
    }

    useEffect(() => {
        let storedLocation = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_LOCATION))
        if(storedLocation){
            setLocation(storedLocation);
            return;
        }
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported"
            });
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);


  return location;
}

export default useGeolocation;