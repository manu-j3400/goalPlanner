import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';

interface AuthRequest extends Request {
  user: any;
}

// Register a new user
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;
    const user = new User({ email, password, name });
    await user.save();
    
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'your-secret-key');
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: 'Error creating user' });
  }
};

// Login user
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !user.password) {
      throw new Error('Invalid login credentials');
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid login credentials');
    }
    
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'your-secret-key');
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: 'Invalid login credentials' });
  }
};

// Get user profile
export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profile' });
  }
};

// Update user profile
export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    res.status(400).json({ error: 'Invalid updates' });
    return;
  }

  try {
    updates.forEach(update => req.user[update] = req.body[update]);
    await req.user.save();
    res.json(req.user);
  } catch (error) {
    res.status(400).json({ error: 'Error updating profile' });
  }
};

// Delete user
export const deleteUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await req.user.remove();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
}; 