import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
];

const Sidebar = () => {
  const { user, logout } = useAuth();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-16 md:w-60 glass border-r border-slate-200/50 dark:border-white/10 flex flex-col z-40 transition-all duration-300">
      {/* Navigation */}
      <nav className="flex-1 py-6 px-2 md:px-4 space-y-1">
        <p className="hidden md:block text-xs font-semibold text-slate-400 dark:text-gray-500 uppercase tracking-wider px-3 mb-4">
          Navigation
        </p>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-primary-600/10 dark:bg-primary-600/20 text-primary-600 dark:text-primary-400 border border-primary-500/20 dark:border-primary-500/30 shadow-glow-sm'
                  : 'text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
              }`
            }
          >
            <span className="flex-shrink-0">{item.icon}</span>
            <span className="hidden md:block text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User section at bottom */}
      <div className="p-2 md:p-4 border-t border-slate-200/50 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center text-white text-xs font-bold">
            {getInitials(user?.name)}
          </div>
          <div className="hidden md:block min-w-0">
            <p className="text-sm font-medium text-slate-800 dark:text-white truncate">{user?.name}</p>
            <p className="text-xs text-slate-500 dark:text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
