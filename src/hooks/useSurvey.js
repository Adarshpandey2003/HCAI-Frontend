import { useState } from 'react';

export default function useSurvey(questions = []) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  function answerQuestion(id, value) {
    setAnswers(prev => ({ ...prev, [id]: value }));
    setStep(prev => prev + 1);
  }

  return { step, questions, answers, answerQuestion };
}