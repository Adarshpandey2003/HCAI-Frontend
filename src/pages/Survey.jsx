// src/pages/SurveyPage.jsx
import React, { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  UserCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'

// 1) Your full list of “questions” (symptoms)
const ALL_QUESTIONS = [
  'muscle_pain',
  'yellowing_of_eyes',
  'dark_urine',
  'itching',
  'chest_pain',
  'mild_fever',
  'fatigue',
  'family_history',
  'nausea',
  'joint_pain',
  'high_fever',
  'vomiting',
  'lack_of_concentration',
  'altered_sensorium',
  'sweating',
  'weight_loss',
  'diarrhoea',
  'loss_of_appetite',
  'bladder_discomfort',
  'mucoid_sputum',
]

export default function SurveyPage() {
  const { count } = useParams()                  // "15" or "20"
  const total     = parseInt(count, 10) || 0
  const navigate  = useNavigate()

  // 2) Pick only the first `total` questions:
  const questions = useMemo(
    () => ALL_QUESTIONS.slice(0, total),
    [total]
  )

  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState([])

  const handleAnswer = (choice) => {
    const next = [...answers, choice]
    setAnswers(next)

    if (current < questions.length - 1) {
      setCurrent(c => c + 1)
    } else {
      // done → send to results
      navigate('/results', { state: { answers: next } })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-300 to-white p-4">
      <div className="relative w-full max-w-md flex items-center">
        {/* ← Back arrow */}
        <button
          onClick={() => current > 0 && setCurrent(c => c - 1)}
          className="absolute left-[-2rem] p-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        {/* Survey card */}
        <div className="mx-8 bg-white bg-opacity-60 backdrop-blur-md rounded-2xl shadow-xl w-full p-8 space-y-6">
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-violet-600 h-2 transition-all duration-300"
              style={{
                width: `${((current + 1) / questions.length) * 100}%`
              }}
            />
          </div>

          {/* User header */}
          <div className="flex items-center space-x-4">
            <UserCircleIcon className="w-12 h-12 text-violet-600" />
            <div>
              <p className="text-sm text-gray-600">Participant</p>
              <p className="text-lg font-semibold">John Doe</p>
            </div>
          </div>

          {/* Question count */}
          <p className="text-sm text-gray-700">
            Question {current + 1} of {questions.length}
          </p>

          {/* The question itself */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 capitalize">
              {questions[current].replace(/_/g, ' ')}
            </h2>
          </div>

          {/* Thumbs up/down */}
          <div className="flex justify-around mt-4">
            <button
              onClick={() => handleAnswer(false)}
              className="p-4 bg-red-100 rounded-full hover:bg-red-200 transition"
            >
              <HandThumbDownIcon className="w-8 h-8 text-red-600" />
            </button>
            <button
              onClick={() => handleAnswer(true)}
              className="p-4 bg-green-100 rounded-full hover:bg-green-200 transition"
            >
              <HandThumbUpIcon className="w-8 h-8 text-green-600" />
            </button>
          </div>
        </div>

        {/* → Forward arrow */}
        <button
          onClick={() => current < questions.length - 1 && setCurrent(c => c + 1)}
          className="absolute right-[-2rem] p-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
