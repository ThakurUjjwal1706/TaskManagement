import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import { TaskSkeleton } from '../components/Loader';
import EmptyState from '../components/EmptyState';
import toast from 'react-hot-toast';

const StatCard = ({ label, value, color, icon }) => (
  <div className="glass-card p-5 flex items-center gap-4 hover:scale-[1.02] transition-transform duration-200">
    <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
      {icon}
    </div>
    <div>
      <p className="text-2xl font-bold text-slate-800 dark:text-white">{value}</p>
      <p className="text-sm text-slate-500 dark:text-gray-400">{label}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();

  // Tasks state
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, completed: 0 });
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  // Filters
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [priority, setPriority] = useState('All');

  // Pagination
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });

  // Form
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Delete confirm
  const [deleteId, setDeleteId] = useState(null);

  // Debounce search
  const searchTimer = useRef(null);

  const fetchTasks = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const { data } = await API.get('/tasks', {
        params: {
          search: params.search ?? search,
          status: params.status ?? status,
          priority: params.priority ?? priority,
          page: params.page ?? page,
          limit: 9,
        },
      });
      setTasks(data.tasks);
      setStats(data.stats);
      setPagination(data.pagination);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [search, status, priority, page]);

  useEffect(() => {
    fetchTasks();
  }, [status, priority, page]);

  // Debounced search
  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setPage(1);
      fetchTasks({ search, page: 1 });
    }, 400);
    return () => clearTimeout(searchTimer.current);
  }, [search]);

  const handleCreate = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await API.delete(`/tasks/${deleteId}`);
      toast.success('Task deleted');
      setDeleteId(null);
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  const handleComplete = async (task) => {
    const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    try {
      await API.put(`/tasks/${task._id}`, { status: newStatus });
      toast.success(newStatus === 'Completed' ? '✅ Task completed!' : 'Task reopened');
      fetchTasks();
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    try {
      if (editingTask) {
        await API.put(`/tasks/${editingTask._id}`, formData);
        toast.success('Task updated successfully!');
      } else {
        await API.post('/tasks', formData);
        toast.success('Task created successfully! 🎉');
      }
      setIsFormOpen(false);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setFormLoading(false);
    }
  };

  const handleStatusChange = (val) => { setStatus(val); setPage(1); };
  const handlePriorityChange = (val) => { setPriority(val); setPage(1); };

  const completionPct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="ml-16 md:ml-60 pt-16 min-h-screen">
      <div className="p-5 md:p-8 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
              Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'},{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 dark:from-primary-400 to-accent-purple">
                {user?.name?.split(' ')[0]}
              </span>{' '}
              👋
            </h1>
            <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">
              {stats.total === 0
                ? "You don't have any tasks yet. Create one to get started!"
                : `You have ${stats.pending + stats.inProgress} active task${stats.pending + stats.inProgress !== 1 ? 's' : ''} today`}
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="btn-primary flex items-center gap-2 whitespace-nowrap"
            id="create-task-btn"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">New Task</span>
            <span className="sm:hidden">+</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            label="Total Tasks"
            value={stats.total}
            color="bg-primary-600/20 border border-primary-500/20"
            icon={<svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
          />
          <StatCard
            label="Pending"
            value={stats.pending}
            color="bg-gray-500/20 border border-gray-500/20"
            icon={<svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
          <StatCard
            label="In Progress"
            value={stats.inProgress}
            color="bg-blue-500/20 border border-blue-500/20"
            icon={<svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
          />
          <StatCard
            label="Completed"
            value={stats.completed}
            color="bg-emerald-500/20 border border-emerald-500/20"
            icon={<svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
        </div>

        {/* Progress Bar */}
        {stats.total > 0 && (
          <div className="glass-card p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-500 dark:text-gray-400">Overall Progress</span>
              <span className="text-sm font-bold text-slate-800 dark:text-white">{completionPct}%</span>
            </div>
            <div className="h-2.5 bg-slate-200 dark:bg-dark-400 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-accent-purple rounded-full transition-all duration-700 ease-out"
                style={{ width: `${completionPct}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 dark:text-gray-500 mt-1.5">
              {stats.completed} of {stats.total} tasks completed
            </p>
          </div>
        )}

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <SearchBar value={search} onChange={setSearch} />
          <FilterBar
            status={status}
            priority={priority}
            onStatusChange={handleStatusChange}
            onPriorityChange={handlePriorityChange}
          />
        </div>

        {/* Results count */}
        {!loading && (
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              {pagination.total > 0
                ? `Showing ${tasks.length} of ${pagination.total} task${pagination.total !== 1 ? 's' : ''}`
                : ''}
            </p>
          </div>
        )}

        {/* Task Grid */}
        {loading ? (
          <TaskSkeleton count={6} />
        ) : tasks.length === 0 ? (
          <EmptyState
            search={search}
            status={status}
            priority={priority}
            onCreateClick={handleCreate}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onComplete={handleComplete}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && pagination.pages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="btn-secondary px-4 py-2 text-sm disabled:opacity-40"
            >
              ← Prev
            </button>
            <div className="flex gap-1">
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200 ${
                    page === p
                      ? 'bg-primary-600 text-white shadow-glow-sm'
                      : 'text-gray-400 hover:bg-dark-400 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
              disabled={page === pagination.pages}
              className="btn-secondary px-4 py-2 text-sm disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* Task Form Modal */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={() => { setIsFormOpen(false); setEditingTask(null); }}
        onSubmit={handleFormSubmit}
        initialData={editingTask}
        loading={formLoading}
      />

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative glass-card p-6 max-w-sm w-full shadow-card-hover animate-scale-in">
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white text-center mb-2">Delete Task?</h3>
            <p className="text-slate-500 dark:text-gray-400 text-sm text-center mb-6">
              This action cannot be undone. The task will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 active:scale-95">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
