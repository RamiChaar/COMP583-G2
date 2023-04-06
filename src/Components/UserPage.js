import React from "react";
import {useNavigate} from 'react-router-dom';
import { ReactComponent as Logo } from '../Resources/logo.svg';
import Footer from './FooterComponents/Footer';


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
      <div className='userPageBody'>
        <h1>User Page</h1>
      </div>
      <Footer/>
    </div>
  );
};
  
export default UserPage;