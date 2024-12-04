import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        console.log('Login data:', userData); // Debug user data
        localStorage.setItem('token', userData.token); // Ensure token is stored
        setUser(userData);
    };


    const logout = () => {
        setUser(null);
        localStorage.removeItem('token'); // Remove token on logout
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
