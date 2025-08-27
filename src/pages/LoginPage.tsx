import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerMode, setRegisterMode] = useState(false);
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Username and password are required');
      return;
    }
    try {
      if (registerMode) {
        await register(username.trim(), password.trim());
        setRegisterMode(false);
        setError('Registered! Please login.');
      } else {
        await login(username.trim(), password.trim());
        navigate('/projects');
      }
    } catch (err: any) {
      setError(err.message || 'Error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">{registerMode ? 'Register' : 'Login'}</h2>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        />
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700">
          {registerMode ? 'Register' : 'Login'}
        </button>
        <button
          type="button"
          className="w-full mt-2 py-2 px-4 bg-gray-200 text-gray-700 rounded-md font-semibold hover:bg-gray-300"
          onClick={() => { setRegisterMode(!registerMode); setError(''); }}
        >
          {registerMode ? 'Already have an account? Login' : "Don't have an account? Register"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
