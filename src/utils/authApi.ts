const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (username: string, password: string) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  return await res.json(); // { access_token, token_type }
};

export const register = async (username: string, password: string) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error('Register failed');
  return await res.json();
};
