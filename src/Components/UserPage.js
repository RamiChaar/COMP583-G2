import React, {useState, useEffect} from "react";
import {useNavigate, useLocation} from 'react-router-dom';
import { ReactComponent as Logo } from '../Resources/logo.svg';
import {v4 as uuidv4} from 'uuid';
import Footer from './FooterComponents/Footer';
import Login from './UserPageComponents/Login';
import SignUp from './UserPageComponents/SignUp';
import TicketPreview from './UserPageComponents/TicketPreview'
import TicketDisplay from './UserPageComponents/TicketDisplay'
import AdminDashboard from './UserPageComponents/AdminDashboard'
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
  const [filteredTickets, setFilteredTickets] = useState([])
  const [isDisabled, setIsDisabled] = useState(false)
  const [toggledLeft, setToggledLeft] = useState(true)
  const [pageLoaded, setPageLoaded] = useState(false)
  const [ticket, setTicket] = useState({})
  const [displayTicket, setDisplayTicket] = useState(false)
  const [deleteWindow, setDeleteWindow] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminView, setAdminView] = useState(false)
  const [analytics, setAnalytics] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";

    checkCredentials()
  }, []);
  
  useEffect(() => {
    userData?.tickets?.sort((a, b) => {
      const aDateTime = new Date(`${a.showingDate}T${a.showingTime}`);
      const bDateTime = new Date(`${b.showingDate}T${b.showingTime}`);
      return aDateTime - bDateTime;
    });
    userData?.tickets?.reverse()
    const now = new Date();
    const newFilteredTickets = userData?.tickets?.filter((item) => {
      const showingDateTime = new Date(`${item.showingDate}T${item.showingTime}`);
      const timeDiff = showingDateTime.getTime() - now.getTime();
      const hoursDiff = timeDiff / (1000 * 60 * 60);
      return hoursDiff >= -(item?.duration / 60);
    });
    setFilteredTickets(newFilteredTickets)

    if(userData?.isAdmin) {
      setIsAdmin(true)
      getAnalytics()
    }
  }, [userData])

  async function getAnalytics() {
    let storedUserCredentials = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_USER_CREDENTIALS));
    let email = storedUserCredentials.email
    let password = storedUserCredentials.password

    let user = {
      email: email,
      password: password
    }

    await axios.post(`${process.env.REACT_APP_HOST}/userAnalytics/getAnalytics`, user)
    .then(res => {
        if(res.status === 200){
          setAnalytics(res.data)
        }
    })
  }

  async function checkCredentials() {
    let storedUserCredentials = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_USER_CREDENTIALS));

    if(storedUserCredentials) {
      await validateStoredUserCredentials(storedUserCredentials)
    }
    setPageLoaded(true)
  }

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

  function handleDeleteAccountClicked() {
    setDeleteWindow(true)    
  }

  async function handleDoNotDelete() {
    setDeleteWindow(false)

    let userCredentials = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_USER_CREDENTIALS));
    let email = userCredentials.email
    let password = userCredentials.password
    let user = {
      email: email,
      password: password
    }
    await axios.post(`${process.env.REACT_APP_HOST}/userAnalytics/getAnalytics`, user)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
  }

  async function handleDeleteAccount() { 
    let userCredentials = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_USER_CREDENTIALS));
    let email = userCredentials.email
    let password = userCredentials.password

    let user = {
      email: email,
      password: password
    }

    await axios.post(`${process.env.REACT_APP_HOST}/users/delete`, user)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))

    localStorage.removeItem(LOCAL_STORAGE_KEY_USER_CREDENTIALS)
    setDeleteWindow(false)
    setLoggedIn(false)
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
    navigate("/theater", {state: {advTheater: newAdvTheater, isNested: false, prevRouter: '/user', prevState: location}});
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

  function handleToggleLeft() {
    if(!toggledLeft) {
      document.querySelector('.switchLeft').style.backgroundColor = 'hsl(223, 12%, 28%)'
      document.querySelector('.switchRight').style.backgroundColor = 'hsl(223, 12%, 12%)'
      setToggledLeft(true)
    }
  }

  function handleToggleRight() {
    if(toggledLeft) {
      document.querySelector('.switchRight').style.backgroundColor = 'hsl(223, 12%, 28%)'
      document.querySelector('.switchLeft').style.backgroundColor = 'hsl(223, 12%, 12%)'
      setToggledLeft(false)
    }
  }

  function handleClickTicket (ticket) {
    document.body.style.overflow = "hidden";
    setTicket(ticket)
    setDisplayTicket(true)
  }

  function handleCloseTicket () {
    document.body.style.overflow = "auto";

    setTicket({})
    setDisplayTicket(false)
  }

  function handleSwitchToUser () {
    if(adminView) {
      document.querySelector('.switchAdminLeft').style.backgroundColor = 'hsl(223, 12%, 28%)'
      document.querySelector('.switchAdminRight').style.backgroundColor = 'hsl(223, 12%, 12%)'
      setAdminView(false)
    }
  }

  function handleSwitchToAdmin () {
    if(!adminView) {
      document.querySelector('.switchAdminLeft').style.backgroundColor = 'hsl(223, 12%, 12%)'
      document.querySelector('.switchAdminRight').style.backgroundColor = 'hsl(223, 12%, 28%)'      
      setAdminView(true)
    }
  }

  return (
    <div className='userPage'>
      {!isDisabled ? "" : <div className="overlay"/>}

      <div className='header'>
        <i className='backHome fa fa-angle-left fa-lg' onClick={handleBack}></i>
        <Logo className='logo'/>
      </div>

      {displayTicket && ticket ? <TicketDisplay ticket={ticket} handleCloseTicket={handleCloseTicket}/> : ""}

      {!deleteWindow ? "" : 
        <div className="overlay">
          <div className="deleteWindow">
            <p className='deleteLabel'>Are you sure you want to delete your account?</p>
            <button className='doNotDelete' onClick={handleDoNotDelete}>No, go back</button>
            <button className='confirmDelete' onClick={handleDeleteAccount}>Yes, delete</button>
          </div>
        </div>
      }

      {pageLoaded? "" : <div className='loadingSpacer'></div>}
      {!loggedIn && pageLoaded? 
        <div className="userSetup">
          {haveAccount ? <Login handleToSignUp={handleToSignUp} handleLogin={handleLogin}/> : <SignUp handleToLogin={handleToLogin}/>}
        </div> : ""
      }

      {!loggedIn? "":
        <div className='userPageBody'>

          <div className="userPageHeader">
            <div className="accountSummary">
              <p className="userName">{userData?.email?.split("@")[0]}</p>
              <p className="joinedLabel">Joined {userData?.dateCreated}</p>
            </div>
            {!isAdmin ? "" :
              <div className="adminSummary">
                <p className="adminTitle">Admin Privileges</p>
                <div className="toggleAdminDiv">
                    <div className="adminSwitch">
                      <div className="switchAdminLeft" onClick={handleSwitchToUser}>User Account</div>
                      <div className="switchAdminRight" onClick={handleSwitchToAdmin}>Admin Dashboard</div>
                    </div>
                  </div>
              </div>
            }

            <button className='logOut' onClick={handleLogOut}>Log Out</button>
          </div>

          {adminView ? <AdminDashboard analytics={analytics}/> :
            <div className="userDataDiv">

              <div className="favoriteTheatersArea">
                <div className="favoriteTheatersHeader">
                  <p className="favoriteTheatersLabel">Your Favorite Theaters</p>
                </div>
                <div className="favoriteTheatersDiv">
                  {userData?.favoriteTheaters?.map(theater => {
                    return <div className="favoriteTheater" key={theater.theaterId}>
                            <p className="theaterName" onClick={() => handleTheaterClicked(theater.theaterId, theater.theaterName)}>{theater.theaterName}</p>
                            <i className="trashButton fa fa-trash" aria-hidden="true" onClick={() => handleDeleteTheater(theater.theaterId)}></i>
                          </div>
                  })}
                </div>
              </div>

              <div className="ticketsDiv">
                <div className="ticketsDivHeader">
                <div className="toggleDiv">
                    <div className="switch">
                      <div className="switchLeft" onClick={handleToggleLeft}>All</div>
                      <div className="switchRight" onClick={handleToggleRight}>Future</div>
                    </div>
                  </div>
                  <p className="ticketsTitle">Your Tickets</p>
                </div>
                <div className="ticketsDivBody">
                  <div className="ticketPreviewsList">
                    {toggledLeft ? 
                      userData?.tickets?.map((ticket, i) => {
                        return <TicketPreview key={uuidv4()} ticket={ticket} prevDate={i === 0 ? 'noDate' : userData?.tickets[i-1].showingDate} handleClickTicket={handleClickTicket}/>
                      }) : 
                      filteredTickets?.map((ticket, i) => {
                        return <TicketPreview key={uuidv4()} ticket={ticket} prevDate={i === 0 ? 'noDate' : userData?.tickets[i-1].showingDate} handleClickTicket={handleClickTicket}/>
                      })
                    }
                  </div>
                </div>
              </div>

            </div>
          }
          {adminView ? "" :
            <div className="userPageFooter">
              <button className='deleteAccount' onClick={handleDeleteAccountClicked}>Delete Account</button>
            </div>
          }
        </div>

      }

      <Footer/>
    </div>
  );
};
  
export default UserPage;