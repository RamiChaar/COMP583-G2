import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './Styling/HomePage.css';
import './Styling/MoviePage.css';
import './Styling/UserPage.css';
import './Styling/TheaterPage.css';
import './Styling/InfoPage.css';
import './Styling/Header.css';
import './Styling/Footer.css';
import './Styling/MoviePreviewList.css';
import './Styling/TheaterPreviewList.css';
import './Styling/CastCrewMembers.css';
import './Styling/ShowTimes.css';

import Home from "./Components/HomePage.js";
import Movie from "./Components/MoviePage.js";
import User from "./Components/UserPage.js";
import Theater from "./Components/TheaterPage.js";
import Info from "./Components/InfoPage.js"
  
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/movie" element={<Movie/>} />
          <Route path="/theater" element={<Theater/>} />
          <Route path="/user" element={<User/>} />
          <Route path="/info" element={<Info/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;