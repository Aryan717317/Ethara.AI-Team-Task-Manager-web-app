import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const { stats } = project;
  const progress = stats?.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

  return (
    <Link to={`/projects/${project._id}`} className="block group">
      <div className="bg-[#1A1F26] rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: project.color }} />
            <h3 className="text-lg font-black text-white group-hover:text-[#5468FF] transition-colors">{project.name}</h3>
          </div>
          {stats?.overdue > 0 && (
            <span className="bg-rose-500/10 text-rose-400 text-[10px] font-black px-2 py-0.5 rounded-lg uppercase tracking-widest">
              {stats.overdue} overdue
            </span>
          )}
        </div>

        <p className="text-sm font-medium text-slate-500 mb-6">
          {project.members.length} members · {stats?.total || 0} tasks · due Soon
        </p>

        <div className="space-y-2">
          <div className="flex justify-end">
            <span className="text-xs font-black text-slate-400">{progress}%</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1.5">
            <div 
              className="bg-[#5468FF] h-full rounded-full transition-all duration-500" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
