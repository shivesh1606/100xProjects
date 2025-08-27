import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import { PlusIcon } from '../components/Icons';
import { getProjects } from '../utils/localStorage';

type Project = {
  id: number;
  title: string;
  description: string;
  author?: string;
  // ...other fields as needed...
};

// --- Page: ProjectsPage (Normally in src/pages/ProjectsPage.tsx) ---
const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
        setProjects(getProjects());
        setLoading(false);
    }, 500);
  }, []);

  if (loading) {
      return <div className="text-center py-10">Loading projects...</div>
  }

  return (
    <div className="w-full px-2 sm:px-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">All Projects</h1>
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 sm:py-20 bg-white rounded-lg shadow-md max-w-lg mx-auto">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">No Projects Yet</h2>
            <p className="text-gray-500 mb-6">Be the first one to submit a project!</p>
            <Link to="/" className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <PlusIcon /> <span className="ml-2">Submit a Project</span>
            </Link>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
