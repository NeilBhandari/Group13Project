// src/pages/ScholarshipsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ScholarshipsPage = () => {
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchScholarships = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/scholarships');
                setScholarships(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchScholarships();
    }, []);

    if (loading) return <div>Loading scholarships...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Scholarships</h1>
            {scholarships.length === 0 ? (
                <p>No scholarships available.</p>
            ) : (
                <div style={styles.cardsContainer}>
                    {scholarships.map(scholarship => (
                        <div key={scholarship._id} style={styles.card}>
                            <h3 style={styles.cardTitle}>{scholarship.name}</h3>
                            <p><strong>Details:</strong> {scholarship.details}</p>
                            <p><strong>Eligibility:</strong> {scholarship.eligibility}</p>
                            <p><strong>Contact:</strong> {scholarship.contactInfo}</p>
                            <p><strong>Deadline:</strong> {new Date(scholarship.deadline).toLocaleDateString()}</p>
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

export default ScholarshipsPage;
