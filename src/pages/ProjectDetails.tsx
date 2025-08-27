// --- Page: ProjectDetails (Normally in src/pages/ProjectDetails.tsx) ---
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ExternalLinkIcon } from '../components/Icons';
import { getProjects } from '../utils/projectsApi';

type ProjectFile = {
  name: string;
  url: string;
  type: string;
};

type Project = {
  id: string; // was number
  title: string;
  description: string;
  mediumUrl: string;
  executiveSummary: string;
  liveDemoUrl: string;
  files: ProjectFile[];
  author?: string;
};

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  const { projectId } = useParams();
  const [fetchedProject, setFetchedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!project) {
      getProjects().then((projects) => {
        const foundProject = projects.find((p: Project) => p.id === projectId);
        setFetchedProject(foundProject);
      });
    } else {
      setFetchedProject(project);
    }
  }, [project, projectId]);

  const displayProject = project || fetchedProject;

  if (!displayProject) {
    return <div className="text-center py-10">Project not found!</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden px-2 sm:px-6">
        <div className="p-4 sm:p-8 md:p-12">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{displayProject.title}</h1>
            <p className="text-base sm:text-lg text-gray-600 mb-6">by <span className="font-semibold">{displayProject.author || 'Anonymous'}</span></p>

            <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-3">Description</h2>
                <p>{displayProject.description}</p>

                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-3">Executive Summary</h2>
                <p>{displayProject.executiveSummary}</p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
                {displayProject.mediumUrl && (
                    <a href={displayProject.mediumUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-900">
                        Read on Medium <ExternalLinkIcon />
                    </a>
                )}
                {displayProject.liveDemoUrl && (
                    <a href={displayProject.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                        Live Demo <ExternalLinkIcon />
                    </a>
                )}
            </div>
        </div>

      {displayProject.files && displayProject.files.length > 0 && (
        <div className="bg-gray-50 p-4 sm:p-8 md:p-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Media Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {displayProject.files.map((file, index) => (
              <div key={index} className="rounded-lg overflow-hidden border">
                {(file.type && file.type.startsWith('image')) ? (
                  <img src={file.url} alt={file.name} className="w-full h-32 sm:h-48 object-cover" />
                ) : (
                  <div className="w-full h-32 sm:h-48 bg-gray-200 flex items-center justify-center p-4">
                    <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:underline text-center">{file.name}</a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
