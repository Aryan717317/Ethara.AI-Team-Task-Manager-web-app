import Badge from './Badge';
import { Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';

const TaskCard = ({ task, onClick }) => {
  const statusColors = {
    TODO: 'default',
    IN_PROGRESS: 'primary',
    DONE: 'success'
  };

  const priorityColors = {
    LOW: 'success',
    MEDIUM: 'warning',
    HIGH: 'danger'
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md cursor-pointer transition-all"
    >
      <div className="flex justify-between items-start gap-4 mb-3">
        <h4 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
          {task.title}
        </h4>
        <Badge variant={priorityColors[task.priority] || 'default'} className="flex-shrink-0">
          {task.priority}
        </Badge>
      </div>

      <p className="text-sm text-gray-500 dark:text-slate-400 line-clamp-2 mb-4">
        {task.description || 'No description'}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100 dark:border-slate-700">
        <Badge variant={statusColors[task.status] || 'default'}>
          {task.status.replace('_', ' ')}
        </Badge>

        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-slate-400 font-medium">
          {task.dueDate && (
            <div className={`flex items-center gap-1 ${new Date(task.dueDate) < new Date() && task.status !== 'DONE' ? 'text-rose-500' : ''}`}>
              <Calendar className="w-3.5 h-3.5" />
              <span>{format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
            </div>
          )}
          {task.project?.name && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: task.project.color }} />
              <span className="truncate max-w-[100px]">{task.project.name}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
