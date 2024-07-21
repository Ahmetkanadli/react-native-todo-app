import React, { createContext, useState, useContext } from 'react';

// Context oluşturma
const AuthContext = createContext();

// Provider bileşeni
export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);

    return (
        <AuthContext.Provider value={{ authToken, setAuthToken }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook oluşturma
export const useAuth = () => useContext(AuthContext);
