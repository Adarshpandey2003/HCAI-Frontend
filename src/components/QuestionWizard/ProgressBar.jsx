import React from 'react';

export default function ProgressBar({ step, total }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-blue-600 h-2 rounded-full"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}