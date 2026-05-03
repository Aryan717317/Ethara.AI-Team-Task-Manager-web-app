import { useState, useEffect } from 'react';
import api from '../lib/api';
import ProjectCard from '../components/ui/ProjectCard';
import Modal from '../components/ui/Modal';
import { FolderKanban, Plus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '', color: '#5468FF' });
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data.projects);
    } catch (err) {
      console.error('Failed to fetch projects', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/projects', newProject);
      setIsModalOpen(false);
      setNewProject({ name: '', description: '', color: '#5468FF' });
      fetchProjects();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create project');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-slate-500 font-bold uppercase tracking-widest animate-pulse">Loading projects...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Overview</h1>
        </div>
        {user?.role === 'ADMIN' && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            New Project
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Tasks" value={projects.reduce((acc, p) => acc + (p.stats?.total || 0), 0)} />
        <StatCard title="Completed" value={projects.reduce((acc, p) => acc + (p.stats?.done || 0), 0)} className="border-l-4 border-l-emerald-500/50" />
        <StatCard title="In Progress" value={projects.reduce((acc, p) => acc + (p.stats?.inProgress || 0), 0)} className="border-l-4 border-l-amber-500/50" />
        <StatCard title="Overdue" value={projects.reduce((acc, p) => acc + (p.stats?.overdue || 0), 0)} className="border-l-4 border-l-rose-500/50" />
      </div>

      {projects.some(p => p.stats?.overdue > 0) && (
        <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <p className="text-rose-400 text-sm font-bold">
            {projects.reduce((acc, p) => acc + (p.stats?.overdue || 0), 0)} tasks are overdue — 
            <button className="ml-2 underline hover:text-rose-300">View overdue tasks</button>
          </p>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-white">Projects <span className="text-slate-500 ml-2">{projects.length}</span></h2>
          <button className="text-[#5468FF] text-sm font-bold hover:underline">View all</button>
        </div>
        <div className="space-y-4">
          {projects.map(project => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Create New Project"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Project Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 bg-[#0B0E14] border border-white/5 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#5468FF]/50"
              placeholder="e.g. Mobile App Redesign"
              value={newProject.name}
              onChange={e => setNewProject({...newProject, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Description</label>
            <textarea
              className="w-full px-4 py-3 bg-[#0B0E14] border border-white/5 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#5468FF]/50 h-24"
              placeholder="What is this project about?"
              value={newProject.description}
              onChange={e => setNewProject({...newProject, description: e.target.value})}
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-[#5468FF] text-white font-black rounded-xl hover:bg-[#4353cc] disabled:opacity-50 transition-all shadow-lg shadow-[#5468FF]/20"
          >
            {submitting ? 'Creating...' : 'Create Project'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ProjectPage;
