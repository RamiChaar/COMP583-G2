import React, {useState, useEffect} from "react";
import {useNavigate, useLocation} from 'react-router-dom';
import { ReactComponent as Logo } from '../Resources/logo.svg';
import Footer from './FooterComponents/Footer';
import Login from './UserPageComponents/Login';
import SignUp from './UserPageComponents/SignUp';

const LOCAL_STORAGE_KEY_USER_CREDENTIALS = 'cinema-scouter.userCredentials';

const UserPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let [haveAccount, setHaveAccount] = useState(true)
  let [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0);

    let storedUserCredentials = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_USER_CREDENTIALS));

    if(storedUserCredentials && isAccountValid(storedUserCredentials)) {
      setLoggedIn(true)
    }

  }, []);

  function isAccountValid(userCredentials) {
    let username = userCredentials.username
    let password = userCredentials.password

    let isValid = true
    //validate account

    return isValid
  }


  function handleToLogin() {
    setHaveAccount(true)
  }

  function handleToSignUp() {
    setHaveAccount(false)
  }

  function handleLogin() {
    setLoggedIn(true)
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

      {loggedIn? "" :
        <div className="userSetup">
          {haveAccount ? <Login handleToSignUp={handleToSignUp} handleLogin={handleLogin}/> : <SignUp handleToLogin={handleToLogin}/>}
        </div>
      }

      {!loggedIn? "" :
        <div className='userPageBody'>
        </div>
      }

      <Footer/>
    </div>
  );
};
  
export default UserPage;