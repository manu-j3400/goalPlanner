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
      <div className="goals-section redesigned-calendar">
        <h2 className="calendar-title">Calendar</h2>
        <p className="calendar-motivation">
          Plan your events and stay on track!
        </p>
        <p>Please log in to view your calendar.</p>
      </div>
    );
  }

  return (
    <div className="goals-section redesigned-calendar">
      <h2 className="calendar-title">Your Smart Calendar</h2>
      <p className="calendar-motivation">
        Add events, visualize your progress, and make every day count!
      </p>
      <form onSubmit={handleAdd} className="calendar-form">
        <div className="calendar-form-group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event title"
            className="calendar-input"
            disabled={loading}
            required
          />
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="calendar-input"
            disabled={loading}
            required
          />
          <input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="calendar-input"
            disabled={loading}
            required
          />
          <button
            type="submit"
            className="get-started-button calendar-add-btn"
            disabled={loading || !title || !start || !end}
          >
            Add Event
          </button>
        </div>
      </form>
      {error && <div className="goal-error">{error}</div>}
      {loading && <div>Loading...</div>}
      <div className="calendar-events-list">
        {events.length === 0 ? (
          <div className="calendar-empty">
            No events yet. Start by adding one above!
          </div>
        ) : (
          events.map((event) => (
            <div key={event.id} className="calendar-event-card">
              <div className="calendar-event-title">{event.summary}</div>
              <div className="calendar-event-time">
                {event.start?.dateTime
                  ? new Date(event.start.dateTime).toLocaleString()
                  : ""}{" "}
                -{" "}
                {event.end?.dateTime
                  ? new Date(event.end.dateTime).toLocaleString()
                  : ""}
              </div>
              <button
                className="calendar-delete-btn"
                onClick={() => handleDelete(event.id)}
                disabled={loading}
                title="Delete event"
              >
                &times;
              </button>
            </div>
          ))
        )}
      </div>
      <style>{`
        .redesigned-calendar {
          background: var(--medium-gray);
          border-radius: 16px;
          padding: 2.5rem 2rem;
          box-shadow: 0 4px 24px rgba(0,0,0,0.12);
          max-width: 900px;
          margin: 2rem auto;
        }
        .calendar-title {
          font-size: 2.2rem;
          font-family: var(--heading-font);
          margin-bottom: 0.5rem;
        }
        .calendar-motivation {
          color: #b3e5fc;
          font-size: 1.1rem;
          margin-bottom: 2rem;
        }
        .calendar-form {
          margin-bottom: 2.5rem;
        }
        .calendar-form-group {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          align-items: center;
          background: var(--light-gray);
          border-radius: 10px;
          padding: 1.2rem 1rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .calendar-input {
          padding: 0.6rem;
          border-radius: 4px;
          border: 2px solid var(--dark-gray);
          background: var(--dark-gray);
          color: var(--white);
          font-size: 1rem;
          min-width: 180px;
        }
        .calendar-add-btn {
          font-size: 1.05rem;
          margin-left: 0.5rem;
        }
        .calendar-events-list {
          margin-top: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .calendar-event-card {
          background: var(--light-gray);
          border-radius: 10px;
          padding: 1.2rem 1rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }
        .calendar-event-title {
          font-weight: 600;
          font-size: 1.1rem;
        }
        .calendar-event-time {
          color: #b3e5fc;
          font-size: 1rem;
        }
        .calendar-delete-btn {
          background: none;
          border: none;
          color: #ff5252;
          font-size: 1.5rem;
          cursor: pointer;
          border-radius: 50%;
          width: 2.2rem;
          height: 2.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .calendar-delete-btn:hover {
          background: #ff5252;
          color: #fff;
        }
        .calendar-empty {
          color: #b3e5fc;
          font-size: 1.1rem;
          text-align: center;
          margin-top: 2rem;
        }
        @media (max-width: 900px) {
          .calendar-form-group {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Calendar;
