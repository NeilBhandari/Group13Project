import React, { useState } from 'react';
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

    return (
        <div style={styles.container}>
            <h2>Create an Account</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleCreateAccount}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <select
                    name="accessLevel"
                    value={formData.accessLevel}
                    onChange={handleChange}
                    required
                    style={styles.input}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Create Account</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
        border: '1px solid #ccc',
        borderRadius: '8px',
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
    link: {
        color: '#007bff',
        textDecoration: 'none',
    },
    error: {
        color: 'red',
    },
};

export default CreateAccountPage;
