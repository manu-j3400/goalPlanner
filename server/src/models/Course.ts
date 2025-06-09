import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  name: string;
  code: string;
  description: string;
  startDate: Date;
  endDate: Date;
  userId: mongoose.Types.ObjectId;
  syllabus: {
    topics: Array<{
      title: string;
      description: string;
      dueDate: Date;
      status: 'pending' | 'in_progress' | 'completed';
    }>;
    assignments: Array<{
      title: string;
      description: string;
      dueDate: Date;
      status: 'pending' | 'in_progress' | 'completed';
      priority: 'low' | 'medium' | 'high';
    }>;
    exams: Array<{
      title: string;
      date: Date;
      topics: string[];
      status: 'pending' | 'completed';
    }>;
  };
}

const CourseSchema: Schema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  syllabus: {
    topics: [{
      title: { type: String, required: true },
      description: { type: String },
      dueDate: { type: Date },
      status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed'],
        default: 'pending'
      }
    }],
    assignments: [{
      title: { type: String, required: true },
      description: { type: String },
      dueDate: { type: Date, required: true },
      status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed'],
        default: 'pending'
      },
      priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
      }
    }],
    exams: [{
      title: { type: String, required: true },
      date: { type: Date, required: true },
      topics: [{ type: String }],
      status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
      }
    }]
  }
}, {
  timestamps: true
});

export default mongoose.model<ICourse>('Course', CourseSchema); 