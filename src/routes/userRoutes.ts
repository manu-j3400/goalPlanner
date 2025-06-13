import express, { RequestHandler } from 'express';
import { register, login, getProfile, updateProfile, deleteUser } from '../controllers/userController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/register', register as RequestHandler);
router.post('/login', login as RequestHandler);

// Protected routes
router.get('/profile', auth, getProfile as unknown as RequestHandler);
router.patch('/profile', auth, updateProfile as unknown as RequestHandler);
router.delete('/profile', auth, deleteUser as unknown as RequestHandler);

export default router; 