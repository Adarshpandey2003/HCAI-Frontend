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

  // 2) Sync with localStorage on change
  useEffect(() => {
    if (user) {
      localStorage.setItem('hcai_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('hcai_user');
    }
  }, [user]);

  //signup function
 const signup = async (email, password, firstName, lastName) => {
  const res = await fetch('http://localhost:5000/api/users/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, firstName, lastName }),
  });

  const contentType = res.headers.get('content-type');
  if (!res.ok || !contentType?.includes('application/json')) {
    const text = await res.text();
    throw new Error('Server error:\n' + text);
  }

  const data = await res.json();
  setUser(data.user);
};

  //login function
  const login = async (email, password) => {
  const res = await fetch('http://localhost:5000/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const contentType = res.headers.get('content-type');
  if (!res.ok || !contentType?.includes('application/json')) {
    const text = await res.text();
    throw new Error(text || 'Login failed');
  }

  const data = await res.json();
  setUser(data.user);
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
