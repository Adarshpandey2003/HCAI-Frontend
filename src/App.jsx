// src/App.jsx
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import MainLayout   from './layouts/MainLayout'
import Landing      from './pages/Landing'
import Login        from './pages/Login'
import Signup       from './pages/Signup'
import OurTeam      from './pages/OurTeam'
import OurVision    from './pages/OurVision'
import Home         from './pages/Home'
import QuestionType from './pages/QuestionType'
import SurveyPage   from './pages/Survey'
import Results      from './pages/Results'
import HistoryPage  from './pages/HistoryPage'
import DiseaseDetail from './pages/DiseaseDetail'

import RequireAuth    from './components/Auth/RequireAuth'
import HealthChatbot  from './components/HealthChatBot'

export default function App() {
  return (
    <BrowserRouter>
      {/* Floating health-only AI chatbot */}
      <HealthChatbot />

      <Routes>
        {/* everything is rendered inside MainLayout */}
        <Route element={<MainLayout />}>
          {/* — Public routes — */}
          <Route path="/"           element={<Landing />}  />
          <Route path="/login"      element={<Login />}    />
          <Route path="/signup"     element={<Signup />}   />
          <Route path="/team"       element={<OurTeam />}  />
          <Route path="/vision"     element={<OurVision />} />

          {/* — Protected routes — */}
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />

          <Route
            path="/question-type"
            element={
              <RequireAuth>
                <QuestionType />
              </RequireAuth>
            }
          />

          <Route
            path="/survey/:count"
            element={
              <RequireAuth>
                <SurveyPage />
              </RequireAuth>
            }
          />

          <Route
            path="/results"
            element={
              <RequireAuth>
                <Results />
              </RequireAuth>
            }
          />

          <Route
            path="/history"
            element={
              <RequireAuth>
                <HistoryPage />
              </RequireAuth>
            }
          />

          <Route
            path="/disease/:id"
            element={
              <RequireAuth>
                <DiseaseDetail />
              </RequireAuth>
            }
          />

          {/* — Catch-all / 404 fallback — */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
