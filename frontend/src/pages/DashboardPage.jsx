import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../lib/api';
import StatCard from '../components/ui/StatCard';
import TaskRow from '../components/ui/TaskRow';
import { FolderKanban, CheckSquare, AlertTriangle, CircleDashed, User as UserIcon, CheckCircle2 } from 'lucide-react';

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
    return <div className="text-[#A1A1AA] animate-pulse">Loading control room...</div>;
  }

  if (!data) return <div className="text-[#E11D48]">Failed to load dashboard data.</div>;

  const { stats, lists } = data;

  return (
    <div className="space-y-12 max-w-6xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-[1px] w-4 bg-[#E11D48]"></div>
          <span className="text-[#E11D48] text-[10px] font-mono uppercase tracking-[0.2em]">CONTROL ROOM</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif text-white tracking-tight leading-tight">
          Good to see you, <span className="text-[#E11D48]">{user?.name.split(' ')[0]}</span>.
        </h1>
        <p className="mt-4 text-[#A1A1AA] font-sans">
          Here's what the team is pushing today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard title="PROJECTS" value={stats.totalProjects} icon={FolderKanban} />
        <StatCard title="TODO" value={stats.todo} icon={CircleDashed} />
        <StatCard title="IN PROGRESS" value={stats.inProgress} icon={CircleDashed} textClass="text-rose-500" />
        <StatCard title="DONE" value={stats.done} icon={CheckCircle2} />
        <StatCard title="OVERDUE" value={stats.overdue} icon={AlertTriangle} className={stats.overdue > 0 ? "border-[#E11D48]/30 bg-[#2A0B14]" : ""} textClass={stats.overdue > 0 ? "text-[#E11D48]" : ""} />
        <StatCard title="ASSIGNED TO ME" value={stats.assignedToMe} icon={UserIcon} />
      </div>

      {/* Overdue Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#27272A] pb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#E11D48]" />
            <h2 className="text-xl font-serif text-white">Overdue</h2>
          </div>
          <span className="text-[10px] font-mono text-[#71717A] uppercase tracking-[0.15em]">{lists.overdue?.length || 0} ITEMS</span>
        </div>
        
        {lists.overdue?.length > 0 ? (
          <div className="border border-[#27272A] rounded-sm overflow-hidden bg-[#0A0A0A]">
            {lists.overdue.map((task) => (
              <TaskRow key={task._id} task={task} />
            ))}
          </div>
        ) : (
          <div className="py-8 text-center border border-[#27272A] border-dashed rounded-sm">
            <p className="text-[#71717A] text-sm">No overdue tasks. Great job.</p>
          </div>
        )}
      </div>

      {/* In Progress Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#27272A] pb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-serif text-white">In progress</h2>
          </div>
          <span className="text-[10px] font-mono text-[#71717A] uppercase tracking-[0.15em]">{lists.inProgress?.length || 0} ITEMS</span>
        </div>

        {lists.inProgress?.length > 0 ? (
          <div className="border border-[#27272A] rounded-sm overflow-hidden bg-[#0A0A0A]">
            {lists.inProgress.map((task) => (
              <TaskRow key={task._id} task={task} />
            ))}
          </div>
        ) : (
          <div className="py-8 text-center border border-[#27272A] border-dashed rounded-sm">
            <p className="text-[#71717A] text-sm">Nothing in progress right now.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
