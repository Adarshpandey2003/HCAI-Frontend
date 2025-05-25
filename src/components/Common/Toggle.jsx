import React from 'react';

export default function Toggle({ value, onToggle }) {
  return (
    <button
      onClick={() => onToggle(!value)}
      className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 transition-colors ${
        value ? 'bg-blue-600 justify-end' : 'justify-start'
      }`}
    >
      <div className="w-4 h-4 bg-white rounded-full shadow" />
    </button>
  );
}