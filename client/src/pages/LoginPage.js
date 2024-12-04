import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Add Link for navigation
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

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
            login(response.data.user); // Set user context
            navigate('/'); // Redirect to dashboard
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Login</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Login</button>
            </form>
            <p style={styles.linkText}>
                Don't have an account? <Link to="/create-account" style={styles.link}>Create one here</Link>.
            </p>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '100px auto',
        padding: '20px',
        textAlign: 'center',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    input: {
        display: 'block',
        width: '100%',
        margin: '10px 0',
        padding: '10px',
        fontSize: '1rem',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1rem',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
    },
    linkText: {
        marginTop: '10px',
        fontSize: '0.9rem',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
    },
};

export default LoginPage;
