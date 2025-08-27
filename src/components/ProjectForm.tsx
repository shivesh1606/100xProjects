import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects, saveProjects } from '../utils/localStorage';

const ProjectForm = () => {
  const navigate = useNavigate();
  const [project, setProject] = useState({
    title: '',
    description: '',
    mediumUrl: '',
    executiveSummary: '',
    liveDemoUrl: '',
    files: [], // To store file previews (data URLs)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const filePreviews = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        filePreviews.push({ name: file.name, url: reader.result, type: file.type });
        setProject((prev) => ({ ...prev, files: [...prev.files, ...filePreviews] }));
      };
      reader.readAsDataURL(file); // Reads file as a data URL for preview
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingProjects = getProjects();
    const newProject = { id: Date.now(), ...project };
    saveProjects([...existingProjects, newProject]);
    navigate('/projects');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... form inputs (title, description, etc.) ... */}
      <input
        type="text"
        name="title"
        value={project.title}
        onChange={handleChange}
        placeholder="Project Title"
        required
      />
      <textarea
        name="description"
        value={project.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      {/* ... more inputs ... */}
      <input type="file" multiple onChange={handleFileChange} />
      <div>
        {project.files.map((file, index) => (
          <div key={index}>
            {file.type.startsWith('image') ? (
              <img src={file.url} alt={file.name} width="100" />
            ) : (
              <p>📄 {file.name}</p>
            )}
          </div>
        ))}
      </div>
      <button type="submit">Submit Project</button>
    </form>
  );
};

export default ProjectForm;