import { useEffect, useState } from "react";

function Login ({handleToSignUp}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    function handleLogin () {
        let emailField = document.querySelector('.loginEmailField')
        let passwordField = document.querySelector('.loginPasswordField')

        emailField.style.borderBottom = '1.5px solid hsl(0, 0%, 95%)'
        emailField.style.color = 'hsl(0, 0%, 95%)'
        passwordField.style.borderBottom = '1.5px solid hsl(0, 0%, 95%)'
        passwordField.style.color = 'hsl(0, 0%, 95%)'
        
        let accountExists = true
        if(!accountExists) {
            setErrorMessage('Invalid Email and/or Password')
            emailField.style.borderBottom = '1.5px solid hsl(352, 48%, 42%)'
            passwordField.style.borderBottom = '1.5px solid hsl(352, 48%, 42%)'
            passwordField.value = ""
            emailField.value = ""
            setPassword('')
            setEmail('')
            return
        }

        //sign in
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
            <button className="loginButton" onClick={handleLogin}>Login</button>
            <div className="switchDiv">
                <p className="noAccountText">Don't have an account?</p>
                <button className="goToSignUpButton" onClick={handleToSignUp}>Sign Up</button>
            </div>
        </div>
    );
}
export default Login;