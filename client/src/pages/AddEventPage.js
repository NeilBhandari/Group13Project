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
            setError('User not logged in');
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            if (!user) {
                throw new Error('User not logged in');
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
            <h2>Add an Event</h2>
            {message && <p style={styles.success}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label style={styles.label}>
                    Event Type:
                    <select name="type" value={type} onChange={(e) => setType(e.target.value)} style={styles.input}>
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
                        <input type="date" name="deadline" placeholder="Deadline" onChange={handleChange} style={styles.input} />
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
                            placeholder="Deadline"
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
                            name="name"
                            placeholder="Tutor Name"
                            onChange={handleChange}
                            style={styles.input}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            style={styles.input}
                        />
                        <textarea
                            name="details"
                            placeholder="Details"
                            onChange={handleChange}
                            style={styles.textarea}
                        ></textarea>
                    </>
                )}

                <button type="submit" style={styles.button}>Add Event</button>
            </form>
        </div>
    );
};

const styles = {
    container: { maxWidth: '600px', margin: '0 auto', padding: '20px', textAlign: 'center' },
    input: { display: 'block', width: '100%', margin: '10px 0', padding: '10px', fontSize: '1rem' },
    textarea: { display: 'block', width: '100%', height: '100px', margin: '10px 0', padding: '10px', fontSize: '1rem' },
    button: { padding: '10px 20px', fontSize: '1rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    success: { color: 'green' },
    error: { color: 'red', textAlign: 'center' },
    label: { fontSize: '1rem', fontWeight: 'bold', margin: '10px 0' },
};

export default AddEventPage;
