import React from 'react';

const ProjectCard = ({ project }) => (
  <div style={{
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    margin: '0.5rem',
    background: '#fff'
  }}>
    <h3>{project.title}</h3>
    <p>{project.description?.slice(0, 100)}{project.description?.length > 100 ? '...' : ''}</p>
  </div>
);

export default ProjectCard;
