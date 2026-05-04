import { format } from 'date-fns';
import { Calendar, AlertTriangle } from 'lucide-react';
import Badge from './Badge';

const TaskRow = ({ task }) => {
  const priorityColors = {
    LOW: 'success',
    MEDIUM: 'warning',
    HIGH: 'danger'
  };

  const isOverdue = task.isOverdue && task.status !== 'DONE';

  return (
    <div className="flex items-center justify-between p-4 border-b border-[#27272A] hover:bg-[#111111] transition-colors group">
      <div className="flex items-center gap-4">
        {/* Checkbox proxy */}
        <div className="w-4 h-4 rounded-[3px] border border-[#3F3F46] group-hover:border-[#71717A] flex items-center justify-center bg-[#0A0A0A]">
          {task.status === 'DONE' && <div className="w-2 h-2 bg-emerald-500 rounded-[1px]"></div>}
        </div>
        
        {/* Task Title */}
        <span className="text-white text-sm font-medium">{task.title}</span>
      </div>

      <div className="flex items-center gap-6">
        <Badge variant={priorityColors[task.priority] || 'default'} className="!text-[9px]">
          {task.priority}
        </Badge>
        
        <span className="text-[10px] font-mono text-[#71717A] uppercase tracking-widest w-24 text-right">
          {task.status.replace('_', ' ')}
        </span>
        
        {task.dueDate && (
          <div className={`flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest w-24 justify-end ${isOverdue ? 'text-[#E11D48]' : 'text-[#71717A]'}`}>
            {isOverdue ? <AlertTriangle className="w-3.5 h-3.5" /> : <Calendar className="w-3.5 h-3.5" />}
            <span>{format(new Date(task.dueDate), 'MMM d')}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskRow;