import { useState } from "react";
import { Link } from 'react-router-dom';

function Login ({handleToSignUp}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Handle login logic here
        console.log('Logging in with email:', email, 'and password:', password);
    };
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
            <button className="loginButton" onClick={handleLogin}>Login</button>
            <div className="switchDiv">
                <p className="noAccountText">Don't have an account?</p>
                <button className="goToSignUpButton" onClick={handleToSignUp}>Sign Up</button>
            </div>
        </div>
    );
}
export default Login;