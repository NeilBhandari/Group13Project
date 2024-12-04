import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import DataList from './components/DataList';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';
import JobsPage from './pages/JobsPage';
import ScholarshipsPage from './pages/ScholarshipsPage';
import TutoringPage from './pages/TutoringPage';
import AddEventPage from './pages/AddEventPage';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                {/* Navbar is outside of Routes so it appears on every page */}
                <Navbar />
                <div style={{ paddingTop: '60px' }}> {/* Prevent overlapping */}
                    <Routes>
                        <Route path="/" element={<DataList />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/create-account" element={<CreateAccountPage />} />
                        <Route path="/jobs" element={<JobsPage />} />
                        <Route path="/scholarships" element={<ScholarshipsPage />} />
                        <Route path="/tutoring" element={<TutoringPage />} />
                        <Route path="/add-event" element={<AddEventPage />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
