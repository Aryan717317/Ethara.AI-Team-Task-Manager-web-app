import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = () => {
  return (
    <div className="flex h-screen bg-[#0A0A0A] text-slate-100 font-sans selection:bg-[#E11D48]/30 relative">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10 bg-[#0A0A0A]">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-8 lg:p-12 scrollbar-hide pt-10">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
