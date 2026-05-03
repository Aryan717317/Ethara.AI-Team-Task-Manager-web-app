const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-slate-800 text-slate-300 border border-slate-700',
    primary: 'bg-[#5468FF]/10 text-[#5468FF] border border-[#5468FF]/30',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
    danger: 'bg-rose-500/10 text-rose-400 border border-rose-500/30',
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
