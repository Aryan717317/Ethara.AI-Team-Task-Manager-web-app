import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LayoutDashboard, CheckSquare, Users, FolderKanban } from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();

  const navItems = [
    { name: 'Dashboard', to: '/', icon: LayoutDashboard },
    { name: 'Projects', to: '/projects', icon: FolderKanban },
    { name: 'Task Board', to: '/board', icon: CheckSquare },
    { name: 'My Tasks', to: '/my-tasks', icon: CheckSquare },
  ];

  return (
    <aside className="w-64 bg-[#151921]/80 backdrop-blur-2xl border-r border-white/5 h-screen flex flex-col font-sans z-50">
      <div className="h-20 flex items-center px-6">
        <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#5468FF] to-[#00f2fe] flex items-center gap-1">
          T <span className="text-lg font-bold text-white">Taskly</span>
          <span className="ml-auto bg-[#5468FF]/20 text-[#5468FF] text-[10px] px-2 py-0.5 rounded-full uppercase font-black tracking-widest border border-[#5468FF]/30">
            {user?.role}
          </span>
        </h1>
      </div>

      <div className="px-4 mb-4">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 mb-2">Workspace</p>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold transition-all ${
                  isActive
                    ? 'bg-[#5468FF]/10 text-[#5468FF]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {user?.role === 'ADMIN' && (
        <div className="px-4">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 mb-2">Admin</p>
          <NavLink
            to="/team"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold transition-all ${
                isActive
                  ? 'bg-[#5468FF]/10 text-[#5468FF]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`
            }
          >
            <Users className="w-5 h-5" />
            Team
          </NavLink>
        </div>
      )}

      <div className="mt-auto p-4 border-t border-white/5">
        <div className="flex items-center gap-3 p-2">
          <div className="w-10 h-10 rounded-full bg-[#5468FF] flex items-center justify-center font-black text-white">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-black text-white truncate">{user?.name}</p>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest truncate">{user?.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
