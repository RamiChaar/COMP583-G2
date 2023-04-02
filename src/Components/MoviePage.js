import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'
import CastList from './MoviePageComponents/CastList.js';
import CrewList from './MoviePageComponents/CrewList.js'; 
import ShowTimesList from './MoviePageComponents/ShowTimesList';


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
  const [showtimeData, setShowtimeData] = useState([]);

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
    let height = notSummary.offsetHeight;
    if(windowWidth > 768) {
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

  return (
    <div className='moviePage'>
      <div className='movieHeader'>
      <i className='backHome fa fa-angle-left fa-2x' onClick={handleBack}></i>
      </div>
      <div className='movieInfo'>
        <video className='trailer' poster={movie.poster} controls={movie.trailer === undefined ? '' : 'controls'}>
          <source src={movie.trailer} type='video/mp4'/>
        </video>
        <div className='movieDetails'>
          <div className='notSummary'>
            <h3 className='title'>{movie.title}</h3>
            <h5 className='rating'>{(movie.rating === undefined? "" : `${movie.rating},`) + `${Math.floor(movie.duration/60)}h ${movie.duration%60}min`}</h5>
            <img className='tomatoRatingIcon' src={movie.tomatoRatingObj?.tomatoRating == null ? null : movie.tomatoRatingObj?.tomatoRatingImg} alt=""/>
            <p className="newTomatoRating">{movie.tomatoRatingObj?.tomatoRating}</p>
            <div className='spacer'></div>
            <img className='userRatingIcon' src={movie.userRatingObj?.userRating == null ? null : movie.userRatingObj?.userRatingImg} alt=""/>
            <p className="newUserRating">{movie.userRatingObj?.userRating}</p>
            <br/>
            <p className='genreTitle'><b>Genre:</b></p>
            <p className='genre'>{getGenreString()}</p>
            <br/>
            <p className='releaseDateTitle'><b>Release Date:</b></p>
            <p className='releaseDate'>{` ${movie.releaseDate}`}</p>
          </div>
          <p className='summary'>{movie.summary}</p>  
        </div>
        <i className="castScrollLeft fa fa-angle-left fa-lg" onClick={castScrollLeft}></i>
        <i className="castScrollRight fa fa-angle-right fa-lg" onClick={castScrollRight}></i>
        <CastList castList={movie.cast}></CastList>
        <i className="crewScrollLeft fa fa-angle-left fa-lg" onClick={crewScrollLeft}></i>
        <i className="crewScrollRight fa fa-angle-right fa-lg" onClick={crewScrollRight}></i>
        <CrewList crewList={movie.crew}></CrewList>
      </div>
      <ShowTimesList showTimesList={movieState.showTimes} date={movieState.date}></ShowTimesList>
    </div>
  );
};
  
export default MoviePage;