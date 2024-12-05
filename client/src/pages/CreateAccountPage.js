import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateAccountPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        accessLevel: 'user',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/create-account', formData);
            alert(response.data.message);
            navigate('/login'); // Redirect to login
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
            clearInterval(interval); // Cleanup interval on component unmount
            document.body.style.backgroundColor = ''; // Reset background color
        };
    }, []);

    return (
        <div className="create-account-container">
            <h2>Create an Account</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleCreateAccount} className="create-account-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                />
                <select
                    name="accessLevel"
                    value={formData.accessLevel}
                    onChange={handleChange}
                    required
                    className="form-select"
                >
                    <option value="user">User </option>
                    <option value="admin">Admin</option>
                </select>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="form-input"
                />
                <button type="submit" className="submit-button">Create Account</button>
            </form>

            {/* Inline styles */}
            <style>
                {`
                    .create-account-container {
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

                    .create-account-form {
                        display: flex;
                        flex-direction: column;
                    }

                    .form-input, .form-select {
                        padding: 12px;
                        margin: 10px 0;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        font-size: 16px;
                        transition: border-color 0.3s;
                    }

                    .form-input:focus, .form-select:focus {
                        border-color: #007bff;
                        outline: none;
                    }

                    .submit-button {
                        padding: 12px;
                        background-color: #1d4ed8;
                        color: white 
                        border: none;
                        border-radius: 5px;
                        font-size: 16px;
                        cursor: pointer;
                        transition: background-color 0.3s;
                    }

                    .submit-button:hover {
                        background-color: #2563eb;
                    }
                `}
            </style>
        </div>
    );
};

export default CreateAccountPage;
