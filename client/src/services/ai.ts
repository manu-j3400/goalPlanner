export const callAI = async (token: string, prompt: string) => {
  const res = await fetch('/api/ai/ask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ prompt })
  });
  if (!res.ok) throw new Error('AI request failed');
  return res.json();
}; 