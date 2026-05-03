const StatCard = ({ title, value, className = '' }) => {
  return (
    <div className={`bg-[#1A1F26] rounded-xl p-6 border border-white/5 shadow-sm ${className}`}>
      <div className="flex items-start flex-col gap-1">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{title}</p>
        <p className="text-3xl font-black text-white">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
