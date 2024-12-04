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
        <div>
            <h1>Scholarships</h1>
            {scholarships.length === 0 ? (
                <p>No scholarships available.</p>
            ) : (
                <ul>
                    {scholarships.map(scholarship => (
                        <li key={scholarship._id}>
                            <h3>{scholarship.name}</h3>
                            <p>Details: {scholarship.details}</p>
                            <p>Eligibility: {scholarship.eligibility}</p>
                            <p>Contact: {scholarship.contactInfo}</p>
                            <p>Deadline: {scholarship.deadline}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ScholarshipsPage;
