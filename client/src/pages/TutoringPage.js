// src/pages/TutoringPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TutoringPage = () => {
    const [tutoring, setTutoring] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTutoring = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/tutoring');
                setTutoring(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTutoring();
    }, []);

    if (loading) return <div>Loading tutoring records...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Tutoring</h1>
            {tutoring.length === 0 ? (
                <p>No tutoring records available.</p>
            ) : (
                <div style={styles.cardsContainer}>
                    {tutoring.map(record => (
                        <div key={record._id} style={styles.card}>
                            <h3 style={styles.cardTitle}>{record.name}</h3>
                            <p><strong>Email:</strong> {record.email}</p>
                            <p><strong>Details:</strong> {record.details}</p>
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
        wordWrap: 'break-word',
        overflow: 'hidden',
    },
    cardTitle: {
        fontSize: '24px',
        marginBottom: '10px',
    },
};

export default TutoringPage;
