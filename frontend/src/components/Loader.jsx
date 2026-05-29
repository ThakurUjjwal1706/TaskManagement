// Full-page loading spinner
export const Loader = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
    <div className="relative">
      <div className="w-12 h-12 rounded-full border-4 border-dark-400 border-t-primary-500 animate-spin" />
      <div className="absolute inset-1 rounded-full border-4 border-transparent border-t-accent-purple animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.7s' }} />
    </div>
    <p className="text-sm text-gray-500 animate-pulse">Loading...</p>
  </div>
);

// Skeleton card
const SkeletonCard = () => (
  <div className="glass-card p-5 animate-pulse">
    <div className="flex items-center justify-between mb-3">
      <div className="h-5 w-16 shimmer-bg rounded-full" />
      <div className="h-5 w-20 shimmer-bg rounded-full" />
    </div>
    <div className="h-5 w-3/4 shimmer-bg rounded-lg mb-2" />
    <div className="h-4 w-full shimmer-bg rounded-lg mb-1.5" />
    <div className="h-4 w-2/3 shimmer-bg rounded-lg mb-4" />
    <div className="h-4 w-24 shimmer-bg rounded-lg mb-4" />
    <div className="flex gap-2 pt-3 border-t border-white/10">
      <div className="h-8 flex-1 shimmer-bg rounded-lg" />
      <div className="h-8 w-8 shimmer-bg rounded-lg" />
      <div className="h-8 w-8 shimmer-bg rounded-lg" />
    </div>
  </div>
);

// Grid of skeleton cards
export const TaskSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

// Inline spinner for buttons
export const Spinner = ({ size = 'sm' }) => {
  const sizeClass = size === 'sm' ? 'w-4 h-4' : 'w-6 h-6';
  return (
    <svg className={`animate-spin ${sizeClass}`} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
};

export default Loader;
