import { useState, useEffect } from 'react';
import api from '../lib/api';
import ProjectCard from '../components/ui/ProjectCard';
import { FolderKanban } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
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
    fetchProjects();
  }, []);

  if (loading) return <div>Loading projects...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            Projects
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
            {user?.role === 'ADMIN' ? 'Manage all company projects' : 'Projects you are a member of'}
          </p>
        </div>
        {user?.role === 'ADMIN' && (
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            New Project
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects.map(project => (
          <ProjectCard key={project._id} project={project} />
        ))}
        {projects.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 dark:text-slate-400 bg-white dark:bg-slate-800 rounded-xl border border-dashed border-gray-300 dark:border-slate-700">
            No projects found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
