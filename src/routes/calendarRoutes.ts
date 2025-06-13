import express from 'express';
import { auth } from '../middleware/auth';
import {
  createCalendarEvent,
  getCalendarEvents,
  updateCalendarEvent,
  deleteCalendarEvent
} from '../services/googleCalendar';

const router = express.Router();

// All routes require authentication
router.use(auth);

// Create a new calendar event
router.post('/events', async (req, res) => {
  try {
    const event = await createCalendarEvent(req.user!._id, req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: 'Error creating calendar event' });
  }
});

// Get calendar events for a date range
router.get('/events', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Start date and end date are required' });
    }

    const events = await getCalendarEvents(
      req.user!._id,
      new Date(startDate as string),
      new Date(endDate as string)
    );
    res.json(events);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching calendar events' });
  }
});

// Update a calendar event
router.patch('/events/:eventId', async (req, res) => {
  try {
    const event = await updateCalendarEvent(req.user!._id, req.params.eventId, req.body);
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: 'Error updating calendar event' });
  }
});

// Delete a calendar event
router.delete('/events/:eventId', async (req, res) => {
  try {
    await deleteCalendarEvent(req.user!._id, req.params.eventId);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting calendar event' });
  }
});

export default router; 