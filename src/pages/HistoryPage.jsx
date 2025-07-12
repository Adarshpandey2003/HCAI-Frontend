// src/pages/HistoryPage.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HistoryPage() {
  const [records, setRecords]   = useState([])
  const [loading, setLoading]   = useState(true)
  const navigate                = useNavigate()

  useEffect(() => {
    const userDetails = localStorage.getItem('hcai_user')
    const userId      = userDetails ? JSON.parse(userDetails).user_id : null
    console.log('User ID from localStorage:', userId)

    fetch(`http://localhost:5000/api/disease?user_id=${userId}`)
      .then(res => res.json())
      .then(data => {
        setRecords(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-200 to-white">
        <span className="text-gray-600">Loading your history…</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-200 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-violet-700 text-center mb-8">
          Your Prediction History
        </h1>

        {records.length === 0 ? (
          <p className="text-center text-gray-600">
            You haven’t made any predictions yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {records.map(({ disease_id, disease_name }, idx) => (
              <div
                key={disease_id}
                className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl shadow-lg p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="text-sm text-gray-500">#{idx + 1}</span>
                  <h2 className="mt-2 text-xl font-semibold text-gray-900">
                    {disease_name}
                  </h2>
                </div>
                <button
                  onClick={() =>
                    navigate(`/disease/${disease_id}`, {
                      state: { disease_id, disease_name }
                    })
                  }
                  className="mt-6 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
                >
                  View Advice
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
