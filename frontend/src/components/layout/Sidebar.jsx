import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LayoutDashboard, CheckSquare, Users, FolderKanban } from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();

  const navItems = [
    { name: 'Dashboard', to: '/', icon: LayoutDashboard },
    { name: 'Projects', to: '/projects', icon: FolderKanban },
    { name: 'My Tasks', to: '/my-tasks', icon: CheckSquare },
    ...(user?.role === 'ADMIN' ? [{ name: 'Team', to: '/team', icon: Users }] : []),
  ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 h-screen flex flex-col transition-colors duration-200">
      <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-slate-700">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          Taskify
        </h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400'
                  : 'text-gray-600 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-700/50'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
