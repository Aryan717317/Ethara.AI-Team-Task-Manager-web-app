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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: project.color }} />
          {project.name}
        </h1>
        <p className="mt-2 text-gray-500 dark:text-slate-400">{project.description}</p>
        
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {project.members.map(m => (
            <div key={m._id} className="px-3 py-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full text-sm font-medium">
              {m.name}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tasks</h2>
        {user?.role === 'ADMIN' && (
          <button 
            onClick={() => setIsTaskModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
          >
            Add Task
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(col => (
          <div key={col.id} className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-4 border border-gray-200 dark:border-slate-700">
            <h3 className="font-semibold text-gray-700 dark:text-slate-300 mb-4 flex items-center justify-between">
              {col.title}
              <span className="bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-slate-400 py-0.5 px-2.5 rounded-full text-xs">
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
