import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../lib/api';
import StatCard from '../components/ui/StatCard';
import ProjectCard from '../components/ui/ProjectCard';
import TaskCard from '../components/ui/TaskCard';
import { FolderKanban, Users, CheckSquare, AlertCircle } from 'lucide-react';

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
    return <div className="animate-pulse flex space-x-4">Loading dashboard...</div>;
  }

  if (!data) return <div>Failed to load dashboard data.</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Welcome back, {user?.name.split(' ')[0]}
        </h1>
        <p className="mt-2 text-gray-500 dark:text-slate-400">
          Here is what's happening with your projects today.
        </p>
      </div>

      {user?.role === 'ADMIN' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Projects" value={data.totalProjects} icon={FolderKanban} />
            <StatCard title="Total Members" value={data.totalMembers} icon={Users} />
            <StatCard title="Total Tasks" value={data.totalTasks} icon={CheckSquare} />
            <StatCard title="Overdue Tasks" value={data.overdueTasks} icon={AlertCircle} className="border-rose-200 dark:border-rose-900/50" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.recentProjects?.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="My Total Tasks" value={data.myTasks?.total || 0} icon={CheckSquare} />
            <StatCard title="In Progress" value={data.myTasks?.inProgress || 0} icon={FolderKanban} />
            <StatCard title="Done" value={data.myTasks?.done || 0} icon={CheckSquare} />
            <StatCard title="Overdue" value={data.myTasks?.overdue || 0} icon={AlertCircle} className="border-rose-200 dark:border-rose-900/50" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Upcoming Deadlines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.upcomingDeadlines?.length > 0 ? (
                data.upcomingDeadlines.map((task) => (
                  <TaskCard key={task._id} task={task} />
                ))
              ) : (
                <p className="text-gray-500">No upcoming deadlines.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
