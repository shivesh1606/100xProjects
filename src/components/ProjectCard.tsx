import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EditIcon } from './Icons';
import { useAuth } from '../contexts/AuthContext';

type Project = {
  id: number;
  title: string;
  description: string;
  author?: string;
  // ...other fields as needed...
};

interface ProjectCardProps {
  project: Project;
}

// --- Component: ProjectCard (Normally in src/components/ProjectCard.tsx) ---
const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="relative">
      <Link to={`/projects/${project.id}`} className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
        <div className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 truncate">{project.title}</h3>
          <p className="text-gray-600 text-sm mb-4 h-16 sm:h-20 overflow-hidden">{project.description}</p>
          <div className="flex items-center text-xs sm:text-sm text-gray-500">
            <span className="font-semibold">{project.author || 'Anonymous'}</span>
          </div>
        </div>
        <div className="bg-gray-50 px-4 sm:px-6 py-2 sm:py-3">
          <span className="text-blue-600 group-hover:text-blue-800 font-semibold text-sm">View Details &rarr;</span>
        </div>
      </Link>
      {user && user === project.author && (
        <button
          className="absolute top-2 right-2 bg-gray-100 rounded-full p-2 hover:bg-blue-100"
          title="Edit Project"
          onClick={() => navigate(`/projects/${project.id}/edit`)}
        >
          <EditIcon />
        </button>
      )}
    </div>
  );
};

export default ProjectCard;