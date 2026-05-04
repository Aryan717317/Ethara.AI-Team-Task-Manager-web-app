const StatCard = ({ title, value, icon: Icon, className = '', textClass = '' }) => {
  return (
    <div className={`bg-[#0F0F11] rounded-sm p-5 border border-[#27272A] ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] font-mono text-[#71717A] uppercase tracking-[0.2em]">{title}</p>
        {Icon && <Icon className={`w-4 h-4 text-[#71717A] ${textClass}`} strokeWidth={1.5} />}
      </div>
      <div>
        <p className={`text-4xl font-serif tracking-tight text-white ${textClass}`}>{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
