export const getGoogleOAuthUrl = async () => {
  const res = await fetch('/api/auth/google/url');
  if (!res.ok) throw new Error('Failed to get Google OAuth URL');
  return res.json();
};

export const handleGoogleCallback = async (code: string) => {
  const res = await fetch('/api/auth/google/callback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  });
  if (!res.ok) throw new Error('Failed to exchange code for tokens');
  return res.json();
};

export const refreshGoogleToken = async (refreshToken: string) => {
  const res = await fetch('/api/auth/google/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken })
  });
  if (!res.ok) throw new Error('Failed to refresh Google token');
  return res.json();
}; 