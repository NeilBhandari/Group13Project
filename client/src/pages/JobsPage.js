// src/pages/JobsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobsPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/jobs');
                setJobs(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) return <div>Loading jobs...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Jobs</h1>
            {jobs.length === 0 ? (
                <p>No jobs available.</p>
            ) : (
                <div style={styles.cardsContainer}>
                    {jobs.map(job => (
                        <div key={job._id} style={styles.card}>
                            <h3 style={styles.cardTitle}>{job.title}</h3>
                            <p><strong>Employer:</strong> {job.employer}</p>
                            <p><strong>Contact:</strong> {job.contact}</p>
                            <p><strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    title: {
        fontSize: '32px',
        marginBottom: '20px',
        textAlign: 'center',
    },
    cardsContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
    },
    card: {
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s',
        overflowWrap: 'break-word', // Wrap long words
        wordWrap: 'break-word',
        overflow: 'hidden', // Prevent overflow
    },
    cardTitle: {
        fontSize: '24px',
        marginBottom: '10px',
    },
};


export default JobsPage;
