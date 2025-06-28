import React, { useState, useEffect } from "react";
import { getGoals, createGoal, deleteGoal } from "../services/goals";

const GoalMaker: React.FC = () => {
  const [goals, setGoals] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    getGoals(token)
      .then(setGoals)
      .catch(() => setError("Failed to load goals"))
      .finally(() => setLoading(false));
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !token) return;
    setLoading(true);
    setError("");
    try {
      // For demo, only title is required. Backend expects more, but let's keep it simple.
      const newGoal = await createGoal(token, {
        title: inputValue.trim(),
        description: inputValue.trim(),
        category: "personal",
        priority: "medium",
        status: "not_started",
        startDate: new Date(),
        targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
      });
      setGoals([newGoal, ...goals]);
      setInputValue("");
    } catch {
      setError("Failed to add goal");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (goalId: string) => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      await deleteGoal(token, goalId);
      setGoals(goals.filter((g) => g._id !== goalId));
    } catch {
      setError("Failed to delete goal");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="goals-section">
        <h2>Goal Maker</h2>
        <p>Please log in to manage your goals.</p>
      </div>
    );
  }

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
          disabled={loading}
        />
        <button
          type="submit"
          className="submit-button"
          disabled={loading || !inputValue.trim()}
        >
          Add Goal
        </button>
      </form>
      {error && <div className="goal-error">{error}</div>}
      {loading && <div>Loading...</div>}
      <div className="goals-list">
        {goals.map((goal) => (
          <div key={goal._id} className="goal-item">
            {goal.title}
            <button
              className="delete-goal-btn"
              onClick={() => handleDelete(goal._id)}
              disabled={loading}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalMaker;
