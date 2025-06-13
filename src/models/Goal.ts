import mongoose, { Document, Schema } from 'mongoose';

export interface IMilestone {
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
  _id?: mongoose.Types.ObjectId;
}

export interface IGoal extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  description: string;
  category: 'academic' | 'personal' | 'career' | 'health' | 'other';
  priority: 'low' | 'medium' | 'high';
  status: 'not_started' | 'in_progress' | 'completed';
  startDate: Date;
  targetDate: Date;
  progress: number;
  milestones: IMilestone[];
  relatedCourses: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const milestoneSchema = new Schema<IMilestone>({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  completed: { type: Boolean, default: false }
});

const goalSchema = new Schema<IGoal>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ['academic', 'personal', 'career', 'health', 'other'],
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true
  },
  status: {
    type: String,
    enum: ['not_started', 'in_progress', 'completed'],
    default: 'not_started'
  },
  startDate: { type: Date, required: true },
  targetDate: { type: Date, required: true },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  milestones: [milestoneSchema],
  relatedCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
}, {
  timestamps: true
});

export const Goal = mongoose.model<IGoal>('Goal', goalSchema); 