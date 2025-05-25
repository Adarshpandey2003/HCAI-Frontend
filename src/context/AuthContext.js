import React, { createContext, useContext, useState } from 'react';

// 1) Create the context
const AuthContext = createContext();

// 2) Export a hook for easy consumption
export function useAuth() {
  return useContext(AuthContext);
}

// 3) The provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // sign up (replace with real API calls)
  const signup = async (email, password) => {
    // e.g. await api.post('/signup', { email, password })
    setUser({ email });
    return;
  };

  // log in (replace with real API calls)
  const login = async (email, password) => {
    // e.g. await api.post('/login', { email, password })
    setUser({ email });
    return;
  };

  // log out
  const logout = () => {
    setUser(null);
  };

  const value = { user, signup, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
