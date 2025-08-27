import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProject } from '../utils/projectsApi';
import { useAuth } from '../contexts/AuthContext';

type ProjectFile = {
  name: string;
  url: string;
  type: string;
};

type Project = {
  id?: number;
  title: string;
  description: string;
  mediumUrl: string;
  executiveSummary: string;
  liveDemoUrl: string;
  files: ProjectFile[];
  author?: string;
  visibility?: 'public' | 'private';
};

// --- Component: ProjectForm (Normally in src/components/ProjectForm.tsx) ---
const ProjectForm: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState<Project>({
    title: '',
    description: '',
    mediumUrl: '',
    executiveSummary: '',
    liveDemoUrl: '',
    files: [],
    visibility: 'public',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 'public' : 'private') : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const filePreviews: ProjectFile[] = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        filePreviews.push({ name: file.name, url: reader.result as string, type: file.type });
        if (filePreviews.length === files.length) {
          setProject((prev) => ({ ...prev, files: [...prev.files, ...filePreviews] }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addProject({ ...project, author: user || "Anonymous" });
      setIsSubmitting(false);
      navigate('/projects');
    } catch (error) {
      setIsSubmitting(false);
      alert('Error submitting project');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-2 sm:px-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">Submit a New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-4 sm:p-8 rounded-lg shadow-md">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
          <input type="text" name="title" id="title" value={project.title} onChange={handleChange} placeholder="e.g., My Awesome App" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"/>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea name="description" id="description" value={project.description} onChange={handleChange} placeholder="A detailed description of your project." required rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"></textarea>
        </div>
        <div>
          <label htmlFor="executiveSummary" className="block text-sm font-medium text-gray-700 mb-1">Executive Summary</label>
          <textarea name="executiveSummary" id="executiveSummary" value={project.executiveSummary} onChange={handleChange} placeholder="A short and concise summary." required rows="2" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"></textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="mediumUrl" className="block text-sm font-medium text-gray-700 mb-1">Medium Article URL</label>
              <input type="url" name="mediumUrl" id="mediumUrl" value={project.mediumUrl} onChange={handleChange} placeholder="https://medium.com/..." className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"/>
            </div>
            <div>
              <label htmlFor="liveDemoUrl" className="block text-sm font-medium text-gray-700 mb-1">Live Demo URL</label>
              <input type="url" name="liveDemoUrl" id="liveDemoUrl" value={project.liveDemoUrl} onChange={handleChange} placeholder="https://yourapp.com" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"/>
            </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Media</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>Upload files</span>
                  <input id="file-upload" name="file-upload" type="file" multiple onChange={handleFileChange} className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        {project.files.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">File Previews:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {project.files.map((file, index) => (
                <div key={index} className="relative">
                  {(file.type && file.type.startsWith('image')) ? (
                    <img src={file.url} alt={file.name} className="rounded-lg object-cover h-28 w-full" />
                  ) : (
                    <div className="flex items-center justify-center h-28 w-full bg-gray-100 rounded-lg">
                       <span className="text-sm text-gray-500 truncate px-2">{file.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="visibility"
              checked={project.visibility === 'public'}
              onChange={handleChange}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">Public (uncheck for Private)</span>
          </label>
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 transition-colors">
          {isSubmitting ? 'Submitting...' : 'Submit Project'}
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;