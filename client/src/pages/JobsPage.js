// src/pages/JobsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobsPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTitle, setSearchTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [selectedEmployers, setSelectedEmployers] = useState(new Set());
    const [dropdownOpen, setDropdownOpen] = useState(false);

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

    // Filter jobs based on search criteria
    const filteredJobs = jobs.filter(job => {
        const matchesTitle = job.title.toLowerCase().includes(searchTitle.toLowerCase());
        const matchesStartDate = startDate ? new Date(job.startDate) >= new Date(startDate) : true;
        const matchesEmployer = selectedEmployers.size === 0 || selectedEmployers.has(job.employer);
        return matchesTitle && matchesStartDate && matchesEmployer;
    });

    // Get unique employers for checkboxes
    const employers = [...new Set(jobs.map(job => job.employer))];

    const handleEmployerChange = (employer) => {
        const updatedEmployers = new Set(selectedEmployers);
        if (updatedEmployers.has(employer)) {
            updatedEmployers.delete(employer);
        } else {
            updatedEmployers.add(employer);
        }
        setSelectedEmployers(updatedEmployers);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Jobs</h1>
            <div style={styles.filterBar}>
                <input
                    type="text"
                    placeholder="Search by title"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{ ...styles.input, width: '10px' }}
                />
                <div style={styles.dropdown}>
                    <button onClick={toggleDropdown} style={{ ...styles.dropdownButton, width: '400px' }}>
                        {selectedEmployers.size > 0 ? `${selectedEmployers.size} Company(s) Selected` : "Select Company"}
                    </button>
                    {dropdownOpen && (
                        <div style={styles.dropdownMenu}>
                            {employers.map(employer => (
                                <label key={employer} style={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={selectedEmployers.has(employer)}
                                        onChange={() => handleEmployerChange(employer)}
                                    />
                                    {employer}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {filteredJobs.length === 0 ? (
                <p>No jobs available.</p>
            ) : (
                <div style={styles.cardsContainer}>
                    {filteredJobs.map(job => (
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
    dropdown: {
        position: 'relative',
        marginLeft: '10px',
    },
    dropdownButton: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        cursor: 'pointer',
        width: '400px',
    },
    dropdownMenu: {
        position: 'absolute',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: '4px',
        zIndex: 1000,
        marginTop: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    checkboxLabel: {
        display: 'block',
        padding: '5px 10px',
        cursor: 'pointer',
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
        overflowWrap: 'break-word',
        wordWrap: 'break-word',
        overflow: 'hidden',
    },
    cardTitle: {
        fontSize: '24px',
        marginBottom: '10px',
    },
};

export default JobsPage;
