import mongoose, { Document, Schema } from 'mongoose';

export interface IAssignment {
  title: string;
  description?: string;
  dueDate: Date;
  completed: boolean;
  grade?: number;
  _id?: mongoose.Types.ObjectId;
}

export interface IExam {
  title: string;
  date: Date;
  location?: string;
  completed: boolean;
  grade?: number;
  _id?: mongoose.Types.ObjectId;
}

export interface ICourse extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  code: string;
  instructor: string;
  semester: string;
  startDate: Date;
  endDate: Date;
  description?: string;
  assignments: IAssignment[];
  exams: IExam[];
  syllabus?: string;
  goals: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const assignmentSchema = new Schema<IAssignment>({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, required: true },
  completed: { type: Boolean, default: false },
  grade: { type: Number, min: 0, max: 100 }
});

const examSchema = new Schema<IExam>({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String },
  completed: { type: Boolean, default: false },
  grade: { type: Number, min: 0, max: 100 }
});

const courseSchema = new Schema<ICourse>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  code: { type: String, required: true },
  instructor: { type: String, required: true },
  semester: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String },
  assignments: [assignmentSchema],
  exams: [examSchema],
  syllabus: { type: String },
  goals: [{ type: Schema.Types.ObjectId, ref: 'Goal' }]
}, {
  timestamps: true
});

export const Course = mongoose.model<ICourse>('Course', courseSchema); 