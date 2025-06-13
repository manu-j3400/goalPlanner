import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-decoration hero-decoration-1"></div>
        <div className="hero-decoration hero-decoration-2"></div>
        <div className="hero-content">
          <h1>Welcome to Goal Planner</h1>
          <p className="subtitle">Your personal roadmap to success. Plan your goals, set your schedule, and achieve your dreams with our intuitive planning tool.</p>
          <Link to="/goals" className="get-started-button">Get Started</Link>
        </div>
        <div className="hero-graphic">
          <svg width="500" height="400" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background Elements */}
            <circle cx="250" cy="200" r="180" fill="#2D2D2D" />
            <circle cx="250" cy="200" r="150" fill="#3D3D3D" />
            
            {/* Goal Path */}
            <path d="M100 200 C 150 100, 350 100, 400 200" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="8 8" />
            
            {/* Checkpoints */}
            <circle cx="150" cy="150" r="15" fill="#FFFFFF" />
            <circle cx="250" cy="120" r="15" fill="#FFFFFF" />
            <circle cx="350" cy="150" r="15" fill="#FFFFFF" />
            
            {/* Goal Icon */}
            <path d="M380 200 L400 220 L420 180" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Decorative Elements */}
            <circle cx="100" cy="100" r="5" fill="#FFFFFF" opacity="0.5" />
            <circle cx="400" cy="300" r="5" fill="#FFFFFF" opacity="0.5" />
            <circle cx="150" cy="300" r="5" fill="#FFFFFF" opacity="0.5" />
            <circle cx="350" cy="100" r="5" fill="#FFFFFF" opacity="0.5" />
          </svg>
        </div>
      </div>

      <div className="features-section">
        <div className="feature-card">
          <h3>1. Set Your Goals</h3>
          <p>Use our intuitive goal maker to define what you want to achieve. Break down big dreams into manageable tasks.</p>
        </div>

        <div className="feature-card">
          <h3>2. Customize Your Schedule</h3>
          <p>Tell us about your daily routine, preferred working hours, and meal times to create a schedule that works for you.</p>
        </div>

        <div className="feature-card">
          <h3>3. Track Your Progress</h3>
          <p>Monitor your achievements and stay motivated as you work towards your goals.</p>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Start Your Journey?</h2>
        <p>Begin by setting your preferences and creating your first goal.</p>
        <div className="cta-buttons">
          <Link to="/preferences" className="cta-button">Set Preferences</Link>
          <Link to="/goals" className="cta-button">Create Goals</Link>
        </div>
      </div>
    </div>
  );
};

export default Home; 