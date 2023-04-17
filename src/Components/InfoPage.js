import React, {useEffect} from "react";
import {useNavigate, useLocation} from 'react-router-dom';
import { ReactComponent as Logo } from '../Resources/logo.svg';
import Footer from './FooterComponents/Footer';

const InfoPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let infoState = location.state;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [infoState]);

    function handleBack() {
        window.scrollTo(0, 0);
        navigate(infoState.previousPath, {state: infoState.previousState});
    }

    return (
        <div className='infoPage'>
        <div className='header'>
            <i className='backHome fa fa-angle-left fa-lg' onClick={handleBack}></i>
            <Logo className='logo'/>
        </div>
        <div className='infoPageBody'>
            <div className='infoContent'>
                <h1 className="infoName">{infoState.name}</h1>
                <p className="infoDescription">{infoState.description}</p>
            </div>
        </div>
        <Footer/>
        </div>
    );
};
  
export default InfoPage;