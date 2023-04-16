import React, {useState, useEffect} from "react";
import {useNavigate, useLocation} from 'react-router-dom';
import { ReactComponent as Logo } from '../Resources/logo.svg';
import Footer from './FooterComponents/Footer';
import Login from './UserPageComponents/Login';
import SignUp from './UserPageComponents/SignUp';

const UserPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let [haveAccount, setHaveAccount] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleToLogin() {
    setHaveAccount(true)
  }

  function handleToSignUp() {
    setHaveAccount(false)
  }

  function handleBack() {
    navigate(location.state.prevRouter, location.state.prevState);
  }

  return (
    <div className='userPage'>
      <div className='header'>
        <i className='backHome fa fa-angle-left fa-lg' onClick={handleBack}></i>
        <Logo className='logo'/>
      </div>

      {false ? "" :
      <div className="userSetup">
        {haveAccount ? <Login handleToSignUp={handleToSignUp}/> : <SignUp handleToLogin={handleToLogin}/>}
      </div>
      }

      <div className='userPageBody'>
      </div>

      <Footer/>
    </div>
  );
};
  
export default UserPage;