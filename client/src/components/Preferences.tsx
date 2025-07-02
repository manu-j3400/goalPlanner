import React, { useState, useEffect } from "react";
import { getPreferences, savePreferences } from "../services/preferences";

interface PreferencesData {
  workTimePerDay: number;
  sleepTime: number;
  bedTime: string;
  wakeUpTime: string;
  mealTimes: string[];
  numberOfMeals: number;
  preferredTimeOfDay: "morning" | "evening" | "both";
}

const Preferences: React.FC = () => {
  const [preferences, setPreferences] = useState<PreferencesData>({
    workTimePerDay: 8,
    sleepTime: 8,
    bedTime: "22:00",
    wakeUpTime: "06:00",
    mealTimes: ["08:00", "13:00", "19:00"],
    numberOfMeals: 3,
    preferredTimeOfDay: "both",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    getPreferences(token)
      .then((data) => {
        if (data) setPreferences(data);
      })
      .catch(() => setError("Failed to load preferences"))
      .finally(() => setLoading(false));
  }, [token]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMealTimeChange = (index: number, value: string) => {
    const newMealTimes = [...preferences.mealTimes];
    newMealTimes[index] = value;
    setPreferences((prev) => ({
      ...prev,
      mealTimes: newMealTimes,
    }));
  };

  const handleNumberOfMealsChange = (value: number) => {
    const newMealTimes = Array(value)
      .fill("")
      .map((_, i) => preferences.mealTimes[i] || "12:00");
    setPreferences((prev) => ({
      ...prev,
      numberOfMeals: value,
      mealTimes: newMealTimes,
    }));
  };

  const handleSave = async () => {
    if (!token) return;
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      await savePreferences(token, preferences);
      setSuccess(true);
    } catch {
      setError("Failed to save preferences");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="preferences-section">
        <h2>Set Your Preferences</h2>
        <p>Please log in to manage your preferences.</p>
      </div>
    );
  }

  return (
    <div className="preferences-section redesigned-prefs">
      <h2 className="prefs-title">Personalize Your Day</h2>
      <p className="prefs-motivation">
        Shape your perfect routine to achieve your goals!
      </p>
      <div className="prefs-cards">
        <div className="prefs-card">
          <div className="prefs-card-header">
            <span role="img" aria-label="clock">
              ⏰
            </span>{" "}
            Work Preferences
          </div>
          <div className="preference-group">
            <label>Preferred Time of Day:</label>
            <select
              name="preferredTimeOfDay"
              value={preferences.preferredTimeOfDay}
              onChange={handleInputChange}
              className="prefs-select"
            >
              <option value="morning">🌅 Morning</option>
              <option value="evening">🌙 Evening</option>
              <option value="both">🌗 Both</option>
            </select>
          </div>
          <div className="preference-group">
            <label>Work Hours per Day:</label>
            <input
              type="range"
              name="workTimePerDay"
              min="1"
              max="12"
              value={preferences.workTimePerDay}
              onChange={handleInputChange}
              className="prefs-slider"
            />
            <span className="prefs-slider-value">
              {preferences.workTimePerDay} hrs
            </span>
          </div>
        </div>
        <div className="prefs-card">
          <div className="prefs-card-header">
            <span role="img" aria-label="sleep">
              😴
            </span>{" "}
            Sleep Preferences
          </div>
          <div className="preference-group">
            <label>Sleep Hours:</label>
            <input
              type="range"
              name="sleepTime"
              min="4"
              max="12"
              value={preferences.sleepTime}
              onChange={handleInputChange}
              className="prefs-slider"
            />
            <span className="prefs-slider-value">
              {preferences.sleepTime} hrs
            </span>
          </div>
          <div className="preference-group">
            <label>Bed Time:</label>
            <input
              type="time"
              name="bedTime"
              value={preferences.bedTime}
              onChange={handleInputChange}
              className="prefs-time"
            />
          </div>
          <div className="preference-group">
            <label>Wake Up Time:</label>
            <input
              type="time"
              name="wakeUpTime"
              value={preferences.wakeUpTime}
              onChange={handleInputChange}
              className="prefs-time"
            />
          </div>
        </div>
        <div className="prefs-card">
          <div className="prefs-card-header">
            <span role="img" aria-label="meal">
              🍽️
            </span>{" "}
            Meal Preferences
          </div>
          <div className="preference-group">
            <label>Number of Meals:</label>
            <input
              type="range"
              min="1"
              max="6"
              value={preferences.numberOfMeals}
              onChange={(e) =>
                handleNumberOfMealsChange(Number(e.target.value))
              }
              className="prefs-slider"
            />
            <span className="prefs-slider-value">
              {preferences.numberOfMeals}
            </span>
          </div>
          <div className="meal-times">
            <h3>Meal Times</h3>
            {preferences.mealTimes.map((time, index) => (
              <div key={index} className="preference-group">
                <label>Meal {index + 1}:</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => handleMealTimeChange(index, e.target.value)}
                  className="prefs-time"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        className="get-started-button prefs-save-btn"
        onClick={handleSave}
        disabled={loading}
      >
        Save Preferences
      </button>
      {error && <div className="goal-error">{error}</div>}
      {success && <div className="goal-success">Preferences saved!</div>}
      {loading && <div>Loading...</div>}
      <style>{`
        .redesigned-prefs {
          background: var(--medium-gray);
          border-radius: 16px;
          padding: 2.5rem 2rem;
          box-shadow: 0 4px 24px rgba(0,0,0,0.12);
          max-width: 900px;
          margin: 2rem auto;
        }
        .prefs-title {
          font-size: 2.2rem;
          font-family: var(--heading-font);
          margin-bottom: 0.5rem;
        }
        .prefs-motivation {
          color: #b3e5fc;
          font-size: 1.1rem;
          margin-bottom: 2rem;
        }
        .prefs-cards {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }
        .prefs-card {
          background: var(--light-gray);
          border-radius: 12px;
          padding: 1.5rem 1rem 1.5rem 1.5rem;
          flex: 1 1 250px;
          min-width: 250px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .prefs-card-header {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 1.2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .preference-group {
          display: flex;
          align-items: center;
          margin-bottom: 1.1rem;
          gap: 1rem;
        }
        .prefs-select, .prefs-time {
          padding: 0.5rem;
          border-radius: 4px;
          border: 2px solid var(--dark-gray);
          background: var(--dark-gray);
          color: var(--white);
          font-size: 1rem;
        }
        .prefs-slider {
          width: 120px;
        }
        .prefs-slider-value {
          min-width: 40px;
          text-align: right;
          font-weight: 500;
        }
        .prefs-save-btn {
          margin-top: 2rem;
          font-size: 1.1rem;
        }
        @media (max-width: 900px) {
          .prefs-cards {
            flex-direction: column;
            gap: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Preferences;
