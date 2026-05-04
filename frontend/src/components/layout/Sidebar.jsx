import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LayoutDashboard, CheckSquare, Users, FolderKanban } from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  // Base items for everyone
  const navItems = [
    { name: 'Dashboard', to: '/', icon: LayoutDashboard },
    { name: 'Projects', to: '/projects', icon: FolderKanban },
  ];

  // Role specific items
  if (isAdmin) {
    navItems.push({ name: 'Task Board', to: '/board', icon: CheckSquare });
  } else {
    navItems.push({ name: 'My Tasks', to: '/my-tasks', icon: CheckSquare });
  }

  return (
    <aside className="shrink-0 w-56 lg:w-64 bg-[#0A0A0A] border-r border-[#27272A] h-screen flex flex-col font-sans z-50">
      <div className="h-16 flex items-center px-6 border-b border-[#27272A]">
        <h1 className="text-xl text-white font-serif tracking-tight flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-[#E11D48] rotate-45"></div>
          TaskForge
        </h1>
      </div>

      <div className="flex-1 py-6">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 transition-colors text-sm ${
                  isActive
                    ? 'bg-[#E11D48]/10 text-white border-r-2 border-[#E11D48]'
                    : 'text-[#A1A1AA] hover:text-white hover:bg-[#111111] border-r-2 border-transparent'
                }`
              }
            >
              <item.icon className="w-4 h-4" strokeWidth={1.5} />
              {item.name}
            </NavLink>
          ))}

          {isAdmin && (
            <NavLink
              to="/team"
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 transition-colors text-sm ${
                  isActive
                    ? 'bg-[#E11D48]/10 text-white border-r-2 border-[#E11D48]'
                    : 'text-[#A1A1AA] hover:text-white hover:bg-[#111111] border-r-2 border-transparent'
                }`
              }
            >
              <Users className="w-4 h-4" strokeWidth={1.5} />
              Team
            </NavLink>
          )}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-[#27272A] bg-[#0A0A0A]">
        <div className="flex flex-col gap-1 text-left">
          <p className="text-[9px] font-mono text-[#71717A] uppercase tracking-[0.2em] mb-1">Signed in as</p>
          <p className="text-sm text-white">{user?.name}</p>
          <p className="text-[10px] font-mono text-[#E11D48] uppercase tracking-[0.1em]">{user?.role}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
