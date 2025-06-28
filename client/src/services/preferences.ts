export const getPreferences = async (token: string) => {
  const res = await fetch('/api/users/preferences', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch preferences');
  return res.json();
};

export const savePreferences = async (token: string, preferences: any) => {
  const res = await fetch('/api/users/preferences', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(preferences)
  });
  if (!res.ok) throw new Error('Failed to save preferences');
  return res.json();
}; 