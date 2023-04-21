import { useState } from "react";
import axios from 'axios';

function SignUp ({handleToLogin}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    async function handleSignup() {
        let emailField = document.querySelector('.signUpEmailField')
        let passwordField = document.querySelector('.signUpPasswordField')
        let confirmPasswordField = document.querySelector('.signUpConfirmPasswordField')

        emailField.style.borderBottom = '1.5px solid hsl(0, 0%, 95%)'
        emailField.style.color = 'hsl(0, 0%, 95%)'
        passwordField.style.borderBottom = '1.5px solid hsl(0, 0%, 95%)'
        passwordField.style.color = 'hsl(0, 0%, 95%)'
        confirmPasswordField.style.borderBottom = '1.5px solid hsl(0, 0%, 95%)'
        confirmPasswordField.style.color = 'hsl(0, 0%, 95%)'

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailPattern.test(email)) {
            setErrorMessage('Invalid Email')
            emailField.style.borderBottom = '1.5px solid hsl(352, 48%, 42%)'
            emailField.style.color = 'hsl(352, 48%, 42%)'
            setTimeout(() => {
                emailField.style.color = 'hsl(0, 0%, 95%)'
            }, 500)
            return
        }

        if(password !== confirmPassword) {
            setErrorMessage('Passwords Do Not Match')
            passwordField.style.borderBottom = '1.5px solid hsl(352, 48%, 42%)'
            passwordField.style.color = 'hsl(352, 48%, 42%)'
            confirmPasswordField.style.borderBottom = '1.5px solid hsl(352, 48%, 42%)'
            confirmPasswordField.style.color = 'hsl(352, 48%, 42%)'
            setTimeout(() => {
                passwordField.style.color = 'hsl(0, 0%, 95%)'
                confirmPasswordField.style.color = 'hsl(0, 0%, 95%)'
            }, 500)
            return
        }

        if(password.length < 8) {
            setErrorMessage('Password must be at least 8 characters')
            passwordField.style.borderBottom = '1.5px solid hsl(352, 48%, 42%)'
            passwordField.style.color = 'hsl(352, 48%, 42%)'
            confirmPasswordField.style.borderBottom = '1.5px solid hsl(352, 48%, 42%)'
            confirmPasswordField.style.color = 'hsl(352, 48%, 42%)'
            setTimeout(() => {
                passwordField.style.color = 'hsl(0, 0%, 95%)'
                confirmPasswordField.style.color = 'hsl(0, 0%, 95%)'
            }, 500)
            return
        }

        let accountExists = false
        await axios.get(`${process.env.REACT_APP_HOST}/users/${email}`)
        .then(res => {if(res.data != null) {accountExists = true}})
        .catch(err => console.log(err))

        if(accountExists) {
            setErrorMessage('This email is registered with another account')
            emailField.style.borderBottom = '1.5px solid hsl(352, 48%, 42%)'
            emailField.style.color = 'hsl(352, 48%, 42%)'
            setTimeout(() => {
                emailField.style.color = 'hsl(0, 0%, 95%)'
            }, 500)
            return
        }

        const currentDate = new Date();
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const month = months[currentDate.getMonth()];
        const day = currentDate.getDate();
        const year = currentDate.getFullYear();
        const formattedDate = `${month} ${day}, ${year}`;

        const user = {
            email: email,
            password: password,
            dateCreated: formattedDate
        }

        await axios.post(`${process.env.REACT_APP_HOST}/users/add`, user)
        .then(res => console.log(res))
        .catch(err => console.log(err))

        handleToLogin();
    }

    return (
        <div className='signUpDiv'>
            <input
                className="signUpEmailField inputField"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="signUpPasswordField inputField" 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                className="signUpConfirmPasswordField inputField"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <p className="errorMessage">{errorMessage}</p>
            <button className="signUpButton" onClick={handleSignup}>Create account</button>
            <div className="switchDiv">
                <p className="haveAccountText">Already have an account?</p>
                <button className="goToLoginButton" onClick={handleToLogin}>Login</button>
            </div>
        </div>
    );
}
export default SignUp;