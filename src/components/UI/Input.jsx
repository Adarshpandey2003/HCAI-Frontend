import React from 'react';

export default function Input({ label, ...props }) {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1 text-sm font-medium">{label}</label>}
      <input
        {...props}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
}