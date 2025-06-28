import React, { useState, useEffect } from "react";
import { getEvents, createEvent, deleteEvent } from "../services/calendar";

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    getEvents(token)
      .then((data) => setEvents(data))
      .catch(() => setError("Failed to load events"))
      .finally(() => setLoading(false));
  }, [token]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !start || !end || !token) return;
    setLoading(true);
    setError("");
    try {
      const event = await createEvent(token, {
        summary: title,
        start: { dateTime: new Date(start).toISOString() },
        end: { dateTime: new Date(end).toISOString() },
      });
      setEvents([event, ...events]);
      setTitle("");
      setStart("");
      setEnd("");
    } catch {
      setError("Failed to add event");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventId: string) => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      await deleteEvent(token, eventId);
      setEvents(events.filter((e) => e.id !== eventId));
    } catch {
      setError("Failed to delete event");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="goals-section">
        <h2>Calendar</h2>
        <p>Please log in to view your calendar.</p>
      </div>
    );
  }

  return (
    <div className="goals-section">
      <h2>Calendar</h2>
      <form onSubmit={handleAdd} className="goal-input-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event title"
          className="goal-input"
          disabled={loading}
        />
        <input
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="goal-input"
          disabled={loading}
        />
        <input
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="goal-input"
          disabled={loading}
        />
        <button
          type="submit"
          className="submit-button"
          disabled={loading || !title || !start || !end}
        >
          Add Event
        </button>
      </form>
      {error && <div className="goal-error">{error}</div>}
      {loading && <div>Loading...</div>}
      <div className="goals-list">
        {events.map((event) => (
          <div key={event.id} className="goal-item">
            <div>
              <b>{event.summary}</b>
            </div>
            <div>
              {event.start?.dateTime
                ? new Date(event.start.dateTime).toLocaleString()
                : ""}{" "}
              -{" "}
              {event.end?.dateTime
                ? new Date(event.end.dateTime).toLocaleString()
                : ""}
            </div>
            <button
              className="delete-goal-btn"
              onClick={() => handleDelete(event.id)}
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

export default Calendar;
