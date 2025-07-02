import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import goalRoutes from './routes/goalRoutes';
import authRoutes from './routes/authRoutes';
import calendarRoutes from './routes/calendarRoutes';
import aiRoutes from './routes/aiRoutes';


const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());


// Routes
app.use('/api/users', userRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
  res.send('API server is running. Frontend is available at ' + (process.env.FRONTEND_URL || 'http://localhost:3000'));
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/goalPlanner')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 