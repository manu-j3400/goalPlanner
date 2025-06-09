import mongoose, { Schema, Document } from 'mongoose';

export interface IGoal extends Document {
  title: string;
  description: string;
  category: string;
  startDate: Date;
  targetDate: Date;
  status: 'not_started' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  progress: number;
  userId: mongoose.Types.ObjectId;
  subTasks: Array<{
    title: string;
    completed: boolean;
    dueDate: Date;
  }>;
}

const GoalSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  startDate: { type: Date, required: true },
  targetDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['not_started', 'in_progress', 'completed'],
    default: 'not_started'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  subTasks: [{
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    dueDate: { type: Date }
  }]
}, {
  timestamps: true
});

export default mongoose.model<IGoal>('Goal', GoalSchema); 