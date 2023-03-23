import React, {useState} from 'react';
// import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import SearchBar from './SearchBar';
import MoviePreviewList from './MoviePreviewList';
import { v4 as uuidv4 } from 'uuid'
import './Styling/App.css';
import './Styling/SearchBar.css';
import './Styling/MoviePreviewList.css';

// api: https://developer.fandango.com/docs
// learn react: https://reactjs.org
// multiPage tutorial: https://www.geeksforgeeks.org/how-to-redirect-to-another-page-in-reactjs/

function App() {
  const [searchKeyword, setSearchKeyword] = useState('');

  const updateSearchKeyword = (searchKeyword) => {
    setSearchKeyword(searchKeyword);
  }

  let moviePreviews = [{id: uuidv4(), name:'movie1'}, {id: uuidv4(), name:'movie2'}, {id: uuidv4(), name:'movie3'}];

  
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