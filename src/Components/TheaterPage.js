import React, {useEffect, useState} from 'react';
import { ReactComponent as Logo } from '../Resources/logo.svg';
import {useNavigate, useLocation} from 'react-router-dom';
import ShowTimesList from './MoviePageComponents/ShowTimesList';
import Footer from './FooterComponents/Footer';
import PurchaseTickets from './MoviePageComponents/PurchaseTickets';
import {useJsApiLoader} from '@react-google-maps/api';
import axios from 'axios';

const LOCAL_STORAGE_KEY_USER_CREDENTIALS = 'cinema-scouter.userCredentials';

const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY
const libraries = ['places']

const TheaterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let advTheater = location.state.advTheater;
  let [address, setAddress] = useState('')
  let [isFavorite, setIsFavorite] = useState(false)
  const [purchaseTicketInfo, setPurchaseTicketInfo] = useState({})
  const [popUp, setPopUp] = useState(false)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleApiKey,
    libraries: libraries
  });

  useEffect(()=>{
    window.scrollTo(0, 0);
    const addFavoriteElements = document.querySelectorAll('.addFavorite, .addFavoriteText');

    addFavoriteElements.forEach(element => {
      element.addEventListener('mouseover', () => {
        addFavoriteElements.forEach(el => {
          el.style.color = 'hsl(217, 71%, 43%)';
        });
      });

      element.addEventListener('mouseout', () => {
        addFavoriteElements.forEach(el => {
          el.style.color = 'hsl(217, 71%, 53%)';
        });
      });
    });

    checkInFavorites()

  }, [])

  useEffect(()=>{
    if(!isLoaded){
      return
    }
    const request = {
      query: advTheater?.theaterData?.name,
      fields: ['name', 'formatted_address']
    };
    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    service.findPlaceFromQuery(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setAddress(results[0].formatted_address.replace(", United States", ""))
      }
    });
  }, [isLoaded])

  async function checkInFavorites() {
    let storedUserCredentials = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_USER_CREDENTIALS));
    if(!storedUserCredentials) {
      return
    }

    let favoriteTheaterPostData = {
      email: storedUserCredentials.email,
      password: storedUserCredentials.password,
      theaterId: advTheater.theaterId,
    }

    await axios.post(`${process.env.REACT_APP_HOST}/users/isFavorite`, favoriteTheaterPostData)
    .then(res => {
      if(res.data.isFavorite === true){
        setIsFavorite(true)
      }
    })
    .catch(err => console.log(err))
  }

  async function handleRemoveFavorite() {
    let storedUserCredentials = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_USER_CREDENTIALS));
    if(!storedUserCredentials) {
      return
    }

    let favoriteTheaterPostData = {
      email: storedUserCredentials.email,
      password: storedUserCredentials.password,
      theaterId: advTheater.theaterId,
    }

    await axios.post(`${process.env.REACT_APP_HOST}/users/removeFavorite`, favoriteTheaterPostData)
    .then(res => {
      if(res.status === 200){
        setIsFavorite(false)
      }
    })
    .catch(err => console.log(err))
  }

  async function handleAddFavorite() {
    let storedUserCredentials = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_USER_CREDENTIALS));
    if(!storedUserCredentials) {
      return
    }

    let favoriteTheaterPostData = {
      email: storedUserCredentials.email,
      password: storedUserCredentials.password,
      theaterId: advTheater.theaterId,
      theaterName: advTheater.theaterData.name
    }

    await axios.post(`${process.env.REACT_APP_HOST}/users/addFavorite`, favoriteTheaterPostData)
    .then(res => {
      if(res.status === 200){
        setIsFavorite(true)
      }
    })
    .catch(err => console.log(err))
  }

  function handleBack() {
    navigate(location.state.prevRouter, location.state.prevState);
  }

  function handleAccountClick() {
    if(location.state.prevRouter === "/user") {
      navigate("/user", {state: {prevRouter: '/', prevState: location.state.prevState.state}});
    } else {
      navigate("/user", {state: {prevRouter: "/theater", prevState: location}});
    }
  }

  function handleMovieClicked(movieId) {
    let movie = advTheater.movies.find(movie => movie.emsVersionId === movieId);
    navigate("/movie", {state: {id: movieId, showTimes: movie.showTimesList, date: advTheater.displayDate, isNested: true, prevRouter: "/theater", prevState: location}});
  }

  async function handleShowtimeClicked(showTime, movieVariant, movie) {
    
    let amenities = movieVariant.amenityGroups.find(group =>{ 
      return group.showtimes.some(showtime => {return showtime.id === showTime.id})
    }).amenities

    let newPurchaseTicketInfo = {
      showTimeId: showTime.id,
      movieId: movie.emsVersionId,
      theaterId: advTheater.theaterId,
      movieName: movie.name,
      duration: movie.durationMinutes,
      theaterName: advTheater.theaterData.name,
      formatName: movieVariant.formatName,
      showingTime: showTime.providerTime,
      showingDate: showTime.providerDate,
      amenities: amenities
    }

    setPurchaseTicketInfo(newPurchaseTicketInfo)
    document.body.style.overflow = "hidden";
    setPopUp(true)
  }

  function handleClosePopup() {
    setPurchaseTicketInfo({})
    document.body.style.overflow = "auto";
    setPopUp(false)
  }

  function goHome() {
    window.scrollTo(0, 0);
    console.log('here')
    navigate('/', {state: {}});
  }

  return (
    <div className='theaterPage'>
      <div className='header'>
        <i className='backHome fa fa-angle-left fa-lg' onClick={handleBack}></i>
        <Logo className='logo' onClick={goHome}/>
        <svg className="accountIcon" viewBox="0 0 20 20"  onClick={handleAccountClick}>
          <path fill="hsl(0, 0%, 45%)" d="M14.023,12.154c1.514-1.192,2.488-3.038,2.488-5.114c0-3.597-2.914-6.512-6.512-6.512
              c-3.597,0-6.512,2.916-6.512,6.512c0,2.076,0.975,3.922,2.489,5.114c-2.714,1.385-4.625,4.117-4.836,7.318h1.186
              c0.229-2.998,2.177-5.512,4.86-6.566c0.853,0.41,1.804,0.646,2.813,0.646c1.01,0,1.961-0.236,2.812-0.646
              c2.684,1.055,4.633,3.568,4.859,6.566h1.188C18.648,16.271,16.736,13.539,14.023,12.154z M10,12.367
              c-2.943,0-5.328-2.385-5.328-5.327c0-2.943,2.385-5.328,5.328-5.328c2.943,0,5.328,2.385,5.328,5.328
              C15.328,9.982,12.943,12.367,10,12.367z"></path>
        </svg>
      </div>

      {popUp ? <PurchaseTickets purchaseTicketInfo={purchaseTicketInfo} address={address}handleClosePopup={handleClosePopup}/> : ""}

      <div className='theaterInfo'>
        <div className='theaterInfoTitle'>
          <h2 className='theaterName'>{advTheater?.theaterData?.name}</h2>
          <div className='addFavoritesDiv'>{isFavorite ?
            <><i className='addFavorite fa fa-star' onClick={handleRemoveFavorite}> </i><p className="addFavoriteText" onClick={handleRemoveFavorite}>Remove from Favorites</p></>:
            <><i className='addFavorite fa fa-star-o' onClick={handleAddFavorite}> </i><p className="addFavoriteText" onClick={handleAddFavorite}>Add to Favorites</p></>}

          </div>
        </div>
        <p className='theaterAddress'>{address}</p>
      </div>
      {advTheater?.movies === undefined || advTheater?.movies?.length === 0 ? "" :
      <ShowTimesList showTimesList={advTheater.movies} date={advTheater.displayDate} handleMovieClicked={handleMovieClicked} handleShowtimeClickedInTheater={handleShowtimeClicked} isNested={location.state.isNested}></ShowTimesList>
      }
      <Footer/>
    </div>
  );
};
  
export default TheaterPage;