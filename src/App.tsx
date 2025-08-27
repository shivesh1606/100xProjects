import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { HomeIcon, PlusIcon } from './components/Icons';
import ProjectForm from './components/ProjectForm';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetails from './pages/ProjectDetails';
import LoginPage from './pages/LoginPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import UpdateProjectForm from './components/UpdateProjectForm';
import { getProjects, getPublicProjects } from './utils/projectsApi';

// --- Protected Route ---
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

// --- Header with Logout ---
const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10 w-full">
      <nav className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center py-4 gap-4 sm:gap-0">
          <Link to="/projects" className="text-2xl font-bold text-blue-600">100xProjects</Link>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <Link to="/projects" className="w-full sm:w-auto text-gray-600 hover:text-blue-600 transition-colors flex items-center px-3 py-2 rounded-md">
              <HomeIcon />
              <span className="ml-2 hidden sm:inline">Browse</span>
            </Link>
            {user ? (
              <>
                <Link to="/" className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center shadow-sm">
                  <PlusIcon />
                  <span className="ml-2 hidden sm:inline">Submit Project</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full sm:w-auto bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors flex items-center shadow-sm"
                >
                  Logout
                </button>
                <span className="ml-2 text-xs text-gray-500 hidden sm:inline">({user})</span>
              </>
            ) : (
              <Link to="/login" className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center shadow-sm">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

const EditProjectPage: React.FC = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    getProjects().then((projects) => {
      const found = projects.find((p: any) => p.id === projectId);
      setProject(found);
    });
  }, [projectId]);

  if (!project) return <div className="text-center py-10">Loading...</div>;
  return <UpdateProjectForm project={project} />;
};

const PublicProjectDetails: React.FC = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    getPublicProjects().then((projects) => {
      const found = projects.find((p: any) => p.id === projectId);
      setProject(found);
    });
  }, [projectId]);

  if (!project) return <div className="text-center py-10">Project not found!</div>;
  return <ProjectDetails project={project} />;
};

const App = () => {
  const { user } = useAuth();

  return (
    <AuthProvider>
      <Router>
        <div className="w-full min-h-screen bg-gray-100 font-sans flex flex-col">
          <Header />
          <main className="flex-1 py-6 sm:py-10 w-full">
            <div className="w-full px-2 sm:px-4 lg:px-8">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={
                  <ProtectedRoute>
                    <ProjectForm />
                  </ProtectedRoute>
                } />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:projectId" element={
                  user
                    ? <ProjectDetails />
                    : <PublicProjectDetails />
                } />
                <Route path="/projects/:projectId/edit" element={
                  <ProtectedRoute>
                    <EditProjectPage />
                  </ProtectedRoute>
                } />
              </Routes>
            </div>
          </main>
          <footer className="bg-white mt-12 py-6 w-full">
            <div className="w-full px-2 sm:px-6 lg:px-8 text-center text-gray-500">
              <p>&copy; 2024 100xProjects. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
