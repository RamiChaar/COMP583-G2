import {useState, useEffect} from 'react';

const LOCAL_STORAGE_KEY_LOCATION = 'react-practice.location'
const LOCAL_STORAGE_KEY_DATE_TIME = 'react-practice.dateTime';
const LOCAL_STORAGE_KEY_ADVTHEATERS = 'react-practice.advTheaters';
const LOCAL_STORAGE_KEY_MOVIES = 'react-practice.movies';

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
        localStorage.removeItem(LOCAL_STORAGE_KEY_ADVTHEATERS)
        localStorage.removeItem(LOCAL_STORAGE_KEY_MOVIES)
        localStorage.removeItem(LOCAL_STORAGE_KEY_DATE_TIME)
        setLocation(locationObj);
        localStorage.setItem(LOCAL_STORAGE_KEY_LOCATION, JSON.stringify(locationObj))
    }

    const onError = error => {
        setLocation({
            loaded: true,
            error: error.message,
        });
    }

    function requestLocation() {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported"
            });
        } else {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }
    }

    function establishLocation() {
        let storedLocation = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_LOCATION))
        let pastDate = new Date(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_DATE_TIME)));
        let currentDate = new Date()

        if(!pastDate) {
            requestLocation()
            return;
        }

        let diffInMs = currentDate.getTime() - pastDate.getTime();
        let diffInHours = diffInMs / (1000 * 60 * 60);

        if (diffInHours < 10.5 && storedLocation) {
            setLocation(storedLocation);
            return;
        } else {
            requestLocation();
        }
    }

    useEffect(() => {
        establishLocation();
    }, []);


  return location;
}

export default useGeolocation;