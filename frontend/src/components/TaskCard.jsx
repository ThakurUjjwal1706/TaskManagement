import { format, isPast, isToday } from 'date-fns';

const priorityConfig = {
  High: { class: 'badge-high', dot: 'bg-rose-400', label: 'High' },
  Medium: { class: 'badge-medium', dot: 'bg-amber-400', label: 'Medium' },
  Low: { class: 'badge-low', dot: 'bg-emerald-400', label: 'Low' },
};

const statusConfig = {
  Pending: { class: 'badge-pending', dot: 'bg-gray-400', label: 'Pending' },
  'In Progress': { class: 'badge-inprogress', dot: 'bg-blue-400', label: 'In Progress' },
  Completed: { class: 'badge-completed', dot: 'bg-emerald-400', label: 'Completed' },
};

const TaskCard = ({ task, onEdit, onDelete, onComplete }) => {
  const priority = priorityConfig[task.priority] || priorityConfig.Medium;
  const status = statusConfig[task.status] || statusConfig.Pending;
  const isCompleted = task.status === 'Completed';

  const formatDueDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    if (isToday(d)) return { label: 'Today', urgent: true };
    if (isPast(d) && !isCompleted) return { label: format(d, 'MMM d'), urgent: true };
    return { label: format(d, 'MMM d, yyyy'), urgent: false };
  };

  const dueInfo = formatDueDate(task.dueDate);

  return (
    <div
      className={`glass-card p-5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 animate-fade-in group ${
        isCompleted ? 'opacity-70' : ''
      }`}
    >
      {/* Top row: priority + status */}
      <div className="flex items-center justify-between mb-3">
        <span className={priority.class}>
          <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
          {priority.label}
        </span>
        <span className={status.class}>
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
      </div>

      {/* Title */}
      <h3
        className={`text-base font-semibold mb-2 leading-snug ${
          isCompleted ? 'line-through text-slate-400 dark:text-gray-500' : 'text-slate-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors duration-200'
        }`}
      >
        {task.title}
      </h3>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-slate-500 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Due date */}
      {dueInfo && (
        <div className={`flex items-center gap-1.5 mb-4 text-xs font-medium ${
          dueInfo.urgent && !isCompleted ? 'text-rose-500 dark:text-rose-400' : 'text-slate-400 dark:text-gray-500'
        }`}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {dueInfo.urgent && !isCompleted ? `Due ${dueInfo.label}` : dueInfo.label}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-2 pt-3 border-t border-slate-200/50 dark:border-white/10">
        {/* Complete toggle */}
        <button
          onClick={() => onComplete(task)}
          title={isCompleted ? 'Mark as pending' : 'Mark as complete'}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
            isCompleted
              ? 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 dark:border-emerald-500/30 hover:bg-emerald-500/20 dark:hover:bg-emerald-500/30'
              : 'bg-slate-100 dark:bg-dark-500 text-slate-500 dark:text-gray-400 border border-slate-200 dark:border-white/10 hover:bg-emerald-500/10 dark:hover:bg-emerald-500/15 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/20 dark:hover:border-emerald-500/30'
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          {isCompleted ? 'Done' : 'Complete'}
        </button>

        {/* Edit */}
        <button
          onClick={() => onEdit(task)}
          title="Edit task"
          className="p-2 rounded-lg text-slate-400 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-500/10 border border-slate-200 dark:border-white/10 hover:border-primary-500/30 transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>

        {/* Delete */}
        <button
          onClick={() => onDelete(task._id)}
          title="Delete task"
          className="p-2 rounded-lg text-slate-400 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-500/10 border border-slate-200 dark:border-white/10 hover:border-rose-500/30 transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
