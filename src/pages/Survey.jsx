// src/pages/SurveyPage.jsx
import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  UserCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

// 1) The full “master” list of 20 possible symptoms:
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
  'mucoid_sputum'
];

export default function SurveyPage() {
  const { count } = useParams();                 // “15” or “20”
  const total     = parseInt(count, 10) || 0;
  const navigate  = useNavigate();
  const { user } = useAuth();

  // 2) Only take the first “count” questions from the master list
  const questions = useMemo(
    () => ALL_QUESTIONS.slice(0, total),
    [total]
  );

  // current index, and array-of-0/1 answers
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);  // e.g. [1,0,1,0,...]

  // Fire when user clicks “thumbs up/down”
  const handleAnswer = (choice) => {
    // choice: true => 1, false => 0
    const val = choice ? 1 : 0;
    const next = [...answers, val];
    setAnswers(next);

    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
    } else {
      // All questions answered: navigate to /results, passing both arrays
      navigate('/results', {
        state: {
          questions: questions,
          answers: next
        }
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-300 to-white p-4">
      <div className="relative w-full max-w-md flex items-center">
        {/* ← Back arrow */}
        <button
          onClick={() => current > 0 && setCurrent(c => c - 1)}
          className="absolute left-[-2rem] p-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition-opacity"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        {/* — Main Survey Card — */}
        <div className="mx-8 bg-white bg-opacity-60 backdrop-blur-md rounded-2xl shadow-xl w-full p-8 space-y-6">
          {/* — Progress bar (top) */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-violet-600 h-2 transition-all duration-300"
              style={{
                width: `${((current + 1) / questions.length) * 100}%`
              }}
            />
          </div>

          {/* — User header (icon + name) */}
          <div className="flex items-center space-x-4">
            <UserCircleIcon className="w-12 h-12 text-violet-600" />
            <div>
              <p className="text-sm text-gray-600">Participant</p>
              <p className="text-lg font-semibold">{user?.first_name || 'User'}</p>
            </div>
          </div>

          {/* — Question count */}
          <p className="text-sm text-gray-700">
            Question {current + 1} of {questions.length}
          </p>

          {/* — The question text itself */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 capitalize">
              {questions[current].replace(/_/g, ' ')}
            </h2>
          </div>

          {/* — Hint/Info (“?”) below the question card */}
          <div className="flex justify-center">
            <button
              id="infoBtn"
              className="text-violet-600 hover:text-violet-800 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M12 9a9 9 0 110 18 9 9 0 010-18z"
                />
              </svg>
            </button>
          </div>

          {/* — Thumbs up / down buttons */}
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
          className="absolute right-[-2rem] p-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition-opacity"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
