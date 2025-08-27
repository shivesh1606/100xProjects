// --- Helper Functions (Normally in src/utils/localStorage.js) ---
const PROJECTS_KEY = 'projects_data';

export const getProjects = () => {
  try {
    const projects = localStorage.getItem(PROJECTS_KEY);
    return projects ? JSON.parse(projects) : [];
  } catch (error) {
    console.error("Error parsing projects from localStorage", error);
    return [];
  }
};

export const saveProjects = (projects) => {
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  } catch (error)
  {
    console.error("Error saving projects to localStorage", error);
  }
};
