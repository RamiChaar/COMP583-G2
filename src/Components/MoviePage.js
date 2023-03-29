import React from "react";
import {useLocation} from 'react-router-dom';
  
const MoviePage = () => {
    const location = useLocation();
    let movieState = location.state;

  return (
    <div>
      <h1>{movieState.id}</h1>
    </div>
  );
};
  
export default MoviePage;