import { useParams } from 'react-router-dom';
import { getProjects } from '../utils/localStorage';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const projects = getProjects();
  const project = projects.find((p) => p.id === parseInt(projectId));

  if (!project) {
    return <div>Project not found!</div>;
  }

  return (
    <div>
      <h2>{project.title}</h2>
      <p><strong>Description:</strong> {project.description}</p>
      <p><strong>Executive Summary:</strong> {project.executiveSummary}</p>
      <p><strong>Medium Article:</strong> <a href={project.mediumUrl}>{project.mediumUrl}</a></p>
      <p><strong>Live Demo:</strong> <a href={project.liveDemoUrl}>{project.liveDemoUrl}</a></p>
      <div>
        <h3>Media Previews:</h3>
        {project.files.map((file, index) => (
          <div key={index}>
            {file.type.startsWith('image') ? (
              <img src={file.url} alt={file.name} style={{ maxWidth: '100%', height: 'auto' }} />
            ) : (
              <p>📄 <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a></p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetails;