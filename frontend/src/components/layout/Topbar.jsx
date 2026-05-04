import { useAuth } from '../../hooks/useAuth';
import { LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Topbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 border-b border-[#27272A] px-8 flex items-center justify-between bg-[#050505] sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#E11D48] rotate-45"></div>
          <Link to="/" className="text-[#71717A] text-[10px] font-mono uppercase tracking-[0.2em] hover:text-white transition-colors">WORKSPACE · DEFAULT</Link>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <nav className="text-[#A1A1AA] text-[11px] font-mono uppercase tracking-[0.1em] space-x-6 hidden md:block">
          <Link to="/team" className="hover:text-[#E11D48] transition-colors">Team</Link>
          <Link to="/projects" className="hover:text-[#E11D48] transition-colors">Projects</Link>
        </nav>
        
        <div className="flex items-center gap-3 border border-[#27272A] p-1.5 pr-4 bg-[#0A0A0A]">
          <div className="w-8 h-8 bg-[#E11D48] flex items-center justify-center text-white text-xs font-mono font-bold">
            {user?.name.charAt(0).toUpperCase()}{user?.name.split(' ')[1] ? user.name.split(' ')[1].charAt(0).toUpperCase() : ''}
          </div>
          <div className="hidden md:block">
            <p className="font-serif text-white text-sm leading-none">{user?.name}</p>
            <p className="text-[9px] font-mono text-[#71717A] uppercase tracking-[0.2em] mt-1">{user?.role}</p>
          </div>
          <button
            onClick={logout}
            className="ml-2 p-1 text-[#71717A] hover:text-[#E11D48] transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
