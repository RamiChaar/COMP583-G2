import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'
import CastList from './MoviePageComponents/CastList.js';
import CrewList from './MoviePageComponents/CrewList.js'; 
import ShowTimesList from './MoviePageComponents/ShowTimesList';
import { ReactComponent as Logo } from '../Resources/logo.svg';
import Footer from './FooterComponents/Footer'

const LOCAL_STORAGE_KEY_MOVIES = 'react-practice.movies';

const fetchOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST
  }
};

const MoviePage = () => {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState([]);
  const [movie, setMovie] = useState([]);

  const location = useLocation();
  let movieState = location.state;

  async function fetchMovie(movieId) {
    let fetchMovieURL = `https://flixster.p.rapidapi.com/movies/detail?emsVersionId=${movieId}`;
    console.log('fetching movie... ' + fetchMovieURL)
    const response = await fetch(fetchMovieURL, fetchOptions).catch(err => console.error(err));
    const json = await response.json();
    return json.data.movie;
  }

  async function createMovieObject() {
    let newMovieData = await fetchMovie(movieState.id);
    setMovieData(newMovieData);
  }

  function getStoredMovie(storedMovies, movieId) {
    if(storedMovies === null) {
      return null;
    }
    let filteredMovies = storedMovies.filter(function(movie) {return movie.id === movieId});
    if(filteredMovies.length === 0) {
      return null;
    }

    return filteredMovies[0];
  }

  function isStored(storedMovies, movieId) {
    if(storedMovies === null) {
      return false;
    }

    let filteredMovies = storedMovies.filter(function(movie) {return movie.id === movieId});
    if(filteredMovies.length === 0) {
      return false;
    }

    return true;
  }

  function storeMovie(newMovie) {
    let storedMovies = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_MOVIES));
    if(storedMovies === null) {
      localStorage.setItem(LOCAL_STORAGE_KEY_MOVIES, JSON.stringify([newMovie]))
      return;
    }
    localStorage.setItem(LOCAL_STORAGE_KEY_MOVIES, JSON.stringify([...storedMovies, newMovie]))
  }

  useEffect(() => {
  }, [movie])

  useEffect(() => {
    let newMovie = {
      id: movieState.id,
      trailer: movieData.trailer?.url,
      poster: movieData.backgroundImage?.url,
      title: movieData.name,
      rating: movieData.motionPictureRating?.code,
      duration: movieData.durationMinutes,

      tomatoRatingObj: {
        tomatoRating: movieData.tomatoRating?.tomatometer,
        tomatoRatingImg: movieData.tomatoRating?.iconImage.url,
      },
      userRatingObj: {
        userRating: movieData.userRating?.dtlLikedScore,
        userRatingImg: movieData.userRating?.iconImage.url,
      },

      summary: movieData.synopsis,
      
      genres: movieData.genres?.map(genre => {
        return genre.name;
      }),

      releaseDate: movieData.releaseDate, 

      cast: movieData.cast?.map(actor => {
        return {
          id: uuidv4(),
          name: actor.name,
          characterName: actor.characterName,
          headShot: actor.headShotImage? actor.headShotImage.url : undefined,
        };
      }),
      crew: movieData.crew?.map(member => {
        return {
          id: uuidv4(),
          name: member.name,
          role: member.role,
          headShot: member.headShotImage? member.headShotImage.url : undefined,
        };
      }),
    }
    if(newMovie.title === undefined) {
      return;
    }

    let storedMovies = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_MOVIES));
    if(!isStored(storedMovies, movieState.id)) {
      storeMovie(newMovie);
    }

    setMovie(newMovie);
  }, [movieData])

  useEffect(() => {
    window.scrollTo(0, 0);
    let storedMovies = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_MOVIES));
    let storedMovie = getStoredMovie(storedMovies, movieState.id);
    if(storedMovie !== null) {
      setMovie(storedMovie);
    } else {
      createMovieObject();
    }

    window.addEventListener("resize", () => handleResizeFunction());
  }, [])


  function getGenreString() {
    let str = " ";

    movie.genres?.forEach(genre => {
      str += genre + ", ";
    })

    return str.substring(0, str.length -2);
  }

  function handleResizeFunction() {
    var windowWidth = window.innerWidth;
    let notSummary = document.querySelector('.notSummary');
    let summary = document.querySelector('.summary');
    let height = notSummary?.offsetHeight;
    if(windowWidth > 768 && summary !== null) {
      summary.style.height = `calc(calc(30vw - ${height}px) - 1.5rem)`;
    }
  }

  function handleBack() {
    navigate('/');
  }

  function castScrollLeft() {
    let scrollPane = document.querySelector(".castList");
    let scrollNum = scrollPane.scrollLeft;

    scrollPane.scroll({
      top: 0,
      left: scrollNum -= 400,
      behavior: "smooth",
    });
  }

  function castScrollRight() {
    let scrollPane = document.querySelector(".castList");
      let scrollNum = scrollPane.scrollLeft;

      scrollPane.scroll({
        top: 0,
        left: scrollNum += 400,
        behavior: "smooth",
      });
  }

  function crewScrollLeft() {
    let scrollPane = document.querySelector(".crewList");
      let scrollNum = scrollPane.scrollLeft;

      scrollPane.scroll({
        top: 0,
        left: scrollNum -= 400,
        behavior: "smooth",
      });
  }

  function crewScrollRight() {
    let scrollPane = document.querySelector(".crewList");
      let scrollNum = scrollPane.scrollLeft;

      scrollPane.scroll({
        top: 0,
        left: scrollNum += 400,
        behavior: "smooth",
      });
  }

  function handleAccountClick() {
    navigate("/user");
  }

  return (
    <div className='moviePage'>
      <div className='header'>
        <i className='backHome fa fa-angle-left fa-lg' onClick={handleBack}></i>
        <Logo className='logo'/>
        <svg className="accountIcon" viewBox="0 0 20 20"  onClick={handleAccountClick}>
          <path fill="hsl(0, 0%, 45%)" d="M14.023,12.154c1.514-1.192,2.488-3.038,2.488-5.114c0-3.597-2.914-6.512-6.512-6.512
              c-3.597,0-6.512,2.916-6.512,6.512c0,2.076,0.975,3.922,2.489,5.114c-2.714,1.385-4.625,4.117-4.836,7.318h1.186
              c0.229-2.998,2.177-5.512,4.86-6.566c0.853,0.41,1.804,0.646,2.813,0.646c1.01,0,1.961-0.236,2.812-0.646
              c2.684,1.055,4.633,3.568,4.859,6.566h1.188C18.648,16.271,16.736,13.539,14.023,12.154z M10,12.367
              c-2.943,0-5.328-2.385-5.328-5.327c0-2.943,2.385-5.328,5.328-5.328c2.943,0,5.328,2.385,5.328,5.328
              C15.328,9.982,12.943,12.367,10,12.367z"></path>
        </svg>
      </div>
      
      <div className='movieInfo'>
        <video className='trailer' poster={movie.poster} controls={movie.trailer === undefined ? '' : 'controls'}>
          <source src={movie.trailer !== undefined ? movie.trailer.replace(/^http:\/\//i, "https://") : undefined} type='video/mp4'/>
        </video>
        <div className='movieDetails'>
          <div className='notSummary'>
            <h3 className='title'>{movie.title}</h3>
            <h5 className='rating'>{(movie.rating === undefined? "" : `${movie.rating}, `) + `${Math.floor(movie.duration/60)}h ${movie.duration%60}min`}</h5>
            <img className='tomatoRatingIcon' src={movie.tomatoRatingObj?.tomatoRating == null ? null : movie.tomatoRatingObj?.tomatoRatingImg} alt=""/>
            <p className="newTomatoRating">{movie.tomatoRatingObj?.tomatoRating}{movie.tomatoRatingObj?.tomatoRating == null ? "" : "%"}</p>
            <div className='spacer'></div>
            <img className='userRatingIcon' src={movie.userRatingObj?.userRating == null ? null : movie.userRatingObj?.userRatingImg} alt=""/>
            <p className="newUserRating">{movie.userRatingObj?.userRating}{movie.userRatingObj?.userRating == null ? "" : "%"}</p>
            <br/>
            <p className='genreTitle'><b>Genre:</b></p>
            <p className='genre'>{getGenreString()}</p>
            <br/>
            <p className='releaseDateTitle'><b>Release Date:</b></p>
            <p className='releaseDate'>{` ${movie.releaseDate}`}</p>
          </div>
          <p className='summary'>{movie.summary}</p>  
        </div>
        <i className="castScrollLeft fa fa-angle-left fa-lg" style={{ color: movie?.cast?.length > 0 ? 'hsl(223, 12%, 6%)' : 'hsl(223, 12%, 24%)' }} onClick={castScrollLeft}></i>
        <i className="castScrollRight fa fa-angle-right fa-lg" style={{ color: movie?.cast?.length > 0 ? 'hsl(223, 12%, 6%)' : 'hsl(223, 12%, 24%)' }} onClick={castScrollRight}></i>
        <CastList castList={movie.cast}></CastList>
        <i className="crewScrollLeft fa fa-angle-left fa-lg" onClick={crewScrollLeft}></i>
        <i className="crewScrollRight fa fa-angle-right fa-lg" onClick={crewScrollRight}></i>
        <CrewList crewList={movie.crew}></CrewList>
      </div>
      <ShowTimesList showTimesList={movieState.showTimes} date={movieState.date}></ShowTimesList>
      <Footer/>
    </div>
  );
};
  
export default MoviePage;