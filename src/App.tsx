import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HomeIcon, PlusIcon } from './components/Icons';
import ProjectForm from './components/ProjectForm';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetails from './pages/ProjectDetails';

// --- Main App Component ---
const App = () => {
  return (
    <Router>
        <div className="w-full min-h-screen bg-gray-100 font-sans flex flex-col">
            <header className="bg-white shadow-sm sticky top-0 z-10 w-full">
                <nav className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center py-4 gap-4 sm:gap-0">
                        <Link to="/projects" className="text-2xl font-bold text-blue-600">100xProjects</Link>
                        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                            <Link to="/projects" className="w-full sm:w-auto text-gray-600 hover:text-blue-600 transition-colors flex items-center px-3 py-2 rounded-md">
                                <HomeIcon />
                                <span className="ml-2 hidden sm:inline">Browse</span>
                            </Link>
                            <Link to="/" className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center shadow-sm">
                                <PlusIcon />
                                <span className="ml-2 hidden sm:inline">Submit Project</span>
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="flex-1 py-6 sm:py-10 w-full">
                <div className="w-full px-2 sm:px-4 lg:px-8">
                    <Routes>
                    <Route path="/" element={<ProjectForm />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/projects/:projectId" element={<ProjectDetails />} />
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
  );
};

export default App;
