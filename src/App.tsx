import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProjectForm from './components/ProjectForm';
import ProjectsPage from './pages/ProjectsPage'; 
import ProjectDetails from './pages/ProjectDetails';

const App = () => {
  return (
    <Router>
      <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home (Submit Project)</Link>
        <Link to="/projects">Browse Projects</Link>
      </nav>
      <div style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<ProjectForm />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;