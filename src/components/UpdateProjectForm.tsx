import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProject } from '../utils/projectsApi';

type ProjectFile = {
  name: string;
  url: string;
  type: string;
};

type Project = {
  id?: string;
  title: string;
  description: string;
  mediumUrl: string;
  executiveSummary: string;
  liveDemoUrl: string;
  files: ProjectFile[];
  author?: string;
  visibility?: 'public' | 'private';
};

interface UpdateProjectFormProps {
  project: Project;
  onUpdated?: () => void;
}

const UpdateProjectForm: React.FC<UpdateProjectFormProps> = ({ project, onUpdated }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState<Project>(project);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateProject(form.id, form);
      setIsSubmitting(false);
      if (onUpdated) onUpdated();
      else navigate('/projects');
    } catch (error) {
      setIsSubmitting(false);
      alert('Error updating project');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-4 sm:p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Update Project</h2>
      <input type="text" name="title" value={form.title} onChange={handleChange} required className="w-full px-4 py-2 border rounded" placeholder="Title" />
      <textarea name="description" value={form.description} onChange={handleChange} required rows={4} className="w-full px-4 py-2 border rounded" placeholder="Description" />
      <textarea name="executiveSummary" value={form.executiveSummary} onChange={handleChange} required rows={2} className="w-full px-4 py-2 border rounded" placeholder="Executive Summary" />
      <input type="url" name="mediumUrl" value={form.mediumUrl} onChange={handleChange} className="w-full px-4 py-2 border rounded" placeholder="Medium Article URL" />
      <input type="url" name="liveDemoUrl" value={form.liveDemoUrl} onChange={handleChange} className="w-full px-4 py-2 border rounded" placeholder="Live Demo URL" />
      <select name="visibility" value={form.visibility || 'public'} onChange={handleChange} className="w-full px-4 py-2 border rounded">
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>
      <button type="submit" disabled={isSubmitting} className="w-full py-2 px-4 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700">
        {isSubmitting ? 'Updating...' : 'Update Project'}
      </button>
    </form>
  );
};

export default UpdateProjectForm;
