import React, {useState} from 'react';
// import {Router, Switch, Route, Redirect} from 'react-router-dom';
import './Styling/App.css';
import SearchBar from './SearchBar';


// api: https://developer.fandango.com/docs
// learn react: https://reactjs.org

function App() {
  const [keyword, setKeyword] = useState('');

  const updateKeyword = (keyword) => {
    setKeyword(keyword);
 }


  return (
    <div className='App'>
      <div className='header'>
        <SearchBar keyword={keyword} onChange={updateKeyword}/>
      </div>
      <div className='body'>
        
      </div>
    </div>
  );
}

export default App;
