import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '../components/UI';

export default function Results() {
  const { state } = useLocation();
  const { res } = state || {};

  if (!res) {
    return <p className="text-center">No results to display. <Link to="/survey" className="text-blue-600">Go back</Link></p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center">Prediction Results</h1>
      <p className="text-xl text-center">Predicted Disease: <strong>{res.label}</strong></p>
      <p className="text-center">Confidence: {Math.round(res.confidence * 100)}%</p>
      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Home Remedies</h2>
        <ul className="list-disc list-inside space-y-2 mt-4">
          {res.remedies.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </section>
      <div className="text-center mt-6">
        <Link to="/survey">
          <Button>Try Again</Button>
        </Link>
      </div>
    </div>
  );
}