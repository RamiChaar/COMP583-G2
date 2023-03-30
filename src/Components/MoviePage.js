import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'
import CastList from './MoviePageComponents/CastList.js';
import CrewList from './MoviePageComponents/CrewList.js';  

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

  useEffect(() => {

    let newMovie = {
      id: movieData.emsId,
      trailer: movieData.trailer?.url,
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
          headShot: actor.headShotImage?.url,
        };
      }),
      crew: movieData.crew?.map(member => {
        return {
          id: uuidv4(),
          name: member.name,
          role: member.role,
          headShot: member.headShotImage?.url,
        };
      }),
    }

    console.log(newMovie)
    setMovie(newMovie);
  }, [movieData])

  useEffect(() => {
    createMovieObject();
  }, [])


  function getGenreString() {
    let str = "Genre: ";

    movie.genres?.forEach(genre => {
      str += genre + ", ";
    })

    return str.substring(0, str.length -2);
  }

  function handleBack() {
    navigate('/');
  }

  return (
    <div className='moviePage'>
      <div className='movieHeader'>
      <i className='backHome fa fa-angle-left fa-2x' onClick={handleBack}></i>
      </div>
      <div className='movieInfo'>
        <video className='trailer' width='640' height='360' controls>
          <source src={movie.trailer} type='video/webm'/>
        </video>
        <h2 className='title'>{movie.title}</h2>
        <h5 className='rating'>{movie.rating}</h5>
        <h5 className='length'>{`${Math.floor(movie.duration/60)}h ${movie.duration%60}min`}</h5>
        <div className='tomatoRatingDiv'>
          <img className='tomatoRatingIcon' src={movie.tomatoRatingObj?.tomatoRatingImg} alt=""/>
          <p className="tomatoRating">{movie.tomatoRatingObj?.tomatoRating}</p>
        </div>
        <div className='userRatingDiv'>
          <img className='userRatingIcon' src={movie.userRatingObj?.userRatingImg} alt=""/>
          <p className="userRating">{movie.userRatingObj?.userRating}</p>
        </div>
        
        <h6 className='summary'>{movie.summary}</h6>
        <h5 className='genre'>{getGenreString()}</h5>
        <h5 className='releaseDate'>{movie.releaseDate}</h5>
        <h4 className='castTitle'>Cast:</h4>
        <CastList className='castList' castList={movie.cast}></CastList>
        <h4 className='crewTitle'>Crew:</h4>
        <CrewList className='crewList' crewList={movie.crew}></CrewList>
      </div>
      <div className='showTimes'></div>
    </div>
  );
};
  
export default MoviePage;