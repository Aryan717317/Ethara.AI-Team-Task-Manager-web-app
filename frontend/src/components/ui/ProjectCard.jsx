import { Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import Badge from './Badge';

const ProjectCard = ({ project }) => {
  const { stats } = project;
  const progress = stats?.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

  return (
    <Link to={`/projects/${project._id}`} className="block group">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {project.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1 line-clamp-2">
              {project.description || 'No description provided.'}
            </p>
          </div>
          <div 
            className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0" 
            style={{ backgroundColor: project.color }}
          />
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-slate-300 font-medium">Progress</span>
            <span className="text-gray-900 dark:text-white font-semibold">{progress}%</span>
          </div>
          <ProgressBar progress={progress} color="bg-indigo-500" />
        </div>

        <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {project.members.slice(0, 3).map((m, i) => (
                <div key={m._id} className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-xs font-medium text-indigo-600 dark:text-indigo-400 border-2 border-white dark:border-slate-800 z-10" style={{ zIndex: 3 - i }}>
                  {m.name?.charAt(0).toUpperCase()}
                </div>
              ))}
              {project.members.length > 3 && (
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-slate-300 border-2 border-white dark:border-slate-800 z-0">
                  +{project.members.length - 3}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-2">
            {stats?.overdue > 0 && (
              <Badge variant="danger">{stats.overdue} overdue</Badge>
            )}
            <Badge variant="default">{stats?.total || 0} tasks</Badge>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
