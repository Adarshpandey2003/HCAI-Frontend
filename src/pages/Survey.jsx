import React, { useEffect, useState } from 'react';
import Wizard from '../components/QuestionWizard/Wizard';
import { postSurvey } from '../services/api';
import { useNavigate } from 'react-router-dom';

const questions = [
  { id: 'fever', text: 'Do you have a fever?' },
  { id: 'cough', text: 'Do you have a cough?' },
  { id: 'fatigue', text: 'Are you feeling fatigued?' },
  // add more symptom questions here
];

export default function Survey() {
  const [result, setResult] = useState(null);
  const nav = useNavigate();

  async function handleComplete(answers) {
    const res = await postSurvey(answers);
    setResult(res);
    nav('/results', { state: { res } });
  }

  return (
    <div>
      {!result ? (
        <Wizard questions={questions} onComplete={handleComplete} />
      ) : (
        <p className="text-center">Submitting...</p>
      )}
    </div>
  );
}