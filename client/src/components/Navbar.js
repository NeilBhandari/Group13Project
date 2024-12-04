import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav style={styles.navbar}>
            <div style={styles.logo}>
                <Link to="/" style={styles.link}>Dashboard</Link>
            </div>
            <div style={styles.title}>
                <img
                    src={require('../assets/logo.png')} // Replace with your actual logo path
                    alt="Logo"
                    style={styles.logoImage}
                />
                <span style={styles.titleText}>Scholar Sync</span>
            </div>
            <ul style={styles.navLinks}>
                <li><Link to="/jobs" style={styles.link}>Jobs</Link></li>
                <li><Link to="/tutoring" style={styles.link}>Tutoring</Link></li>
                <li><Link to="/scholarships" style={styles.link}>Scholarships</Link></li>
                {user ? (
                    <>
                        <li style={styles.greeting}>Hello, {user.name}</li>
                        <li>
                            <button onClick={logout} style={styles.logoutButton}>Logout</button>
                        </li>
                    </>
                ) : (
                    <li><Link to="/login" style={styles.link}>Login</Link></li>
                )}
            </ul>
        </nav>
    );
};

const styles = {
    navbar: {
        position: 'fixed',
        top: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: 'rgba(7,31,186,0.68)',
        color: '#fff',
        zIndex: 1000,
        boxSizing: 'border-box', // Ensure padding is included in width calculation
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    titleText: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#fff',
    },
    logoImage: {
        width: '40px',
        height: '40px',
    },
    navLinks: {
        listStyle: 'none',
        display: 'flex',
        gap: '20px',
        margin: 0, // Reset margin for ul
        padding: 0, // Reset padding for ul
    },
    link: {
        textDecoration: 'none',
        color: 'white',
        fontSize: '1rem',
    },
    logoutButton: {
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '5px 10px',
        cursor: 'pointer',
        fontSize: '1rem',
        whiteSpace: 'nowrap', // Prevent wrapping of text
    },
    greeting: {
        color: 'white',
        fontWeight: 'bold',
        marginRight: '10px',
        whiteSpace: 'nowrap', // Prevent wrapping of text
    },
};


export default Navbar;
