// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // 1) Initialize from localStorage if present
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('hcai_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // 2) Whenever `user` changes, write it to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('hcai_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('hcai_user');
    }
  }, [user]);

  // 3) Demo login (swap for real API calls)
  const login = async (email, password) => {
    if (email === 'test@example.com' && password === 'password') {
      const demoUser = { email: 'test@example.com', name: 'Demo User' };
      setUser(demoUser);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signup = async (email, password) => {
    // stubbed for demo
    if (email === 'test@example.com' && password === 'password') {
      const demoUser = { email: 'test@example.com', name: 'Demo User' };
      setUser(demoUser);
    } else {
      throw new Error('Cannot sign up in demo mode');
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
