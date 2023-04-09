import React, {useEffect} from 'react';
import { ReactComponent as Logo } from '../Resources/logo.svg';
import {useNavigate, useLocation} from 'react-router-dom';
import ShowTimesList from './MoviePageComponents/ShowTimesList';
import Footer from './FooterComponents/Footer';

const TheaterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let advTheater = location.state.advTheater;


  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [])

  function handleBack() {
    navigate('/');
  }

  function handleAccountClick() {
    navigate("/user");
  }

  function handleMovieClicked(movieId) {
    let movie = advTheater.movies.find(movie => movie.emsVersionId === movieId);
    navigate("/movie", {state: {id: movieId, showTimes: movie.showTimesList, date: advTheater.displayDate}});
  }

  return (
    <div className='theaterPage'>
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
      <div className='theaterInfo'>
        <h2 className='theaterName'>{advTheater?.theaterData?.name}</h2>
        <p className='theaterDistance'>{Math.floor((advTheater?.theaterData?.distance)*100)/100} mi</p>
      </div>
      <ShowTimesList showTimesList={advTheater.movies} date={advTheater.displayDate} handleMovieClicked={handleMovieClicked}></ShowTimesList>
      <Footer/>
    </div>
  );
};
  
export default TheaterPage;