import React, {useState, useEffect} from "react";
import {useNavigate, useLocation} from 'react-router-dom';
import { ReactComponent as Logo } from '../Resources/logo.svg';
import Footer from './FooterComponents/Footer';
import Login from './UserPageComponents/Login';
import SignUp from './UserPageComponents/SignUp';
import axios from 'axios';

const LOCAL_STORAGE_KEY_USER_CREDENTIALS = 'cinema-scouter.userCredentials';


const fetchOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST
  }
};

const UserPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [haveAccount, setHaveAccount] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)
  const [userData, setUserData] = useState({})
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);

    let storedUserCredentials = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_USER_CREDENTIALS));

    if(storedUserCredentials) {
      validateStoredUserCredentials(storedUserCredentials)
    }

  }, []);

  async function validateStoredUserCredentials(userCredentials) {
    let email = userCredentials.email
    let password = userCredentials.password

    let isValid = false
    let user = {
      email: email,
      password: password
    }
    await axios.post(`${process.env.REACT_APP_HOST}/users/login`, user)
    .then(res => {
        if(res.data === "Success"){
          isValid = true
        }
    })

    if(isValid) {
      setLoggedIn(true)
      getUserData(userCredentials)
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY_USER_CREDENTIALS)
    }
  }

  async function getUserData(userCredentials) {
    let email = userCredentials.email
    let password = userCredentials.password

    let user = {
      email: email,
      password: password
    }

    await axios.post(`${process.env.REACT_APP_HOST}/users/`, user)
    .then(res => {
        if(res.status === 200){
          setUserData(res.data)
        }
    })
  }

  function handleToLogin() {
    setHaveAccount(true)
  }

  function handleToSignUp() {
    setHaveAccount(false)
  }

  function handleLogin() {
    let storedUserCredentials = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_USER_CREDENTIALS));
    getUserData(storedUserCredentials)
    setLoggedIn(true)
  }

  function handleBack() {
    navigate(location.state.prevRouter, location.state.prevState);
  }

  function handleLogOut() {
    setLoggedIn(false)
    localStorage.removeItem(LOCAL_STORAGE_KEY_USER_CREDENTIALS)
  }

  async function handleDeleteAccount() {
    console.log(userData)
    //delete account
    
  }

  async function getAdvTheater(theaterId) {
    const fetchTheaterUrl = `https://flixster.p.rapidapi.com/theaters/detail?id=${theaterId}`;
        console.log("fetching theater... " + fetchTheaterUrl)
        return fetch(fetchTheaterUrl, fetchOptions)
          .then(response => response.json())
          .then(data => data.data.theaterShowtimeGroupings);
  }

  async function handleTheaterClicked(theaterId, theaterName) {
    setIsDisabled(true)
    let advTheater = await getAdvTheater(theaterId)
    setIsDisabled(false)
    let newAdvTheater = {...advTheater, theaterData: {name: theaterName}}
    navigate("/theater", {state: {advTheater: newAdvTheater, isNested: true, prevRouter: '/user', prevState: location}});
  }

  async function handleDeleteTheater(theaterId) {
    let storedUserCredentials = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_USER_CREDENTIALS));
    if(!storedUserCredentials) {
      return
    }

    let favoriteTheaterPostData = {
      email: storedUserCredentials.email,
      password: storedUserCredentials.password,
      theaterId: theaterId,
    }

    await axios.post(`${process.env.REACT_APP_HOST}/users/removeFavorite`, favoriteTheaterPostData)
    .then(res => {
      if(res.status === 200){
        getUserData(storedUserCredentials)
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='userPage'>
      {!isDisabled ? "" : <div className="overlay"/>}

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

          <div className="userPageHeader">
            <div className="accountSummary">
              <p className="userName">{userData?.email?.split("@")[0]}</p>
              <p className="joinedLabel">Joined {userData?.dateCreated}</p>
            </div>
              <button className='logOut' onClick={handleLogOut}>Log Out</button>
          </div>

          <div className="userDataDiv">
            <div className="favoriteTheatersDiv">
            <p className="favoriteTheatersLabel">Your Favorite Theaters</p>
              {userData?.favoriteTheaters?.map(theater => {
                return <div className="favoriteTheater" key={theater.theaterId}>
                        <p className="theaterName" onClick={() => handleTheaterClicked(theater.theaterId, theater.theaterName)}>{theater.theaterName}</p>
                        <i className="trashButton fa fa-trash" aria-hidden="true" onClick={() => handleDeleteTheater(theater.theaterId)}></i>
                      </div>
              })}
            </div>

            <div className="ticketsDiv">
              <div className="ticketsDivHeader">

              </div>
            </div>

          </div>

          <button className='deleteAccount' onClick={handleDeleteAccount}>Delete Account</button>
        </div>
      }

      <Footer/>
    </div>
  );
};
  
export default UserPage;