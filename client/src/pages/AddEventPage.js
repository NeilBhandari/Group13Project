import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AddEventPage = () => {
    const [type, setType] = useState('scholarships'); // Default type
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            setError('User  not logged in');
        }
    }, [user]);

    // Background color change effect
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            if (!user) {
                throw new Error('User  not logged in');
            }

            const endpoint = `http://localhost:5000/api/admin/${type}`;
            const response = await axios.post(endpoint, { ...formData, userId: user.id }); // Include userId
            setMessage(response.data.message);
            setFormData({}); // Clear form on success
        } catch (err) {
            console.error('Add event error:', err); // Debugging error
            setError(err.response?.data?.message || err.message || 'An error occurred');
        }
    };

    if (error) {
        return <div style={styles.error}>{error}</div>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Add an Event</h2>
            {message && <p style={styles.success}>{message}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>
                    Event Type:
                    <select name="type" value={type} onChange={(e) => setType(e.target.value)} style={styles.select}>
                        <option value="scholarships">Scholarship</option>
                        <option value="tutoring">Tutoring</option>
                        <option value="jobs">Job</option>
                    </select>
                </label>

                {type === 'jobs' && (
                    <>
                        <input type="text" name="title" placeholder="Job Title" onChange={handleChange} style={styles.input} />
                        <input type="text" name="employer" placeholder="Employer" onChange={handleChange} style={styles.input} />
                        <input type="text" name="contact" placeholder="Contact" onChange={handleChange} style={styles.input} />
                        <input type="date" name="deadline" onChange={handleChange} style={styles.input} />
                    </>
                )}

                {type === 'scholarships' && (
                    <>
                        <input
                            type="text"
                            name="name"
                            placeholder="Scholarship Name"
                            onChange={handleChange}
                            style={styles.input}
                        />
                        <textarea
                            name="details"
                            placeholder="Details"
                            onChange={handleChange}
                            style={styles.textarea}
                        ></textarea>
                        <input
                            type="text"
                            name="eligibility"
                            placeholder="Eligibility"
                            onChange={handleChange}
                            style={styles.input}
                        />
                        <input
                            type="date"
                            name="deadline"
                            onChange={handleChange}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            name="contactInfo"
                            placeholder="Contact Information"
                            onChange={handleChange} 
                            style={styles.input} 
                        />
                    </>
                )}

                {type === 'tutoring' && (
                    <>
                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            onChange={handleChange}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            name="tutorName"
                            placeholder="Tutor Name"
                            onChange={handleChange}
                            style={styles.input}
                        />
                        <input
                            type="date"
                            name="availability"
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </>
                )}

                <button type="submit" style={styles.submitButton}>Submit</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    textarea: {
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        minHeight: '100px',
    },
    label: {
        marginBottom: '5px',
    },
    select: {
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    submitButton: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    success: {
        color: 'green',
        marginBottom: '10px',
    },
    error: {
        color: 'red',
        marginBottom: '10px',
    },
};

export default AddEventPage;
