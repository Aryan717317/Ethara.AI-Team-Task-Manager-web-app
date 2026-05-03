import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../lib/api';
import TaskCard from '../components/ui/TaskCard';
import TaskForm from '../components/forms/TaskForm';
import { useAuth } from '../hooks/useAuth';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const { user } = useAuth();

  const fetchProjectDetails = async () => {
    try {
      const [projectRes, tasksRes] = await Promise.all([
        api.get(`/projects/${id}`),
        api.get(`/tasks/project/${id}`)
      ]);
      setProject(projectRes.data.project);
      setTasks(tasksRes.data.tasks);
    } catch (err) {
      console.error('Failed to fetch project details', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  if (loading) return <div>Loading project details...</div>;
  if (!project) return <div>Project not found.</div>;

  const columns = [
    { id: 'TODO', title: 'To Do' },
    { id: 'IN_PROGRESS', title: 'In Progress' },
    { id: 'DONE', title: 'Done' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white flex items-center gap-3 tracking-tight">
          <div className="w-4 h-4 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]" style={{ backgroundColor: project.color }} />
          {project.name}
        </h1>
        <p className="mt-2 text-slate-400 font-medium">{project.description}</p>
        
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {project.members.map(m => (
            <div key={m._id} className="px-3 py-1.5 bg-[#5468FF]/10 border border-[#5468FF]/30 rounded-full text-xs font-bold text-[#5468FF] tracking-widest uppercase">
              {m.name}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/5 pt-8">
        <h2 className="text-xl font-black text-white">Tasks</h2>
        {user?.role === 'ADMIN' && (
          <button 
            onClick={() => setIsTaskModalOpen(true)}
            className="bg-[#5468FF] hover:bg-[#4353cc] text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-[#5468FF]/20 text-sm"
          >
            Add Task
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(col => (
          <div key={col.id} className="bg-[#1A1F26]/50 backdrop-blur-xl rounded-2xl p-5 border border-white/5 shadow-xl">
            <h3 className="font-black text-white mb-6 flex items-center justify-between tracking-wide">
              {col.title}
              <span className="bg-[#5468FF]/20 text-[#5468FF] py-1 px-3 rounded-full text-[10px] uppercase tracking-widest">
                {tasks.filter(t => t.status === col.id).length}
              </span>
            </h3>
            <div className="space-y-4">
              {tasks.filter(t => t.status === col.id).map(task => (
                <TaskCard key={task._id} task={task} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <TaskForm
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        projectId={id}
        members={project.members}
        onTaskAdded={fetchProjectDetails}
      />
    </div>
  );
};

export default ProjectDetailsPage;
