const STATUSES = ['All', 'Pending', 'In Progress', 'Completed'];
const PRIORITIES = ['All', 'Low', 'Medium', 'High'];

const FilterBar = ({ status, priority, onStatusChange, onPriorityChange }) => {
  const StatusIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const PriorityIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
    </svg>
  );

  const selectClass = "input-field pl-9 pr-4 py-2.5 text-sm appearance-none cursor-pointer min-w-[130px]";

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Status filter */}
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
          <StatusIcon />
        </div>
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className={selectClass}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s} className="bg-white dark:bg-dark-700 text-slate-800 dark:text-gray-100">{s === 'All' ? 'All Status' : s}</option>
          ))}
        </select>
      </div>

      {/* Priority filter */}
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
          <PriorityIcon />
        </div>
        <select
          value={priority}
          onChange={(e) => onPriorityChange(e.target.value)}
          className={selectClass}
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p} className="bg-white dark:bg-dark-700 text-slate-800 dark:text-gray-100">{p === 'All' ? 'All Priority' : p}</option>
          ))}
        </select>
      </div>

      {/* Clear filters */}
      {(status !== 'All' || priority !== 'All') && (
        <button
          onClick={() => { onStatusChange('All'); onPriorityChange('All'); }}
          className="flex items-center gap-1.5 text-xs text-primary-400 hover:text-primary-300 transition-colors duration-200 px-3 py-2.5 rounded-xl border border-primary-500/30 hover:border-primary-500/60 hover:bg-primary-500/10"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Clear
        </button>
      )}
    </div>
  );
};

export default FilterBar;
