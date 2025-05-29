// src/components/Navbar.jsx
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.js'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <nav className="bg-violet-50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-violet-700">
          AIEHS
        </Link>

        {/* Nav links */}
        <ul className="hidden lg:flex space-x-8 text-gray-700">
          <li>
            <Link to="/" className="hover:text-violet-600 transition text-xl">
              Home
            </Link>
          </li>
          <li>
            <Link to="/team" className="hover:text-violet-600 transition text-xl">
              Our Team
            </Link>
          </li>
          <li>
            <Link to="/vision" className="hover:text-violet-600 transition text-xl">
              Our Vision
            </Link>
          </li>
        </ul>

        {/* Right side: either Login or User + Logout */}
        <div className="hidden lg:flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-700 text-lg">
                Welcome,&nbsp;
                <span className="font-medium text-violet-700">
                  {user.name || user.email}
                </span>
              </span>
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="inline-block px-5 py-2 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            type="button"
            className="p-2 text-violet-700 hover:text-violet-600 transition"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}
