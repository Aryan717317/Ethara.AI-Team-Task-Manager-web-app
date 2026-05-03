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
    <div className="min-h-screen flex items-center justify-center bg-[#0B0E14] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full bg-[#151921] rounded-2xl shadow-2xl border border-white/5 p-10 space-y-8 backdrop-blur-xl">
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tighter text-white flex items-center justify-center gap-1">
            Task<span className="text-[#5468FF]">Flow</span>
          </h1>
          <p className="mt-3 text-slate-400 text-sm font-medium tracking-tight">
            Collaborative project & task management
          </p>
        </div>

        <div className="flex bg-[#0B0E14] p-1 rounded-xl border border-white/5">
          <button 
            onClick={() => setIsRegister(false)}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${!isRegister ? 'bg-[#5468FF] text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Sign In
          </button>
          <button 
            onClick={() => setIsRegister(true)}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${isRegister ? 'bg-[#5468FF] text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Create Account
          </button>
        </div>
        
        {error && (
          <div className="bg-rose-500/10 text-rose-400 p-3 rounded-xl text-xs font-medium text-center border border-rose-500/20">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            {isRegister && (
              <div>
                <label className="block text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-2 ml-1">Full Name</label>
                <input
                  type="text"
                  required
                  className="block w-full px-4 py-3 border border-white/5 text-slate-100 bg-[#0B0E14] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5468FF]/50 placeholder-slate-600 sm:text-sm transition-all"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            )}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-2 ml-1 text-white">Email</label>
              <input
                type="email"
                required
                className="block w-full px-4 py-3 border border-white/5 text-slate-100 bg-[#0B0E14] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5468FF]/50 placeholder-slate-600 sm:text-sm transition-all"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-2 ml-1 text-white">Password</label>
              <input
                type="password"
                required
                className="block w-full px-4 py-3 border border-white/5 text-slate-100 bg-[#0B0E14] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5468FF]/50 placeholder-slate-600 sm:text-sm transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-[#5468FF] hover:bg-[#4353cc] focus:outline-none focus:ring-4 focus:ring-[#5468FF]/20 disabled:opacity-50 transition-all shadow-lg shadow-[#5468FF]/20"
          >
            {loading ? 'Processing...' : (isRegister ? 'Create Account' : 'Sign In →')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
