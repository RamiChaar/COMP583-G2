import { useState } from "react";
import { SHA256 } from 'crypto-js';

function SignUp ({handleToLogin}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    function handleSignup() {
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
        //check if account exists with email

        if(accountExists) {
            setErrorMessage('This email is registered with another account')
            emailField.style.borderBottom = '1.5px solid hsl(352, 48%, 42%)'
            emailField.style.color = 'hsl(352, 48%, 42%)'
            setTimeout(() => {
                emailField.style.color = 'hsl(0, 0%, 95%)'
            }, 500)
            return
        }

        const salt = generateSalt(32)
        const hashedPassword = SHA256(salt.concat(password)).toString();
        
        console.log('Salt:', salt.toString());
        console.log('Password:', password);
        console.log('Hashed Password:', hashedPassword);

        //create new account

        handleToLogin();
    }

    function generateSalt(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        let salt = '';
        for (let i = 0; i < length; i++) {
            salt += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return salt
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