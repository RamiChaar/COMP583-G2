import { useState } from "react";
import axios from 'axios';

const LOCAL_STORAGE_KEY_USER_CREDENTIALS = 'cinema-scouter.userCredentials';

function Login ({handleToSignUp, handleLogin}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    async function handleRequestLogin () {
        let emailField = document.querySelector('.loginEmailField')
        let passwordField = document.querySelector('.loginPasswordField')

        emailField.style.borderBottom = '1.5px solid hsl(0, 0%, 95%)'
        emailField.style.color = 'hsl(0, 0%, 95%)'
        passwordField.style.borderBottom = '1.5px solid hsl(0, 0%, 95%)'
        passwordField.style.color = 'hsl(0, 0%, 95%)'
        
        let validCredentials = false

        let user = {
            email: email,
            password: password
        }
        await axios.post(`${process.env.REACT_APP_HOST}/users/login`, user)
        .then(res => {
            if(res.data === "Success"){
                validCredentials = true
            }
        })
        .catch(err => console.log(err))

        if(!validCredentials) {
            setErrorMessage('Invalid Email and/or Password')
            emailField.style.borderBottom = '1.5px solid hsl(352, 48%, 42%)'
            passwordField.style.borderBottom = '1.5px solid hsl(352, 48%, 42%)'
            passwordField.value = ""
            emailField.value = ""
            setPassword('')
            setEmail('')
            setTimeout(() => {
                emailField.style.borderBottom = '1.5px solid hsl(0, 0%, 70%)'
                passwordField.style.borderBottom = '1.5px solid hsl(0, 0%, 70%)'
            }, 500)
            return
        }

        let userCredentials =  {
            email: email, 
            password: password
        }
        localStorage.setItem(LOCAL_STORAGE_KEY_USER_CREDENTIALS, JSON.stringify(userCredentials))

        handleLogin()
    }

    return (
        <div className='loginDiv'>
            <input
                className="loginEmailField inputField"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="loginPasswordField inputField"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <p className="errorMessage">{errorMessage}</p>
            <button className="loginButton" onClick={handleRequestLogin}>Login</button>
            <div className="switchDiv">
                <p className="noAccountText">Don't have an account?</p>
                <button className="goToSignUpButton" onClick={handleToSignUp}>Sign Up</button>
            </div>
        </div>
    );
}
export default Login;