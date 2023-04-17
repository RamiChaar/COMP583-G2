import { useState } from "react";

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

        if(password != confirmPassword) {
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

        //create new account

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