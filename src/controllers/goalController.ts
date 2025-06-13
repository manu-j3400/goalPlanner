import { Request, Response } from 'express';
import { Goal, IGoal } from '../models/Goal';

// Create a new goal
export const createGoal = async (req: Request, res: Response): Promise<void> => {
  try {
    const goal = new Goal({
      ...req.body,
      user: req.user?._id
    });
    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    res.status(400).json({ error: 'Error creating goal' });
  }
};

// Get all goals for a user
export const getGoals = async (req: Request, res: Response): Promise<void> => {
  try {
    const goals = await Goal.find({ user: req.user?._id })
      .populate('relatedCourses')
      .sort({ createdAt: -1 });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching goals' });
  }
};

// Get a single goal
export const getGoal = async (req: Request, res: Response): Promise<void> => {
  try {
    const goal = await Goal.findOne({ _id: req.params.id, user: req.user?._id })
      .populate('relatedCourses');
    
    if (!goal) {
      res.status(404).json({ error: 'Goal not found' });
      return;
    }
    
    res.json(goal);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching goal' });
  }
};

// Update a goal
export const updateGoal = async (req: Request, res: Response): Promise<void> => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['title', 'description', 'category', 'priority', 'status', 
                         'startDate', 'targetDate', 'progress', 'milestones', 'relatedCourses'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    res.status(400).json({ error: 'Invalid updates' });
    return;
  }

  try {
    const goal = await Goal.findOne({ _id: req.params.id, user: req.user?._id });
    
    if (!goal) {
      res.status(404).json({ error: 'Goal not found' });
      return;
    }

    updates.forEach(update => {
      (goal as any)[update] = req.body[update];
    });
    await goal.save();
    res.json(goal);
  } catch (error) {
    res.status(400).json({ error: 'Error updating goal' });
  }
};

// Delete a goal
export const deleteGoal = async (req: Request, res: Response): Promise<void> => {
  try {
    const goal = await Goal.findOneAndDelete({ _id: req.params.id, user: req.user?._id });
    
    if (!goal) {
      res.status(404).json({ error: 'Goal not found' });
      return;
    }
    
    res.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting goal' });
  }
};

// Update goal progress
export const updateProgress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { progress } = req.body;
    const goal = await Goal.findOne({ _id: req.params.id, user: req.user?._id });
    
    if (!goal) {
      res.status(404).json({ error: 'Goal not found' });
      return;
    }

    goal.progress = progress;
    if (progress === 100) {
      goal.status = 'completed';
    } else if (progress > 0) {
      goal.status = 'in_progress';
    }
    
    await goal.save();
    res.json(goal);
  } catch (error) {
    res.status(400).json({ error: 'Error updating progress' });
  }
};

// Add milestone to goal
export const addMilestone = async (req: Request, res: Response): Promise<void> => {
  try {
    const goal = await Goal.findOne({ _id: req.params.id, user: req.user?._id });
    
    if (!goal) {
      res.status(404).json({ error: 'Goal not found' });
      return;
    }

    goal.milestones.push(req.body);
    await goal.save();
    res.json(goal);
  } catch (error) {
    res.status(400).json({ error: 'Error adding milestone' });
  }
};

// Update milestone status
export const updateMilestone = async (req: Request, res: Response): Promise<void> => {
  try {
    const { milestoneId } = req.params;
    const goal = await Goal.findOne({ _id: req.params.id, user: req.user?._id });
    
    if (!goal) {
      res.status(404).json({ error: 'Goal not found' });
      return;
    }

    const milestone = goal.milestones.find(m => m._id?.toString() === milestoneId);
    if (!milestone) {
      res.status(404).json({ error: 'Milestone not found' });
      return;
    }

    Object.assign(milestone, req.body);
    await goal.save();
    res.json(goal);
  } catch (error) {
    res.status(400).json({ error: 'Error updating milestone' });
  }
}; 