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
        <div>
            <h1>Tutoring</h1>
            {tutoring.length === 0 ? (
                <p>No tutoring records available.</p>
            ) : (
                <ul>
                    {tutoring.map(record => (
                        <li key={record._id}>
                            <h3>{record.name}</h3>
                            <p>Email: {record.email}</p>
                            <p>Details: {record.details}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TutoringPage;
