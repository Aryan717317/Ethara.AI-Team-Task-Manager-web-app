import { useAuth } from '../../hooks/useAuth';
import { LogOut, User as UserIcon } from 'lucide-react';

const Topbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 border-b border-white/5 px-6 flex items-center justify-between sticky top-0 z-50 bg-[#0B0E14]/80 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        {/* Breadcrumbs or Page Title could go here */}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5468FF] to-[#00f2fe] flex items-center justify-center text-white font-black shadow-[0_0_15px_rgba(84,104,255,0.5)]">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div className="hidden md:block text-sm pr-2">
            <p className="font-bold text-white leading-none">{user?.name}</p>
            <p className="text-[10px] font-black text-[#5468FF] uppercase tracking-widest mt-1">{user?.role}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
