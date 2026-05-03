import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = () => {
  return (
    <div className="flex h-screen bg-[#0B0E14] text-slate-100 font-sans selection:bg-[#5468FF]/30 relative">
      {/* Decorative gradient glowing orb */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#5468FF] rounded-full blur-[150px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#FF54B0] rounded-full blur-[150px] opacity-10 pointer-events-none" />

      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10 backdrop-blur-3xl border-l border-white/5 bg-white/[0.01]">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 scrollbar-hide pt-10">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
