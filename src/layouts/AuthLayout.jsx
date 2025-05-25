import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow rounded">
        <div className="mb-6 text-center">
          <Link to="/" className="text-2xl font-bold">Disease Predictor</Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
}