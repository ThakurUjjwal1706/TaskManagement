const EmptyState = ({ search, status, priority, onCreateClick }) => {
  const isFiltered = search || status !== 'All' || priority !== 'All';

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 animate-fade-in">
      {/* Illustration */}
      <div className="relative">
        <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-primary-600/20 to-accent-purple/20 border border-primary-500/20 flex items-center justify-center">
          <svg
            className="w-14 h-14 text-primary-400/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isFiltered ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            )}
          </svg>
        </div>
        {/* Decorative dots */}
        <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-primary-500/40 animate-pulse-slow" />
        <div className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-accent-purple/40 animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="text-center max-w-sm">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
          {isFiltered ? 'No tasks found' : 'No tasks yet'}
        </h3>
        <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">
          {isFiltered
            ? `No tasks match your current filters. Try adjusting your search or filter criteria.`
            : `You haven't created any tasks yet. Click the button below to get started!`}
        </p>
      </div>

      {!isFiltered && (
        <button
          onClick={onCreateClick}
          className="btn-primary flex items-center gap-2 animate-slide-up"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Create your first task
        </button>
      )}
    </div>
  );
};

export default EmptyState;
