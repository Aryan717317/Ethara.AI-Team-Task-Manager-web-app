import { useAuth } from '../../hooks/useAuth';
import { LogOut } from 'lucide-react';

const Topbar = () => {
  const { logout } = useAuth();

  return (
    <header className="h-16 border-b border-[#27272A] px-6 flex items-center justify-between sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-xl">
      <div className="flex items-center gap-4">
      </div>
      
      <div className="flex items-center gap-4">
        <button
          onClick={logout}
          className="flex items-center gap-2 p-2 text-[#71717A] hover:text-[#E11D48] transition-colors text-sm font-mono uppercase tracking-[0.1em]"
          title="Logout"
        >
          <LogOut className="w-4 h-4" strokeWidth={1.5} />
          Sign out
        </button>
      </div>
    </header>
  );
};

export default Topbar;
