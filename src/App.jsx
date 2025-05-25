// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

import Landing from './pages/Landing';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import OurTeam from './pages/OurTeam';
import OurVision from './pages/OurVision';
import Survey from './pages/Survey';
import Results from './pages/Results';

import RequireAuth from './components/Auth/RequireAuth';
import Navbar from './components/Common/Header';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Public */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/team" element={<OurTeam />} />
          <Route path="/vision" element={<OurVision />} />

          {/* Protected */}
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<Home />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/results" element={<Results />} />
            
            
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
