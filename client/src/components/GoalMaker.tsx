import React, { useState } from 'react';

interface GoalMakerProps {}

const GoalMaker: React.FC<GoalMakerProps> = () => {
  const [goals, setGoals] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setGoals([...goals, inputValue.trim()]);
      setInputValue('');
    }
  };

  return (
    <div className="goals-section">
      <h2>Goal Maker</h2>
      <form onSubmit={handleSubmit} className="goal-input-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your goal here..."
          className="goal-input"
        />
        <button type="submit" className="submit-button">Add Goal</button>
      </form>
      
      <div className="goals-list">
        {goals.map((goal, index) => (
          <div key={index} className="goal-item">
            {goal}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalMaker; 