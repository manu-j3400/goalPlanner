export const getGoals = async (token: string) => {
  const res = await fetch('/api/goals', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch goals');
  return res.json();
};

export const createGoal = async (token: string, goal: any) => {
  const res = await fetch('/api/goals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(goal)
  });
  if (!res.ok) throw new Error('Failed to create goal');
  return res.json();
};

export const deleteGoal = async (token: string, goalId: string) => {
  const res = await fetch(`/api/goals/${goalId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to delete goal');
  return res.json();
}; 