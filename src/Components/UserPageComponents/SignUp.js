import { useState } from "react";
import { Link } from 'react-router-dom';

function SignUp ({handleToLogin}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = () => {
        // Handle signup logic here
        console.log('Signing up with email: ', email, 'and password: ', password, 'and confirm password: ', confirmPassword);
    };

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
            <button className="signUpButton" onClick={handleSignup}>Create account</button>
            <div className="switchDiv">
                <p className="haveAccountText">Already have an account?</p>
                <button className="goToLoginButton" onClick={handleToLogin}>Login</button>
            </div>
        </div>
    );
}
export default SignUp;