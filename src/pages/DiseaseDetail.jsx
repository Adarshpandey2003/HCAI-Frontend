// src/pages/DiseaseDetail.jsx
import React, { useState, useEffect } from 'react'
import { useParams, useLocation }     from 'react-router-dom'

export default function DiseaseDetail() {
  const { disease_id } = useParams()
  const location       = useLocation()
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')
  const [records, setRecords] = useState([])

  // Optional: grab disease name from <Navigate state> if passed
  const passedName = location.state?.disease_name

  useEffect(() => {
    setLoading(true)
    fetch(`http://localhost:5000/api/advice?disease_id=13`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch advice')
        return res.json()
      })
      .then(data => {
        setRecords(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError('Could not load advice.')
        setLoading(false)
      })
  }, [disease_id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-gray-600">Loading advice…</span>
      </div>
    )
  }
  if (error) {
    return (
      <div className="p-8 text-center text-red-600">{error}</div>
    )
  }
  if (!records.length) {
    return (
      <div className="p-8 text-center text-gray-600">
        No advice found for this condition.
      </div>
    )
  }

  // We take the first record (you can map them if there are multiple)
  const adviceText = records[0].advice || ''
  // Split into non-empty paragraphs
  const paragraphs = adviceText
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-300 to-white p-8">
      <div className="max-w-3xl mx-auto align-content-center bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-violet-700">
          Advice for {passedName || `Condition #${disease_id}`}
          <br />
          {`Condition #13`}
        </h1>

        <div className="space-y-4 prose prose-lg text-gray-800">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
