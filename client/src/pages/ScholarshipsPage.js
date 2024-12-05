// src/pages/ScholarshipsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ScholarshipsPage = () => {
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchName, setSearchName] = useState('');
    const [eligibility, setEligibility] = useState('');
    const [deadline, setDeadline] = useState('');

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

    // Filter scholarships based on search criteria
    const filteredScholarships = scholarships.filter(scholarship => {
        const matchesName = scholarship.name.toLowerCase().includes(searchName.toLowerCase());
        const matchesEligibility = eligibility ? scholarship.eligibility === eligibility : true;
        const matchesDeadline = deadline ? new Date(scholarship.deadline) <= new Date(deadline) : true;
        return matchesName && matchesEligibility && matchesDeadline;
    });

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Scholarships</h1>
            <div style={styles.filterBar}>
                <input
                    type="text"
                    placeholder="Search by scholarship name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    style={styles.input}
                />
                <select
                    value={eligibility}
                    onChange={(e) => setEligibility(e.target.value)}
                    style={styles.select}
                >
                    <option value="">Select Eligibility</option>
                    <option value="High-School">High-School</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Graduate">Graduate</option>
                </select>
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    style={{ ...styles.input, width: '120px' }} // Adjust width for date input
                />
            </div>
            {filteredScholarships.length === 0 ? (
                <p>No scholarships available.</p>
            ) : (
                <div style={styles.cardsContainer}>
                    {filteredScholarships.map(scholarship => (
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
    filterBar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1d4ed8',
        padding: '10px',
        borderRadius: '8px',
        marginBottom: '20px',
    },
    input: {
        margin: '0 10px',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        flex: '1',
        minWidth: '150px',
    },
    select: {
        margin: '0 10px',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        flex: '1',
        minWidth: '150px',
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
