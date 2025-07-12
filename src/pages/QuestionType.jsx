// src/pages/QuestionType.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Lottie from 'lottie-react'

// ← your “recommended” badge animation
import recommendedAnim from '../assets/lottie/recommended.json'

const OPTIONS = [
  {
    id: 'short',
    questions: 15,
    time: '≈ 3–4 minutes',
    featured: false,
  },
  {
    id: 'medium',
    questions: 20,
    time: '≈ 5–6 minutes',
    featured: true,
  },
]

export default function QuestionType() {
  const navigate = useNavigate()

  const handleSelect = (numQuestions) => {
    // redirect to /survey/15 or /survey/20
    navigate(`/survey/${numQuestions}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-300 to-white py-20 px-4">
      <div className="max-w-3xl mx-auto mt-20 text-center mb-12">
        <h1 className="text-4xl font-extrabold">Predict Your Disease</h1>
        <p className="mt-2 text-gray-600">
          Choose how many questions you’d like to answer—and see your estimated accuracy.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid gap-20 mt-28 grid-cols-1 md:grid-cols-2">
        {OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleSelect(opt.questions)}
            className={`
              relative flex flex-col justify-between
              rounded-2xl p-8 shadow-lg transition
              ${
                opt.featured
                  ? 'bg-gradient-to-br from-violet-400 to-purple-300 text-white'
                  : 'bg-white text-gray-900'
              }
              hover:shadow-2xl
            `}
          >
            {opt.featured && (
              <div className="absolute -top-6 right-6 w-16 h-16">
                <Lottie
                  animationData={recommendedAnim}
                  loop
                  autoplay
                />
              </div>
            )}

            <div>
              <div className="text-xl font-semibold">
                {opt.questions} Questions
              </div>
              <div className="mt-1 text-sm opacity-80">{opt.time}</div>
            </div>

            <div>
              <div className="mt-6 text-3xl font-bold">
                {opt.accuracy}
              </div>
              <div className="mt-8">
                <span className={`
                  inline-block px-4 py-2 rounded-full font-medium
                  ${
                    opt.featured
                      ? 'bg-white text-violet-600'
                      : 'bg-violet-100 text-violet-700'
                  }
                `}>
                  Select
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
