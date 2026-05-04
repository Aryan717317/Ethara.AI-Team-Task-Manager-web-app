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
    <div className="min-h-screen flex bg-[#0A0A0A] font-sans">
      {/* Left Pane - Auth Form */}
      <div className="flex-1 flex flex-col px-8 sm:px-16 md:px-24 py-12 justify-between z-10 bg-[#0A0A0A] max-w-xl xl:max-w-2xl">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#E11D48] rotate-45"></div>
          <h1 className="text-xl text-white font-serif tracking-tight">Taskify</h1>
        </div>

        <div className="my-auto w-full max-w-sm">
          <h2 className="text-5xl text-white font-serif mb-3 tracking-tight">
            {isRegister ? 'Register' : 'Sign in'}
          </h2>
          <p className="text-[#A1A1AA] text-sm mb-10">
            {isRegister ? 'Join the forge and start building.' : 'Pick up where you left off.'}
          </p>

          {error && (
            <div className="bg-[#E11D48]/10 text-[#E11D48] p-3 rounded text-xs mb-6 border border-[#E11D48]/20">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {isRegister && (
              <div className="space-y-2">
                <label className="block text-[11px] font-mono text-[#A1A1AA] uppercase tracking-[0.1em]">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-[#111111] border border-[#27272A] text-white px-4 py-3 focus:outline-none focus:border-[#E11D48] transition-colors"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="block text-[11px] font-mono text-[#A1A1AA] uppercase tracking-[0.1em]">Email</label>
              <input
                type="email"
                required
                className="w-full bg-[#111111] border border-[#27272A] text-white px-4 py-3 focus:outline-none focus:border-[#E11D48] transition-colors"
                placeholder="admin@taskify.io"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[11px] font-mono text-[#A1A1AA] uppercase tracking-[0.1em]">Password</label>
              <input
                type="password"
                required
                className="w-full bg-[#111111] border border-[#27272A] text-white px-4 py-3 focus:outline-none focus:border-[#E11D48] tracking-widest transition-colors"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E11D48] hover:bg-[#BE123C] text-white py-3.5 text-sm transition-colors flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {loading ? 'Processing...' : (isRegister ? 'Create account →' : 'Sign in →')}
            </button>
          </form>

          <p className="mt-8 text-[#A1A1AA] text-sm">
            {isRegister ? 'Already have an account? ' : 'New here? '}
            <button onClick={() => setIsRegister(!isRegister)} className="text-[#E11D48] hover:underline">
              {isRegister ? 'Sign in' : 'Create an account'}
            </button>
          </p>

          <hr className="my-8 border-[#27272A]" />

          <div className="space-y-2">
            <p className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-[0.1em]">Demo Credentials</p>
            <div className="text-[11px] font-mono text-[#71717A] space-y-1">
              <p>admin@taskify.io / password123</p>
              <p>member@taskify.io / Member@12345</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane - Manifesto Graphic */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-[#2A0B14] to-[#0A0A0A] p-24 items-center border-l border-[#27272A]">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,29,72,0.05)_0%,transparent_70%)] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-[1px] w-4 bg-[#E11D48]"></div>
            <span className="text-[#E11D48] text-[10px] font-mono uppercase tracking-[0.15em]">Manifesto</span>
          </div>
          
          <h2 className="text-4xl xl:text-5xl font-serif text-white leading-tight mb-12">
            "The best teams aren't the busiest.<br />
            They're the ones who <span className="text-[#E11D48]">finish.</span>"
          </h2>

          <p className="text-[#71717A] text-[11px] font-mono uppercase tracking-[0.2em]">
            TASKIFY · VOLUME 01
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
