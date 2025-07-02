export const register = async (email: string, password: string, name: string) => {
  const res = await fetch('/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name })
  });
  if (!res.ok) throw new Error('Registration failed');
  return res.json();
};

export const login = async (email: string, password: string) => {
  const res = await fetch('/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
};

export const getProfile = async (token: string) => {
  const res = await fetch('/api/user/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json();
}; 