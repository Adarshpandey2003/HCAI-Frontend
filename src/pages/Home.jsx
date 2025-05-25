import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="text-center space-y-6">
      <h1 className="text-4xl font-bold">Predict Your Condition in Seconds</h1>
      <p className="text-lg">Our AI-powered model analyzes your symptoms to suggest possible conditions and home remedies.</p>
      <div className="space-x-4">
        <Link to="/survey" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">Try It Now</Link>
        <Link to="/vision" className="px-6 py-3 border border-blue-600 rounded hover:bg-blue-50">Learn More</Link>
      </div>

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl font-semibold">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="p-4 bg-white rounded shadow text-center">
            <p className="font-bold">1. Answer Questions</p>
            <p>Select symptoms you’re experiencing.</p>
          </div>
          <div className="p-4 bg-white rounded shadow text-center">
            <p className="font-bold">2. Get Prediction</p>
            <p>Our model classifies possible conditions.</p>
          </div>
          <div className="p-4 bg-white rounded shadow text-center">
            <p className="font-bold">3. View Remedies</p>
            <p>Receive home remedy suggestions.</p>
          </div>
        </div>
      </section>
    </div>
  );
}