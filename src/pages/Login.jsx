// src/pages/Login.jsx
import React, { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import Input from '../components/UI/Input'
import Button from '../components/UI/Button'
import { useAuth } from '../context/AuthContext'
import { isEmail } from '../utils/validation'
import Lottie from 'lottie-react'

import animationLogin from '../assets/lottie/animationLogin.json'

export default function Login() {
  const navigate = useNavigate()
  const { user, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // If already logged in, redirect away
  if (user) {
    return <Navigate to="/question-type" replace />
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    if (!isEmail(email)) {
      return setError('Invalid email.')
    }
    if (!password) {
      return setError('Password required.')
    }
    try {
      await login(email, password)
      navigate('/question-type')
    } catch (err) {
      setError(err.message || 'Failed to log in')
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* —— LEFT PANEL —— */}
      <div className="relative flex flex-col justify-center bg-white p-8">
        {/* top‐right decorative blob */}
        <img
          src="/assets/blob-top-right.svg"
          alt=""
          className="hidden md:block absolute top-0 right-0 w-40 opacity-30 -translate-y-1/2 translate-x-1/2"
        />

        <div className="max-w-md w-full mx-auto z-10">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-600 mb-6">
            Sign in to continue to Disease Predictor
          </p>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            <Button
              type="submit"
              variant="solid"
              className="bg-violet-300 text-white hover:bg-violet-400"
            >
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-indigo-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

        {/* bottom‐left decorative blob */}
        <img
          src="/assets/blob-bottom-left.svg"
          alt=""
          className="hidden md:block absolute bottom-20 left-0 w-56 opacity-30 translate-y-1/2 -translate-x-1/2"
        />
      </div>

      {/* —— RIGHT PANEL —— */}
      <div className="relative hidden md:flex items-center justify-center bg-gradient-to-br from-indigo-300 to-blue-150 overflow-hidden">
        <Lottie
          animationData={animationLogin}
          loop
          className="w-3/4 h-auto object-contain z-10"
        />
      </div>
    </div>
  )
}
