import React, {useState, useEffect} from 'react';
// import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import SearchBar from './SearchBar';
import MoviePreviewList from './MoviePreviewList';
import { v4 as uuidv4 } from 'uuid'
import './Styling/App.css';
import './Styling/SearchBar.css';
import './Styling/MoviePreviewList.css';
import useGeolocation from './Hooks/useGeolocation';

// api: https://developer.fandango.com/docs
// learn react: https://reactjs.org
// multiPage tutorial: https://www.geeksforgeeks.org/how-to-redirect-to-another-page-in-reactjs/

function App() {
  const location = useGeolocation();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [moviePreviews, setMoviePreviews] = useState([]);


  useEffect(() => {
    for(let i = 0; i < 5; i++){
      setMoviePreviews(prevMoviePreviews => {
        return [...prevMoviePreviews, {id: uuidv4(), name: `movie ${uuidv4()}`}]
      })
      }
  }, [])

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
      <div>
        {location.loaded ? JSON.stringify(location) : "location data not available"}
      </div>
    </div>
  );
}

export default App;