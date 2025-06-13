import express from 'express';
import { auth } from '../middleware/auth';
import {
  generateGoalSuggestions,
  generateTaskBreakdown,
  optimizeSchedule
} from '../services/openaiService';

const router = express.Router();

// All routes require authentication
router.use(auth);

// Get AI-generated goal suggestions
router.get('/goals/suggestions', async (req, res) => {
  try {
    const suggestions = await generateGoalSuggestions(req.user!._id);
    res.json({ suggestions });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate goal suggestions' });
  }
});

// Get AI-generated task breakdown for a goal
router.get('/goals/:goalId/tasks', async (req, res) => {
  try {
    const breakdown = await generateTaskBreakdown(req.params.goalId);
    res.json({ breakdown });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate task breakdown' });
  }
});

// Get AI-optimized schedule
router.get('/schedule/optimize', async (req, res) => {
  try {
    const schedule = await optimizeSchedule(req.user!._id);
    res.json({ schedule });
  } catch (error) {
    res.status(500).json({ error: 'Failed to optimize schedule' });
  }
});

export default router; 