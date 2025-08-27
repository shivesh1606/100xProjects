const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/projects`;

function getAuthHeader() {
  const token = localStorage.getItem('jwt_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const getProjects = async () => {
  const res = await fetch(BASE_URL, {
    headers: { ...getAuthHeader() }
  });
  if (!res.ok) throw new Error('Failed to fetch projects');
  return await res.json();
};

export const addProject = async (project: any) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...getAuthHeader()
  };
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(project),
  });
  if (!res.ok) throw new Error('Failed to add project');
  return await res.json();
};

export const updateProject = async (id: string, project: any) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify(project),
  });
  if (!res.ok) throw new Error('Failed to update project');
  return await res.json();
};

export const getPublicProjects = async () => {
  const res = await fetch(`${BASE_URL}/public`);
  if (!res.ok) throw new Error('Failed to fetch public projects');
  return await res.json();
};
