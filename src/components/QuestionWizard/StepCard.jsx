import React from 'react';

export default function StepCard({ question, onAnswer }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{question.text}</h2>
      <div className="flex space-x-4 justify-center">
        <button
          onClick={() => onAnswer(question.id, true)}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >Yes</button>
        <button
          onClick={() => onAnswer(question.id, false)}
          className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
        >No</button>
      </div>
    </div>
  );
}