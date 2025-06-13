import express, { Router } from 'express';
import { auth } from '../middleware/auth';
import {
  createGoal,
  getGoals,
  getGoal,
  updateGoal,
  deleteGoal,
  updateProgress,
  addMilestone,
  updateMilestone
} from '../controllers/goalController';

const router: Router = express.Router();

// All routes require authentication
router.use(auth);

// Basic CRUD operations
router.post('/', createGoal);
router.get('/', getGoals);
router.get('/:id', getGoal);
router.patch('/:id', updateGoal);
router.delete('/:id', deleteGoal);

// Progress and milestone operations
router.patch('/:id/progress', updateProgress);
router.post('/:id/milestones', addMilestone);
router.patch('/:id/milestones/:milestoneId', updateMilestone);

export default router; 