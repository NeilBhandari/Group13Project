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
        <div>
            <h1>Jobs</h1>
            {jobs.length === 0 ? (
                <p>No jobs available.</p>
            ) : (
                <ul>
                    {jobs.map(job => (
                        <li key={job._id}>
                            <h3>{job.title}</h3>
                            <p>Employer: {job.employer}</p>
                            <p>Contact: {job.contact}</p>
                            <p>Deadline: {job.deadline}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default JobsPage;
