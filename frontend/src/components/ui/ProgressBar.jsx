const ProgressBar = ({ progress, color = 'bg-indigo-600', className = '' }) => {
  return (
    <div className={`w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5 ${className}`}>
      <div
        className={`${color} h-2.5 rounded-full transition-all duration-500 ease-in-out`}
        style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
      />
    </div>
  );
};

export default ProgressBar;
