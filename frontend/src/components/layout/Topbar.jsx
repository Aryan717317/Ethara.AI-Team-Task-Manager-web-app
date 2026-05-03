import { useAuth } from '../../hooks/useAuth';
import { LogOut, User as UserIcon } from 'lucide-react';

const Topbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-6 flex items-center justify-between transition-colors duration-200">
      <div className="flex items-center gap-4">
        {/* Breadcrumbs or Page Title could go here */}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 px-3 py-1.5 bg-gray-50 dark:bg-slate-900 rounded-full border border-gray-200 dark:border-slate-700">
          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-semibold shadow-sm">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div className="hidden md:block text-sm">
            <p className="font-medium text-gray-700 dark:text-slate-200 leading-none">{user?.name}</p>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{user?.role}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:text-slate-400 dark:hover:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
