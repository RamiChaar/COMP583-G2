import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import SearchBar from './HomePageComponents/SearchBar';
import Footer from './FooterComponents/Footer';
import MoviePreviewList from './HomePageComponents/MoviePreviewList';
import useGeolocation from '../Hooks/useGeolocation.js';
import { ReactComponent as Logo } from '../Resources/logo.svg';
import TheaterPreviewList from './HomePageComponents/TheaterPreviewList';

const LOCAL_STORAGE_KEY_ADVTHEATERS = 'react-practice.advTheaters';
const LOCAL_STORAGE_KEY_MOVIES = 'react-practice.movies';
const LOCAL_STORAGE_KEY_DATE_TIME = 'react-practice.dateTime';


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
    const [newlyReleasedMoviePreviews, setNewlyReleasedMoviePreviews] = useState([]);
    const [highlyRatedMoviePreviews, setHighlyRatedMoviePreviews] = useState([]);
    const [lessKnownMoviePreviews, setLessKnownMoviePreviews] = useState([]);
  
    async function startFetching() {
      if(!location.loaded) {
        return;
      }
      if (location.hasOwnProperty('error')) {
        
        console.log(`error: ${location.error}`)
        console.log('using approximate location to fetch theaters...')
        let fetchTheatersURL = `https://flixster.p.rapidapi.com/theaters/list?radius=10`;
        let newTheaters = await fetchTheaters(fetchTheatersURL);
        setTheaters(newTheaters);
        return;
      } 
      let fetchTheatersURL = `https://flixster.p.rapidapi.com/theaters/list?latitude=${location.coordinates.lat}&longitude=${location.coordinates.lng}&radius=10`;
      let newTheaters = await fetchTheaters(fetchTheatersURL);
      setTheaters(newTheaters);
    }

    async function fetchTheaters(fetchTheatersURL) {
      console.log("fetching theater list... " + fetchTheatersURL)
      const response = await fetch(fetchTheatersURL, fetchOptions).catch(err => console.error(err));
      const json = await response.json();
      return json.data.theaters;
    }

    async function fetchAdvTheaters () {
      const batchSize = 4;
      const numBatches = Math.ceil(theaters.length / batchSize);
      const newAdvTheaters = [];
      for (let i = 0; i < numBatches; i++) {
        const batchStart = i * batchSize;
        const batchEnd = batchStart + batchSize;
        const batchTheaters = theaters.slice(batchStart, batchEnd);
        const promises = batchTheaters.map(async theater => {
          const fetchTheaterUrl = `https://flixster.p.rapidapi.com/theaters/detail?id=${theater.id}`;
          console.log("fetching theater... " + fetchTheaterUrl)
          return fetch(fetchTheaterUrl, fetchOptions)
            .then(response => response.json())
            .then(data => data.data.theaterShowtimeGroupings);
        });
        const batchNewAdvTheaters = await Promise.all(promises);
        newAdvTheaters.push(...batchNewAdvTheaters);
        setAdvTheaters(newAdvTheaters)
        if (i < numBatches - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      console.log('done')
    }

    function addTheaterDetails() {
      if(advTheaters.length > 0 && advTheaters[advTheaters.length - 1].hasOwnProperty('theaterData')){
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

    function createMovieList() {
      let newMovies = [];
      advTheaters.forEach(advTheater => {
        advTheater.movies.forEach(movie => {
          newMovies.push(movie);
        })
      });
      return newMovies;
    }

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
          releaseDate: movie.releaseDate,
          theaterCount: movies.reduce((accumulator, originalMovie) => {
            if(originalMovie.emsVersionId === movie.emsVersionId) {
              return accumulator + 1
            }
            return accumulator;
          }, 0)
        }
        newMoviePreviews.push(newMoviePreview);
      });
  
      return newMoviePreviews;
    }
  
    function createNewlyReleasedMoviePreviews() {
      let newNewlyReleasedMoviePreviews = moviePreviews.filter(movie => {
        let releaseDate = new Date(movie.releaseDate);
        let now = new Date();
        let diffInDays = Math.floor((now.getTime() - releaseDate.getTime()) / (1000 * 60 * 60 * 24));

        return diffInDays <= 7;
      })

      newNewlyReleasedMoviePreviews.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));

      return newNewlyReleasedMoviePreviews;
    }

    function createHighlyRatedMoviePreviews() {
      let newHighlyRatedMoviePreviews = moviePreviews.filter(movie => {
        let releaseDate = new Date(movie.releaseDate);
        let now = new Date();
        let diffInDays = Math.floor((now.getTime() - releaseDate.getTime()) / (1000 * 60 * 60 * 24));

        return movie?.tomatoRatingObj?.state === 'certified' && movie?.userRatingObj?.state === 'red' && diffInDays < 365;
      })

      newHighlyRatedMoviePreviews.sort((a, b) => (b?.tomatoRatingObj?.tomatometer + b?.userRatingObj?.dtlLikedScore)/2 - (a?.tomatoRatingObj?.tomatometer + a?.userRatingObj?.dtlLikedScore)/2)
      
      return newHighlyRatedMoviePreviews;
    }

    function createLessKnownMoviePreviews() {
      let newLessKnownMoviePreviews = moviePreviews.filter(movie => {
        return (movie?.tomatoRatingObj?.state !== 'certified' && movie?.tomatoRatingObj?.tomatometer >= 75);
      })

      return newLessKnownMoviePreviews;
    } 

    useEffect(() => {
      if(theaters.length > 0){
        console.log("theater list: ");
        console.log(theaters);
        fetchAdvTheaters();
      }
    }, [theaters]);
  
    useEffect(() => {
      if(advTheaters.length < 1){
        return;
      }
      localStorage.setItem(LOCAL_STORAGE_KEY_ADVTHEATERS, JSON.stringify(advTheaters))
      const timeNow = new Date();
      localStorage.setItem(LOCAL_STORAGE_KEY_DATE_TIME, JSON.stringify(timeNow))
      addTheaterDetails();
      let newMovies = createMovieList();
      setMovies(newMovies);
    }, [advTheaters]);
  
    useEffect(() => {
      if(movies.length !== 0){
        let newMoviePreviews = createMoviePreviews();
        setMoviePreviews(newMoviePreviews);
      }
    }, [movies]);
  
    useEffect(() => {
      let newNewlyReleasedMoviePreviews = createNewlyReleasedMoviePreviews();
      setNewlyReleasedMoviePreviews(newNewlyReleasedMoviePreviews);
      let newHighlyRatedMoviePreviews = createHighlyRatedMoviePreviews();
      setHighlyRatedMoviePreviews(newHighlyRatedMoviePreviews);
      let newLessKnownMoviePreviews = createLessKnownMoviePreviews();
      setLessKnownMoviePreviews(newLessKnownMoviePreviews);
    }, [moviePreviews])
  
    useEffect(() => {
      resetStates();

      let storedAdvTheaters = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_ADVTHEATERS));
      let pastDate = new Date(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_DATE_TIME)));
      let currentDate = new Date()

      
      if(!pastDate) {
        startFetching();
        return;
      }

      let diffInMs = currentDate.getTime() - pastDate.getTime();
      let diffInHours = diffInMs / (1000 * 60 * 60);

      if (diffInHours < 0.5 && storedAdvTheaters) {
        setAdvTheaters(storedAdvTheaters);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY_ADVTHEATERS)
        localStorage.removeItem(LOCAL_STORAGE_KEY_MOVIES)
        localStorage.removeItem(LOCAL_STORAGE_KEY_DATE_TIME)
        
        startFetching();
      }

    }, [location]);

    function resetStates() {
      setTheaters([]);
      setAdvTheaters([]);
      setMovies([]);
      setMoviePreviews([]);
      setSearchKeyword('')
    }

    function logAllStates() {
      console.log('theaters:')
      console.log(theaters)

      console.log('advTheaters:')
      console.log(advTheaters)

      console.log('movies:')
      console.log(movies)

      console.log('moviePreviews:')
      console.log(moviePreviews)

    }

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
      logAllStates()
      let showTimesList = getShowTimes(movieId);
      navigate("/movie", {state: {id: movieId, showTimes: showTimesList, date: advTheaters.length > 0? advTheaters[0].displayDate : undefined}});
    }

    function handleTheaterClicked(theaterId) {
      let advTheater = advTheaters.find(theater => theater.theaterId === theaterId)
      navigate("/theater", {state: {advTheater: advTheater}});

    }
  
    function handleAccountClick() {
      navigate("/user");
    }

    function scrollLeft(divClass) {
      let scrollPane = document.querySelector(divClass);
      let scrollNum = scrollPane?.scrollLeft;

      scrollPane?.scroll({
        top: 0,
        left: scrollNum -= 800,
        behavior: "smooth",
      });
    }

    function scrollRight(divClass) {
      let scrollPane = document.querySelector(divClass);
      let scrollNum = scrollPane?.scrollLeft;

      scrollPane?.scroll({
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
          <Logo className='homeLogo logo'/>
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
          <div className='movieListDiv'>
            <h4 className="listHeader">New This Week:</h4>
            <i className="scrollBack fa fa-angle-left" onClick={() => scrollLeft('.newlyReleasedPreview')}></i>
            <i className="scrollForward fa fa-angle-right" onClick={() => scrollRight('.newlyReleasedPreview')}></i>
            <div className='previewsDiv newlyReleasedPreview'>
              <MoviePreviewList class='newlyReleasedList' moviePreviews={newlyReleasedMoviePreviews} handleMovieClicked={handleMovieClicked}/>
            </div>
          </div>

          <div className='movieListDiv'>
            <h4 className="listHeader">Highly Rated:</h4>
            <i className="scrollBack fa fa-angle-left" onClick={() => scrollLeft('.highlyRatedPreview')}></i>
            <i className="scrollForward fa fa-angle-right" onClick={() => scrollRight('.highlyRatedPreview')}></i>
            <div className='previewsDiv highlyRatedPreview'>
              <MoviePreviewList class='popularList' moviePreviews={highlyRatedMoviePreviews} handleMovieClicked={handleMovieClicked}/>
            </div>
          </div>

          <div className='movieListDiv'>
            <h4 className="listHeader">You Might Not Have Heard Of:</h4>
            <i className="scrollBack fa fa-angle-left" onClick={() => scrollLeft('.lessKnownPreview')}></i>
            <i className="scrollForward fa fa-angle-right" onClick={() => scrollRight('.lessKnownPreview')}></i>
            <div className='previewsDiv lessKnownPreview'>
              <MoviePreviewList class='lessKnownList' moviePreviews={lessKnownMoviePreviews} handleMovieClicked={handleMovieClicked}/>
            </div>
          </div>

          <div className='movieListDiv'>
            <h4 className="listHeader">All Playing Near you:</h4>
            <i className="scrollBack fa fa-angle-left" onClick={() => scrollLeft('.moviesNearYouPreview')}></i>
            <i className="scrollForward fa fa-angle-right" onClick={() => scrollRight('.moviesNearYouPreview')}></i>
            <div className='previewsDiv moviesNearYouPreview'>
              <MoviePreviewList class='moviesNearYouList' moviePreviews={moviePreviews} handleMovieClicked={handleMovieClicked}/>
            </div>
          </div>

          <div className='ListDiv'>
            <h4 className="listHeader">Theaters Near You:</h4>
            <i className="scrollBack fa fa-angle-left" onClick={() => scrollLeft('.theatersNearYouPreview')}></i>
            <i className="scrollForward fa fa-angle-right" onClick={() => scrollRight('.theatersNearYouPreview')}></i>
            <div className='theatersNearYouPreview'>
              <TheaterPreviewList class='theatersNearYouList' advTheaters={advTheaters} handleTheaterClicked={handleTheaterClicked} />
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
};
  
export default HomePage;