// src/components/Auth/RequireAuth.jsx
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function RequireAuth({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    // redirect to /login, preserving where they came from
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
