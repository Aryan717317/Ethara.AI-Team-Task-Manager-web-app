import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../lib/api';

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const payload = isRegister ? formData : { email: formData.email, password: formData.password };
      
      const { data } = await api.post(endpoint, payload);
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 p-8 space-y-8 transition-all">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Taskify</span>
          </h2>
          <h3 className="mt-4 text-center text-xl font-medium text-gray-700 dark:text-slate-300">
            {isRegister ? 'Create an account' : 'Sign in to your account'}
          </h3>
        </div>
        
        {error && (
          <div className="bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 p-3 rounded-lg text-sm text-center border border-rose-100 dark:border-rose-800">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            {isRegister && (
              <div>
                <label className="sr-only">Name</label>
                <input
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 dark:border-slate-600 placeholder-gray-500 dark:placeholder-slate-400 text-gray-900 dark:text-white bg-white dark:bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-colors"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            )}
            <div>
              <label className="sr-only">Email address</label>
              <input
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 dark:border-slate-600 placeholder-gray-500 dark:placeholder-slate-400 text-gray-900 dark:text-white bg-white dark:bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-colors"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="sr-only">Password</label>
              <input
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 dark:border-slate-600 placeholder-gray-500 dark:placeholder-slate-400 text-gray-900 dark:text-white bg-white dark:bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-colors"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <span className="animate-pulse">Please wait...</span>
              ) : (
                isRegister ? 'Sign up' : 'Sign in'
              )}
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            type="button"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
          >
            {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
