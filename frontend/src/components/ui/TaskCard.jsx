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
      className="bg-[#0B0E14] rounded-xl p-5 border border-white/5 shadow-sm hover:border-[#5468FF]/50 hover:shadow-[0_0_20px_rgba(84,104,255,0.1)] cursor-pointer transition-all"
    >
      <div className="flex justify-between items-start gap-4 mb-3">
        <h4 className="font-bold text-white line-clamp-2">
          {task.title}
        </h4>
        <Badge variant={priorityColors[task.priority] || 'default'} className="flex-shrink-0">
          {task.priority}
        </Badge>
      </div>

      <p className="text-sm text-slate-400 font-medium line-clamp-2 mb-4">
        {task.description || 'No description'}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/5">
        <Badge variant={statusColors[task.status] || 'default'}>
          {task.status.replace('_', ' ')}
        </Badge>

        <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
          {task.dueDate && (
            <div className={`flex items-center gap-1 ${new Date(task.dueDate) < new Date() && task.status !== 'DONE' ? 'text-rose-500' : ''}`}>
              <Calendar className="w-3.5 h-3.5" />
              <span>{format(new Date(task.dueDate), 'MMM d')}</span>
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
