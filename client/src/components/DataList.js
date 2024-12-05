import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Import AuthContext
import { useNavigate } from 'react-router-dom';

const DataList = () => {
    const [jobs, setJobs] = useState([]);
    const [scholarships, setScholarships] = useState([]);
    const [tutoring, setTutoring] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const { user } = useAuth(); // Get the current user's info
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [jobsRes, scholarshipsRes, tutoringRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/jobs?limit=3'),
                    axios.get('http://localhost:5000/api/scholarships?limit=3'),
                    axios.get('http://localhost:5000/api/tutoring?limit=3'),
                ]);
                setJobs(jobsRes.data);
                setScholarships(scholarshipsRes.data);
                setTutoring(tutoringRes.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={styles.dashboard}>
            {/* Greeting message */}
            {user && <h2 style={styles.greeting}>Hello, {user.name}!</h2>}
            <br></br>

            {/* Display Add Event button for admins only */}
            {user?.accessLevel === 'admin' && (
                <button style={styles.addEventButton} onClick={() => navigate('/add-event')}>
                    Add Event
                </button>
            )}

            <br></br>
            <br></br>
            <div style={styles.cardsContainer}>
                <div style={styles.card}>
                    <h2>Jobs</h2>
                    {jobs.length === 0 ? (
                        <p>No jobs found</p>
                    ) : (
                        <ul>
                            {jobs.map(job => (
                                <li key={job._id}>
                                    <strong>{job.title}</strong> - {job.employer}
                                </li>
                            ))}
                        </ul>
                    )}
                    <a href="/jobs" style={styles.link}>View More Jobs</a>
                </div>

                <div style={styles.card}>
                    <h2>Scholarships</h2>
                    {scholarships.length === 0 ? (
                        <p>No scholarships found</p>
                    ) : (
                        <ul>
                            {scholarships.map(scholarship => (
                                <li key={scholarship._id}>
                                    <strong>{scholarship.name}</strong>
                                </li>
                            ))}
                        </ul>
                    )}
                    <a href="/scholarships" style={styles.link}>View More Scholarships</a>
                </div>

                <div style={styles.card}>
                    <h2>Tutoring</h2>
                    {tutoring.length === 0 ? (
                        <p>No tutoring records found</p>
                    ) : (
                        <ul>
                            {tutoring.map(record => (
                                <li key={record._id}>
                                    <strong>{record.name}</strong> - {record.details}
                                </li>
                            ))}
                        </ul>
                    )}
                    <a href="/tutoring" style={styles.link}>View More Tutoring</a>
                </div>
            </div>
        </div>
    );
};

const styles = {
    dashboard: {
        padding: '20px',
    },
    greeting: {
        marginBottom: '20px',
        fontSize: '24px',
        color: '#333',
    },
    addEventButton: {
        alignSelf: 'flex-start',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
 fontSize: '1rem',
        marginBottom: '20px',
    },
    cardsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
        flexWrap: 'wrap',
    },
    card: {
        flex: '1 1 calc(33.333% - 20px)',
        backgroundColor: '#f9f9f9',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        minWidth: '250px',
        maxWidth: '400px',
    },
    link: {
        display: 'block',
        marginTop: '10px',
        textDecoration: 'none',
        color: '#007bff',
        fontWeight: 'bold',
    },
};

export default DataList;
