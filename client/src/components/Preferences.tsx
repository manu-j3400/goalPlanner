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
    <div className="preferences-section">
      <h2>Set Your Preferences</h2>
      <div className="preferences-form">
        <div className="preference-group">
          <label>Preferred Time of Day:</label>
          <select
            name="preferredTimeOfDay"
            value={preferences.preferredTimeOfDay}
            onChange={handleInputChange}
          >
            <option value="morning">Morning</option>
            <option value="evening">Evening</option>
            <option value="both">Both</option>
          </select>
        </div>
        <div className="preference-group">
          <label>Work Hours per Day:</label>
          <input
            type="number"
            name="workTimePerDay"
            value={preferences.workTimePerDay}
            onChange={handleInputChange}
            min="1"
            max="24"
          />
        </div>
        <div className="preference-group">
          <label>Sleep Hours:</label>
          <input
            type="number"
            name="sleepTime"
            value={preferences.sleepTime}
            onChange={handleInputChange}
            min="4"
            max="12"
          />
        </div>
        <div className="preference-group">
          <label>Bed Time:</label>
          <input
            type="time"
            name="bedTime"
            value={preferences.bedTime}
            onChange={handleInputChange}
          />
        </div>
        <div className="preference-group">
          <label>Wake Up Time:</label>
          <input
            type="time"
            name="wakeUpTime"
            value={preferences.wakeUpTime}
            onChange={handleInputChange}
          />
        </div>
        <div className="preference-group">
          <label>Number of Meals:</label>
          <input
            type="number"
            value={preferences.numberOfMeals}
            onChange={(e) => handleNumberOfMealsChange(Number(e.target.value))}
            min="1"
            max="6"
          />
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
              />
            </div>
          ))}
        </div>
        <button
          className="submit-button"
          onClick={handleSave}
          disabled={loading}
        >
          Save Preferences
        </button>
        {error && <div className="goal-error">{error}</div>}
        {success && <div className="goal-success">Preferences saved!</div>}
        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default Preferences;
