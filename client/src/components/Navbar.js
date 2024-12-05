import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = () => {
        setIsModalOpen(true); // Open the modal
    };

    const confirmLogout = () => {
        logout();
        setIsModalOpen(false); // Close the modal after logout
    };

    const cancelLogout = () => {
        setIsModalOpen(false); // Close the modal without logging out
    };

    return (
        <header style={styles.header}>
            <div style={styles.logoContainer}>
                <img src={require('../assets/logo.png')} alt="Scholar Sync logo" style={styles.logo} />
                <h1 style={styles.title}>Scholar Sync</h1>
            </div>
            <nav style={styles.nav}>
                <Link to="/" style={styles.link}>Dashboard</Link>
                <Link to="/scholarships" style={styles.link}>Scholarships</Link>
                <Link to="/tutoring" style={styles.link}>Tutoring</Link>
                <Link to="/jobs" style={styles.link}>Jobs</Link>
                {user ? (
                    <>
                        {/* <span style={styles.greeting}>Hello, {user.name}</span> */}
                        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
                    </>
                ) : (
                    <Link to="/login" style={styles.link}>Login</Link>
                )}
            </nav>
            {isModalOpen && (
                <div style={styles.overlay}>
                    <div style={styles.modal}>
                    <img src={require('../assets/logo.png')} alt="Scholar Sync logo" style={{ height: '80px', width: '80px' }} />
                        <h2 style={{ color: '#1d4ed8' }}>Confirm Logout</h2>
                        <p style={styles.logoutMessage}>Are you sure you want to logout?</p>
                        <div style={styles.buttonContainer}>
                            <button onClick={confirmLogout} style={styles.confirmButton}>Yes</button>
                            <button onClick={cancelLogout} style={styles.cancelButton}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 32px',
        backgroundColor: '#1d4ed8',
        color: 'white',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    logo: {
        height: '80px',
        width: '80px',
        marginRight: '10px',
    },
    title: {
        fontSize: '35px',
        margin: 0,
    },
    nav: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        padding: '8px 16px',
        transition: 'color 0.3s',
        fontSize: '20px',
    },
    greeting: {
        color: 'white',
        marginRight: '10px',
        fontSize: '20px',
    },
    logoutButton: {
        background: 'none',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        fontSize: '20px',
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modal: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    modalLogo: {
        height: '50px', // Adjust the size of the logo in the modal
        marginBottom: '10px', // Space between the logo and the text
    },
    logoutMessage: {
        color: 'black',
    },
    buttonContainer: {
        marginTop: '20px',
    },
    confirmButton: {
        backgroundColor: '#1d4ed8',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        marginRight: '10px',
        cursor: 'pointer',
        borderRadius: '5px',
    },
    cancelButton: {
        backgroundColor: 'lightgray',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '5px',
    },
};

export default Navbar;
