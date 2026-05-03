const StatCard = ({ title, value, icon: Icon, trend, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-slate-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
        </div>
        {Icon && (
          <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
            <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <span className={trend > 0 ? 'text-emerald-600' : trend < 0 ? 'text-rose-600' : 'text-gray-500'}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
          <span className="text-gray-500 dark:text-slate-400 ml-2">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
