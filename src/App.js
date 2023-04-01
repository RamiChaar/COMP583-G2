import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './Styling/homePage.css';
import './Styling/moviePage.css';
import './Styling/userPage.css';
import './Styling/header.css';
import './Styling/MoviePreviewList.css';
import './Styling/crewMembers.css';
import './Styling/castMembers.css';



import Home from "./Components/HomePage.js";
import Movie from "./Components/MoviePage.js";
import User from "./Components/UserPage.js";
  
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/movie" element={<Movie/>} />
          <Route path="/user" element={<User/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;