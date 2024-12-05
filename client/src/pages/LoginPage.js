import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png'; // Import the logo image if needed

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            login(response.data.user); 
            navigate('/'); 
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    useEffect(() => {
        const colors = ['#f4f8fb', '#a1c4fd', '#f4f8fb']; // Colors to transition
        let index = 0;

        const changeBackgroundColor = () => {
            document.body.style.transition = 'background-color 2s ease'; // Smooth transition
            document.body.style.backgroundColor = colors[index];
            index = (index + 1) % colors.length; // Cycle through colors
        };

        const interval = setInterval(changeBackgroundColor, 3000); // Change color every 3 seconds

        // Initial color set
        changeBackgroundColor();

        return () => {
            clearInterval(interval); 
            document.body.style.backgroundColor = ''; // Reset background color
        };
    }, []);

    return (
        <div className="login-container">
            <h2>Welcome to Scholar Sync!</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleLogin} className="login-form">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-input"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-input"
                />
                <button type="submit" className="submit-button">Login</button>
            </form>
            <div className="footer">
                <p>Don't have an account? <Link to="/create-account" className="link">Sign up</Link></p>
            </div>
            <style>
                {`
                    .login-container {
                        max-width: 400px;
                        margin: 100px auto;
                        padding: 20px;
                        background-color: #ffffff;
                        border-radius: 10px;
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                        text-align: center;
                    }

                    h2 {
                        font-size: 24px;
                        margin-bottom: 20px;
                        color: #333;
                    }

                    .error-message {
                        color: red;
                        margin-bottom: 15px;
                    }

                    .login-form {
                        display: flex;
                        flex-direction: column;
                    }

                    .form-input {
                        padding: 12px;
                        margin: 10px 0;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        font-size: 16px;
                        transition: border-color 0.3s;
                    }

                    .form-input:focus {
                        border-color: #007bff;
                        outline: none;
                    }

                    .submit-button {
                        padding: 12px;
                        background-color: #1d4ed8;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        font-size: 16px;
                        cursor: pointer;
                        transition: background-color 0.3s;
                    }

                    .submit-button:hover {
                        background-color: #2563eb;
                    }

                    .footer {
                        margin-top: 20px;
                        font-size:  14px;
                        color: #6b7280;
                    }

                    .link {
                        color: #1d4ed8;
                        text-decoration: none;
                    }

                    .link:hover {
                        text-decoration: underline;
                    }
                `}
            </style>
        </div>
    );
};

export default LoginPage;
