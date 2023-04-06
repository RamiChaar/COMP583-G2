import React from "react";
  
import { ReactComponent as Logo } from '../Resources/logo.svg';
import {useNavigate} from 'react-router-dom';

const UserPage = () => {
  const navigate = useNavigate();


  function handleBack() {
    navigate('/');
  }

  return (
    <div className='userPage'>
      <div className='header'>
        <i className='backHome fa fa-angle-left fa-lg' onClick={handleBack}></i>
        <Logo className='logo'/>
        
      </div>
      <h1>User Page</h1>
    </div>
  );
};
  
export default UserPage;