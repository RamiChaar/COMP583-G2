import React, {useState, useEffect} from 'react';
// import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import SearchBar from './SearchBar';
import MoviePreviewList from './MoviePreviewList';
import useGeolocation from './Hooks/useGeolocation';

import './Styling/App.css';
import './Styling/SearchBar.css';
import './Styling/MoviePreviewList.css';

const LOCAL_STORAGE_KEY_ADVTHEATERS = 'react-practice.advTheaters';

const fetchOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST
  }
};

// learn react: https://reactjs.org
// multiPage tutorial: https://www.geeksforgeeks.org how-to-redirect-to-another-page-in-reactjs/

function App() {
  const location = useGeolocation();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [theaters, setTheaters] = useState([]);
  const [advTheaters, setAdvTheaters] = useState([]);
  const [movies, setMovies] = useState([]);
  const [moviePreviews, setMoviePreviews] = useState([]);

  function createMoviePreviews() {
    let reducedMovies = movies.reduce((accumulator, currentObject) => {
      const existingObject = accumulator.find(obj => obj.fandangoId === currentObject.fandangoId);
      if (!existingObject) {
        accumulator.push(currentObject);
      }
      return accumulator;
    }, []);

    let newMoviePreviews = [];

    reducedMovies.forEach(movie => {
      let newMoviePreview = {
        id: movie.emsVersionId,
        name: movie.name,
        durationMinutes: movie.durationMinutes,
        ratingObj: movie.motionPictureRating,
        tomatoRatingObj: movie.tomatoRating,
        userRatingObj: movie.userRating,
        posterImageObj: movie.posterImage,
      }
      newMoviePreviews.push(newMoviePreview);
    });

    return newMoviePreviews;
  }

  function createMovieList() {
    let newMovies = [];
    advTheaters.forEach(advTheater => {
      advTheater.movies.forEach(movie => {
        newMovies.push(movie);
      })
    });
    return newMovies;
  }

  async function fetchAdvTheaters () {

    let newAdvTheaters = [];
    for(let i = 0; i < theaters.length; i++) {
      let theater = theaters[i];
      let fetchTheaterUrl = `https://flixster.p.rapidapi.com/theaters/detail?id=${theater.id}`;
      console.log("fetching theater... " + fetchTheaterUrl)
      const response = await fetch(fetchTheaterUrl, fetchOptions).catch(err => console.error(err));
      const json = await response.json();
      newAdvTheaters.push(json.data.theaterShowtimeGroupings);
    }
    return newAdvTheaters;
  }

  async function fetchTheaters() {
    
    let fetchTheatersURL = `https://flixster.p.rapidapi.com/theaters/list?latitude=${location.lat}&longitude=${location.lng}&radius=10`;
    console.log("fetching theaters... " + fetchTheatersURL)
    const response = await fetch(fetchTheatersURL, fetchOptions).catch(err => console.error(err));
    const json = await response.json();
    return json.data.theaters;
  }

  async function startFetching() {
    let newTheaters = await fetchTheaters();
    setTheaters(newTheaters);
  }

  useEffect(() => {
    async function fetch() {
      let newAdvTheaters = await fetchAdvTheaters();
      setAdvTheaters(newAdvTheaters);
    }
    if(theaters.length !== 0){
      console.log("theater list: ");
      console.log(theaters);
      fetch();
    }
  }, [theaters]);

  useEffect(() => {
    if(advTheaters.length !== 0){
      console.log("adv theater details: ");
      console.log(advTheaters);
      localStorage.setItem(LOCAL_STORAGE_KEY_ADVTHEATERS, JSON.stringify(advTheaters))
      let newMovies = createMovieList();
      setMovies(newMovies);
    }
  }, [advTheaters]);

  useEffect(() => {
    if(movies.length !== 0){
      console.log("movie list: ");
      console.log(movies);
      let newMoviePreviews = createMoviePreviews();
      setMoviePreviews(newMoviePreviews);
    }
  }, [movies]);

  useEffect(() => {
    if(moviePreviews.length !== 0){
      console.log("movie previews: ");
      console.log(moviePreviews);
    }
  }, [moviePreviews])

  useEffect(() => {

    setTheaters([]);
    setAdvTheaters([]);
    setMovies([]);
    setMoviePreviews([]);

    let storedAdvTheaters = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_ADVTHEATERS));

    if(storedAdvTheaters){
      setAdvTheaters(storedAdvTheaters);
    } else {
      startFetching();
    }
    
  }, []);



  const updateSearchKeyword = (searchKeyword) => {
    setSearchKeyword(searchKeyword);
  }

  return (
    <div className='App'>
      <div className='header'>
        <SearchBar class='searchBar' searchKeyword={searchKeyword} onChange={updateSearchKeyword}/>
      </div>
      <div className='body'>
        <MoviePreviewList class='moviePreviewList' moviePreviews={moviePreviews}/>
      </div>
    </div>
  );
}


export default App;