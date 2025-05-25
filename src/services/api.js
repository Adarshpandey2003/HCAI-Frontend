// src/services/api.js
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export async function postSurvey(answers) {
  const res = await fetch(`${API_BASE}/predict`, {
    // …
  });
  return res.json();
}
