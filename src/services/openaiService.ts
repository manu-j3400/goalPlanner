import OpenAI from 'openai';
import { Goal } from '../models/Goal';
import { Course } from '../models/Course';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const generateGoalSuggestions = async (userId: string) => {
  try {
    const goals = await Goal.find({ user: userId });
    const courses = await Course.find({ user: userId });

    const prompt = `Based on the following user's goals and courses, suggest 3 new goals that would help them achieve their objectives:

Current Goals:
${goals.map(g => `- ${g.title}: ${g.description}`).join('\n')}

Current Courses:
${courses.map(c => `- ${c.name} (${c.code})`).join('\n')}

Please suggest 3 specific, measurable, achievable, relevant, and time-bound (SMART) goals.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4-turbo-preview",
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating goal suggestions:', error);
    throw new Error('Failed to generate goal suggestions');
  }
};

export const generateTaskBreakdown = async (goalId: string) => {
  try {
    const goal = await Goal.findById(goalId);
    if (!goal) {
      throw new Error('Goal not found');
    }

    const prompt = `Break down the following goal into specific tasks and milestones:

Goal: ${goal.title}
Description: ${goal.description}
Category: ${goal.category}
Priority: ${goal.priority}
Target Date: ${goal.targetDate}

Please provide a detailed breakdown of tasks and milestones that would help achieve this goal. Include estimated timeframes for each task.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4-turbo-preview",
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating task breakdown:', error);
    throw new Error('Failed to generate task breakdown');
  }
};

export const optimizeSchedule = async (userId: string) => {
  try {
    const goals = await Goal.find({ user: userId });
    const courses = await Course.find({ user: userId });

    const prompt = `Based on the following user's goals and courses, suggest an optimized weekly schedule:

Goals:
${goals.map(g => `- ${g.title} (Priority: ${g.priority})`).join('\n')}

Courses:
${courses.map(c => `- ${c.name} (${c.code})`).join('\n')}

Please suggest a balanced weekly schedule that accommodates both academic and personal goals, considering:
1. Study time for each course
2. Progress on goals
3. Breaks and personal time
4. Optimal time slots for different types of activities`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4-turbo-preview",
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error optimizing schedule:', error);
    throw new Error('Failed to optimize schedule');
  }
}; 