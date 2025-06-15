// src/pages/SurveyPage.jsx
import React, { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  UserCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  QuestionMarkCircleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '../context/AuthContext'

import muscle_pain from '../assets/disease-details/muscle_pain.jpg'
import yellowing_of_eyes from '../assets/disease-details/yellowing_of_eyes.jpg'
import dark_urine from '../assets/disease-details/dark_urine.jpg'
import itching from '../assets/disease-details/itching.jpg'
import chest_pain from '../assets/disease-details/chest_pain.jpg'
import mild_fever from '../assets/disease-details/mild_fever.jpg'
import fatigue from '../assets/disease-details/fatigue.jpg'
import family_history from '../assets/disease-details/family_history.jpg'
import nausea from '../assets/disease-details/nausea.jpg'
import joint_pain from '../assets/disease-details/joint_pain.jpg'
import high_fever from '../assets/disease-details/high_fever.jpg'
import vomiting from '../assets/disease-details/vomiting.jpg'
import lack_of_concentration from '../assets/disease-details/lack_of_concentration.jpg'
import altered_sensorium from '../assets/disease-details/altered_sensorium.jpg'
import sweating from '../assets/disease-details/sweating.jpg'
import weight_loss from '../assets/disease-details/weight_loss.jpg'
import diarrhoea from '../assets/disease-details/diarrhoea.jpg'
import loss_of_appetite from '../assets/disease-details/loss_of_appetite.jpg'
import bladder_discomfort from '../assets/disease-details/bladder_discomfort.jpg'
import mucoid_sputum from '../assets/disease-details/mucoid_sputum.jpg'


// full list of 20 symptoms
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
]

// details for each symptom
const SYMPTOM_DETAILS = {
  muscle_pain: {
    description:
      'Muscle pain (myalgia) can arise from overuse, injury, tension, or underlying conditions. Rest, gentle stretching, and hydration often help. If severe or persistent, seek medical advice.',
    imageSrc: muscle_pain
  },
  yellowing_of_eyes: {
    description:
      'Yellowing of the eyes (jaundice) may indicate elevated bilirubin. It can be linked to liver issues. Consult a physician if you notice persistent yellowing.',
    imageSrc: yellowing_of_eyes
  },
  dark_urine: {
    description:
      'Dark urine can be a sign of dehydration, certain medications, or liver conditions. Ensure proper hydration, and if it persists, please see a medical professional.',
    imageSrc: dark_urine
  },
  itching: {
    description:
      'Generalized itching can be caused by skin irritation, allergies, or systemic issues. Keep skin moisturized; seek medical advice if it worsens or if a rash appears.',
    imageSrc: itching
  },
  chest_pain: {
    description:
      'Chest pain can originate from heart, lung, or muscular causes. If you experience sudden or severe chest pain, seek emergency medical attention immediately.',
    imageSrc: chest_pain
  },
  mild_fever: {
    description:
      'A mild fever often indicates infection or inflammation. Stay hydrated, rest, and monitor your temperature. If it reaches 39.4°C (103°F) or lasts more than a few days, see a doctor.',
    imageSrc: mild_fever
  },
  fatigue: {
    description:
      'Fatigue can be caused by lack of sleep, stress, or underlying medical conditions. Ensure proper rest, hydration, and nutrition. If it persists, talk to your healthcare provider.',
    imageSrc: fatigue
  },
  family_history: {
    description:
      'A family history of certain conditions (e.g., diabetes, heart disease) can increase your risk. Sharing this with your doctor helps guide preventive screenings.',
    imageSrc: family_history
  },
  nausea: {
    description:
      'Nausea may be due to gastrointestinal upset, infections, or medication side effects. Sip clear fluids and rest. If vomiting occurs frequently or is accompanied by severe pain, see a doctor.',
    imageSrc: nausea
  },
  joint_pain: {
    description:
      'Joint pain can arise from arthritis, injury, or inflammation. Rest, gentle exercise, and anti-inflammatories can help. If pain is severe or persistent, consult a healthcare professional.',
    imageSrc: joint_pain
  },
  high_fever: {
    description:
      'A high fever (≥ 39.4°C/103°F) can signal a serious infection. Stay hydrated, use fever-reducing medications, and seek medical attention if it lasts more than 24–48 hours or is accompanied by other concerning symptoms.',
    imageSrc: high_fever
  },
  vomiting: {
    description:
      'Vomiting can be caused by infections, motion sickness, or medication side effects. Sip clear fluids and eat bland foods. If you cannot keep fluids down or if vomiting is severe, see a doctor.',
    imageSrc:   vomiting
  },
  lack_of_concentration: {
    description:
      'Difficulty concentrating can be due to fatigue, stress, or medical conditions. Ensure good sleep hygiene, manage stress, and talk to a healthcare provider if it impacts daily life.',
    imageSrc: lack_of_concentration
  },
  altered_sensorium: {
    description:
      'Altered sensorium (confusion, disorientation) can be a serious sign of infection, metabolic imbalance, or neurological issues. Seek urgent medical evaluation if this occurs.',
    imageSrc: altered_sensorium
  },
  sweating: {
    description:
      'Excessive sweating can occur from heat exposure or hormonal changes. If you sweat at rest or experience night sweats, speak with a healthcare provider.',
    imageSrc: sweating
  },
  weight_loss: {
    description:
      'Unintended weight loss may indicate metabolic or gastrointestinal issues. Track your intake, maintain balanced nutrition, and consult a doctor if it persists.',
    imageSrc: weight_loss
  },
  diarrhoea: {
    description:
      'Diarrhoea can be caused by infections, medications, or food intolerances. Stay hydrated, replace lost electrolytes, and see a healthcare professional if it is severe or prolonged.',
    imageSrc: diarrhoea
  },
  loss_of_appetite: {
    description:
      'Loss of appetite can accompany infections, stress, or digestive disorders. Maintain small nutrient-rich meals and stay hydrated; see a physician if it persists more than a week.',
    imageSrc: loss_of_appetite
  },
  bladder_discomfort: {
    description:
      'Bladder discomfort (burning, frequency) often indicates a urinary tract infection. Increase fluid intake, and if it persists or is painful, consult your doctor.',
    imageSrc: bladder_discomfort
  },
  mucoid_sputum: {
    description:
      'Mucoid sputum can accompany respiratory infections or chronic lung conditions. Hydration and humidified air can help; seek medical advice if it continues.',
    imageSrc: mucoid_sputum
  }
}

export default function SurveyPage() {
  const { count } = useParams()            // “15” or “20”
  const totalCount = parseInt(count, 10) || 0
  const navigate = useNavigate()
  const { user } = useAuth()

  // slice the master list
  const questions = useMemo(
    () => ALL_QUESTIONS.slice(0, totalCount),
    [totalCount]
  )

  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState([])       // stores 0/1
  const [showDetails, setShowDetails] = useState(false)

  // record answer and advance or finish
  const handleAnswer = choice => {
    const val = choice ? 1 : 0
    const next = [...answers, val]
    setAnswers(next)
    setShowDetails(false)

    if (current < questions.length - 1) {
      setCurrent(c => c + 1)
    } else {
      // done → pass questions & answers to results
      navigate('/results', {
        state: { questions, answers: next }
      })
    }
  }

  // go back: if detail is open, just close it; else back one question
  const goBack = () => {
    if (showDetails) {
      setShowDetails(false)
    } else if (current > 0) {
      setAnswers(a => a.slice(0, -1))
      setCurrent(c => c - 1)
    }
  }

  // forward: if detail open, close; else next question
  const goForward = () => {
    if (showDetails) {
      setShowDetails(false)
    } else if (current < questions.length - 1) {
      setCurrent(c => c + 1)
    }
  }

  const currentKey = questions[current]
  const detail = SYMPTOM_DETAILS[currentKey] || {
    description: 'No details available.',
    imageSrc: '/assets/details/placeholder.png'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-300 to-white p-4">
      <div className="relative flex items-center w-full max-w-3xl">
        {/* ← back */}
        <button
          onClick={goBack}
          disabled={current === 0 && !showDetails}
          className={`p-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition ${
            current === 0 && !showDetails ? 'opacity-40 cursor-not-allowed' : ''
          }`}
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        {/* CARD CONTAINER */}
        <div className="mx-6 flex-1 flex justify-center">
          {/* Survey card */}
          <div
            className={`bg-white bg-opacity-70 backdrop-blur-md rounded-2xl shadow-xl w-80 h-[480px] p-6 flex flex-col justify-between transition-opacity duration-300 ${
              showDetails ? 'opacity-50' : 'opacity-100'
            }`}
          >
            {/* progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-violet-600 h-2 transition-all duration-300"
                style={{
                  width: `${((current + 1) / questions.length) * 100}%`
                }}
              />
            </div>
            {/* user header */}
            <div className="flex items-center space-x-3 mt-4">
              <UserCircleIcon className="w-10 h-10 text-violet-600" />
              <div>
                <p className="text-sm text-gray-600">Participant</p>
                <p className="text-lg font-semibold">
                  {user?.first_name || 'User'}
                </p>
              </div>
            </div>
            {/* count */}
            <p className="text-sm text-gray-700 mt-2">
              Question {current + 1} of {questions.length}
            </p>
            {/* symptom */}
            <div className="bg-white rounded-xl p-4 shadow-md mt-4 flex-1 flex items-center justify-center">
              <h2 className="text-lg font-medium text-gray-900 capitalize text-center">
                {currentKey.replace(/_/g, ' ')}
              </h2>
            </div>
            {/* question-mark */}
            <div className="flex justify-center my-4">
              <button
                onClick={() => setShowDetails(true)}
                className="p-2 bg-violet-100 rounded-full hover:bg-violet-200 transition"
                title="More info"
              >
                <QuestionMarkCircleIcon className="w-6 h-6 text-violet-600" />
              </button>
            </div>
            {/* thumbs */}
            <div className="flex justify-around">
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

          {/* Details card */}
          {showDetails && (
            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-xl w-80 h-[480px] p-6 ml-4 flex flex-col">
              {/* close button */}
              <button
                onClick={() => setShowDetails(false)}
                className="self-start p-1 bg-violet-100 rounded-full hover:bg-violet-200 mb-2 transition"
                title="Back to question"
              >
                <ArrowLeftIcon className="w-5 h-5 text-violet-600 rotate-180" />
              </button>
              {/* title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-4 capitalize">
                {currentKey.replace(/_/g, ' ')}
              </h2>
              {/* image */}
              <img
                src={detail.imageSrc}
                alt={currentKey}
                className="h-32 w-32 rounded-lg object-cover shadow-md mx-auto mb-4"
              />
              {/* description */}
              <p className="text-gray-700 flex-1 overflow-y-auto">
                {detail.description}
              </p>
            </div>
          )}
        </div>

        {/* → forward */}
        <button
          onClick={goForward}
          disabled={current === questions.length - 1 && !showDetails}
          className={`absolute right-[-2rem] p-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition ${
            current === questions.length - 1 && !showDetails
              ? 'opacity-40 cursor-not-allowed'
              : ''
          }`}
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
