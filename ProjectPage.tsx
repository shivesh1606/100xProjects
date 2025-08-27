import { useState, useEffect } from 'react';
import { getProjects } from '../utils/localStorage';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  return (
    <div>
      <h2>All Projects</h2>
      <div className="projects-grid">
        {projects.length > 0 ? (
          projects.map((project) => (
            <Link key={project.id} to={`/projects/${project.id}`}>
              <ProjectCard project={project} />
            </Link>
          ))
        ) : (
          <p>No projects submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;