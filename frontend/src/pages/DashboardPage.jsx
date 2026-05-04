import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../lib/api';
import { FolderKanban, CheckCircle2, ChevronRight, AlertTriangle, User as UserIcon, CircleDashed } from 'lucide-react';
import { format } from 'date-fns';

const DashboardPage = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/dashboard');
        setData(res.data);
      } catch (err) {
        console.error('Dashboard fetch failed', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="text-[10px] font-mono text-[#E11D48] uppercase tracking-widest animate-pulse">Loading control room...</div>;
  }

  if (!data) return <div className="text-white font-serif">Failed to load dashboard data.</div>;

  const { stats, overdueList, inProgressList, todoList } = data;

  const getPriorityColor = (p) => {
    if (p === 'HIGH') return 'text-[#E11D48] border-[#E11D48]/30';
    if (p === 'MEDIUM') return 'text-yellow-500 border-yellow-500/30';
    return 'text-emerald-500 border-emerald-500/30';
  };

  const renderTaskList = (tasks, label, count) => {
    if (!tasks || tasks.length === 0) return null;
    return (
      <div className="mb-10">
        <div className="flex justify-between items-end mb-4 border-b border-[#27272A] pb-3">
          <div className="flex items-center gap-2">
            {label === 'Overdue' && <AlertTriangle className="w-4 h-4 text-[#E11D48]" />}
            <h2 className="text-xl font-serif text-white">{label}</h2>
          </div>
          <span className="text-[10px] font-mono text-[#71717A] uppercase tracking-[0.2em]">{count} ITEM{count !== 1 ? 'S' : ''}</span>
        </div>
        <div className="space-y-0 text-sm">
          {tasks.map(t => (
            <div key={t._id} className="flex items-center gap-4 py-4 px-4 border border-[#27272A] bg-[#0A0A0A] hover:bg-[#111111] transition-colors group cursor-pointer mb-2">
              <div className={`w-3 h-3 border ${t.status === 'DONE' ? 'bg-[#27272A]' : 'border-[#71717A]'}`}>
                {t.status === 'DONE' && <CheckCircle2 className="w-full h-full text-white p-0.5" />}
              </div>
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <span className="text-white font-sans">{t.title}</span>
                <div className="flex items-center gap-3 mt-1 sm:mt-0">
                  <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 border ${getPriorityColor(t.priority)}`}>
                    {t.priority}
                  </span>
                  <span className="text-[9px] font-mono text-[#71717A] uppercase tracking-wider">
                    {t.status.replace('_', ' ')}
                  </span>
                  {t.dueDate && (
                    <span className="text-[9px] font-mono text-[#E11D48] uppercase tracking-wider flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {format(new Date(t.dueDate), 'MMM d')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl pb-20">
      <div className="mb-12 relative flex items-start gap-4">
        <div className="h-[2px] w-6 bg-[#E11D48] mt-3"></div>
        <div>
          <p className="text-[#E11D48] text-[10px] font-mono uppercase tracking-[0.15em] mb-4">
             CONTROL ROOM
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-3">
            Good to see you, <span className="text-[#E11D48]">{user?.name.split(' ')[0]}</span>.
          </h1>
          <p className="text-[#A1A1AA] text-sm">
            Here's what the team is pushing today.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 border border-[#27272A] mb-16 bg-[#0A0A0A]">
        {[
          { label: 'Projects', val: stats?.projects, icon: FolderKanban },
          { label: 'Todo', val: stats?.todo, icon: CircleDashed },
          { label: 'In Progress', val: stats?.inProgress, icon: ChevronRight },
          { label: 'Done', val: stats?.done, icon: CheckCircle2 },
          { label: 'Overdue', val: stats?.overdue, icon: AlertTriangle, warning: true },
          { label: 'Assigned to me', val: stats?.assignedToMe, icon: UserIcon },
        ].map((item, i) => (
          <div key={item.label} className={`p-6 border-b lg:border-b-0 lg:border-r border-[#27272A] last:border-r-0 ${item.warning ? 'bg-gradient-to-b from-[#1a0a0A] to-[#0A0A0A] border-[#E11D48]/30 shadow-[inset_0_2px_10px_rgba(225,29,72,0.05)]' : ''}`}>
            <div className="flex justify-between items-center mb-6">
              <span className={`text-[10px] font-mono uppercase tracking-widest ${item.warning ? 'text-[#E11D48]' : 'text-[#71717A]'}`}>
                {item.label}
              </span>
              <item.icon className={`w-4 h-4 ${item.warning ? 'text-[#E11D48]' : 'text-[#71717A]'}`} />
            </div>
            <div className="text-3xl font-serif text-white">{item.val || 0}</div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {renderTaskList(overdueList, 'Overdue', overdueList?.length)}
        {renderTaskList(inProgressList, 'In progress', inProgressList?.length)}
        {renderTaskList(todoList, 'To do', todoList?.length)}
      </div>
      
      {(!overdueList?.length && !inProgressList?.length && !todoList?.length) && (
        <div className="py-20 text-center border border-[#27272A] bg-[#0A0A0A] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#111111] to-[#0A0A0A]">
          <p className="text-[11px] font-mono text-[#71717A] uppercase tracking-[0.2em]">All cleared. Nothing actively pending.</p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
