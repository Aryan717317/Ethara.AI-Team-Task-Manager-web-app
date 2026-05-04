import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';

const Layout = () => {
  return (
    <div className="flex h-screen bg-[#050505] text-slate-100 font-sans selection:bg-[#E11D48]/30 relative">
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10 bg-transparent">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-8 lg:p-12 scrollbar-hide">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
