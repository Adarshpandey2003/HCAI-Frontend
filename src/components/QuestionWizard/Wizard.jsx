import React from 'react';
import useSurvey from '../../hooks/useSurvey';
import StepCard from './StepCard';
import ProgressBar from './ProgressBar';

export default function Wizard({ questions }) {
  const { step, questions: qs, answers, answerQuestion } = useSurvey(questions);
  if (step >= qs.length) {
    return <p className="text-center">Thank you! Processing your results...</p>;
  }
  const q = qs[step];
  return (
    <div className="space-y-6">
      <ProgressBar step={step + 1} total={qs.length} />
      <StepCard question={q} onAnswer={answerQuestion} />
    </div>
  );
}