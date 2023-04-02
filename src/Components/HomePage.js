import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import SearchBar from './HomePageComponents/SearchBar';
import MoviePreviewList from './HomePageComponents/MoviePreviewList';
import useGeolocation from '../Hooks/useGeolocation.js';

const LOCAL_STORAGE_KEY_ADVTHEATERS = 'react-practice.advTheaters';

const fetchOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST
  }
};

const HomePage = () => {
    const navigate = useNavigate();
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

    function addTheaterDetails() {
      if(advTheaters.length > 0 && advTheaters[0].hasOwnProperty('theaterData')){
        return;
      }
      let newAdvTheaters = [];
      advTheaters.forEach((advTheater) => {
        theaters.forEach((theater) => {
          if(advTheater.theaterId === theater.id) {
            let newAdvTheater = {...advTheater, theaterData: {name: theater.name, distance: theater.distance}}
            newAdvTheaters.push(newAdvTheater);
          }
        });
      });      
      setAdvTheaters(newAdvTheaters);
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
      let fetchTheatersURL = `https://flixster.p.rapidapi.com/theaters/list?latitude=${location.coordinates.lat}&longitude=${location.coordinates.lng}&radius=10`;
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
        localStorage.setItem(LOCAL_STORAGE_KEY_ADVTHEATERS, JSON.stringify(advTheaters))
        addTheaterDetails();
        console.log("adv theater details: ");
        console.log(advTheaters);
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
      if(!location.loaded) {
        return;
      }

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
      
    }, [location]);

    function getShowTimes(movieId) {
      let showTimesList = [];
      advTheaters.forEach(theater => {
        theater.movies.forEach(movie => {
          if(movie.emsVersionId === movieId) {
            let showTimeObject = {
              id: theater.theaterId,
              name: theater.theaterData.name,
              distance: theater.theaterData.distance,
              movieVariants: movie.movieVariants,
            }
            showTimesList.push(showTimeObject);
          }
        });
      });

      return showTimesList;
    }
  
    function handleMovieClicked(movieId) {
      let showTimesList = getShowTimes(movieId);
      console.log()
      navigate("/movie", {state: {id: movieId, showTimes: showTimesList, date: advTheaters.length > 0? advTheaters[0].displayDate : undefined}});
    }
  
    function handleAccountClick() {
      navigate("/user");
    }

    function scrollLeft() {
      let scrollPane = document.querySelector(".previewsDiv");
      let scrollNum = scrollPane.scrollLeft;

      scrollPane.scroll({
        top: 0,
        left: scrollNum -= 800,
        behavior: "smooth",
      });
    }

    function scrollRight() {
      let scrollPane = document.querySelector(".previewsDiv");
      let scrollNum = scrollPane.scrollLeft;

      scrollPane.scroll({
        top: 0,
        left: scrollNum += 800,
        behavior: "smooth",
      });
    }

    const updateSearchKeyword = (searchKeyword) => {
      setSearchKeyword(searchKeyword);
    }

    return (
      <div className='homePage'>
        <div className='header'>
          <SearchBar class='searchBar' searchKeyword={searchKeyword} onChange={updateSearchKeyword}/>
          <svg className="accountIcon" viewBox="0 0 20 20"  onClick={handleAccountClick}>
            <path fill="hsl(0, 0%, 45%)" d="M14.023,12.154c1.514-1.192,2.488-3.038,2.488-5.114c0-3.597-2.914-6.512-6.512-6.512
                c-3.597,0-6.512,2.916-6.512,6.512c0,2.076,0.975,3.922,2.489,5.114c-2.714,1.385-4.625,4.117-4.836,7.318h1.186
                c0.229-2.998,2.177-5.512,4.86-6.566c0.853,0.41,1.804,0.646,2.813,0.646c1.01,0,1.961-0.236,2.812-0.646
                c2.684,1.055,4.633,3.568,4.859,6.566h1.188C18.648,16.271,16.736,13.539,14.023,12.154z M10,12.367
                c-2.943,0-5.328-2.385-5.328-5.327c0-2.943,2.385-5.328,5.328-5.328c2.943,0,5.328,2.385,5.328,5.328
                C15.328,9.982,12.943,12.367,10,12.367z"></path>
             </svg>
        </div>
        <div className='body'>
          <div className='nearYouDiv'>
            <h4 className="nearYouHeader">Showing Near you:</h4>
            <div className='nearYouSection'>
              <i className="scrollBack fa fa-angle-left fa-lg" onClick={scrollLeft}></i>
              <i className="scrollForward fa fa-angle-right fa-lg" onClick={scrollRight}></i>
              <MoviePreviewList class='nearYouList' moviePreviews={moviePreviews} handleMovieClicked={handleMovieClicked}/>
            </div>
          </div>
        </div>
      </div>
    );
};
  
export default HomePage;