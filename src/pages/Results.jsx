import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};
  const { questions = [], answers = [] } = state;

  useEffect(() => {
    if (!questions.length || !answers.length) {
      navigate('/', { replace: true });
    }
  }, [questions, answers, navigate]);

  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (questions.length && answers.length) {
      const payload = { symptoms: {} };

      questions.forEach((q, idx) => {
        payload.symptoms[q] = answers[idx];
      });

      // ✅ Add user_id from localStorage
      try {
        const storedUser = JSON.parse(localStorage.getItem('hcai_user'));
        if (storedUser?.user_id) {
          payload.user_id = storedUser.user_id;
        } else {
          throw new Error('User not logged in');
        }
      } catch (err) {
        setError('User session missing. Please log in again.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');
      fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(async (res) => {
          if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Server returned an error');
          }
          return res.json();
        })
        .then((data) => {
          setResponseData(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message || 'Unknown error');
          setLoading(false);
        });
    }
  }, [questions, answers]);

  const renderRemedyText = (raw) => {
    const paragraphs = raw.trim().split(/\n\s*\n/);
    return paragraphs.map((para, idx) => (
      <p key={idx} className="mb-4 text-gray-700 leading-relaxed">
        {para.split('\n').map((line, i) =>
          i > 0 ? [<br key={i} />, line] : line
        )}
      </p>
    ));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-300 to-white p-4">
      <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-2xl shadow-xl max-w-3xl w-full p-8 space-y-6">
        {loading && (
          <div className="text-center py-12">
            <svg
              className="animate-spin h-10 w-10 text-violet-600 mx-auto mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <p className="text-gray-600">Predicting your disease…</p>
          </div>
        )}

        {!loading && error && (
          <div className="text-center text-red-600 py-8">
            <p>Error: {error}</p>
            <button
              onClick={() => navigate('/question-type')}
              className="mt-4 px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition"
            >
              Go back to Survey
            </button>
          </div>
        )}

        {!loading && !error && responseData && (
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-violet-600 text-center">
              Prediction Result
            </h2>

            <div className="text-center">
              <p className="text-lg text-gray-800">
                <strong>Disease:</strong>{' '}
                <span className="font-medium">{responseData.disease}</span>
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Recommended Advice
              </h3>
              <div>{renderRemedyText(responseData.remedy)}</div>
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate('/question-type')}
                className="px-5 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition"
              >
                Predict Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
