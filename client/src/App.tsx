import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import GoalMaker from './components/GoalMaker';
import Preferences from './components/Preferences';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="logo">
            <Link to="/" className="logo-link">GP</Link>
          </div>
          <nav className="main-nav">
            <Link to="/goals" className="nav-link">Goal Maker</Link>
            <Link to="/preferences" className="nav-link">Set Preferences</Link>
            <Link to="/goals" className="get-started-button">Get Started</Link>
          </nav>
        </header>
        
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/goals" element={<GoalMaker />} />
            <Route path="/preferences" element={<Preferences />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;