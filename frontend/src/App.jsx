import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import SkillManager from './pages/SkillManager';
import SprintOverview from './pages/SprintOverview';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useTheme } from './context/ThemeContext';

const App = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={theme}>
      <header>
        <h1>SkillVault</h1>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <nav>
          <Link to="/">Skills</Link>
          <Link to="/sprints">Sprints</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          <button onClick={logout}>Logout</button>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<SkillManager />} />
        <Route path="/sprints" element={<SprintOverview />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
