import { useState, useEffect } from 'react';

const PRIORITIES = ['Low', 'Medium', 'High'];
const STATUSES = ['Pending', 'In Progress', 'Completed'];

const defaultForm = {
  title: '',
  description: '',
  priority: 'Medium',
  status: 'Pending',
  dueDate: '',
};

const TaskForm = ({ isOpen, onClose, onSubmit, initialData = null, loading = false }) => {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const isEdit = !!initialData;

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm({
          title: initialData.title || '',
          description: initialData.description || '',
          priority: initialData.priority || 'Medium',
          status: initialData.status || 'Pending',
          dueDate: initialData.dueDate
            ? new Date(initialData.dueDate).toISOString().split('T')[0]
            : '',
        });
      } else {
        setForm(defaultForm);
      }
      setErrors({});
    }
  }, [isOpen, initialData]);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (form.title.trim().length > 100) newErrors.title = 'Title too long (max 100 chars)';
    if (form.description.length > 500) newErrors.description = 'Description too long (max 500 chars)';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...form,
      dueDate: form.dueDate || null,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg glass-card shadow-card-hover animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200/50 dark:border-white/10">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              {isEdit ? '✏️ Edit Task' : '✨ New Task'}
            </h2>
            <p className="text-sm text-slate-500 dark:text-gray-400 mt-0.5">
              {isEdit ? 'Update task details below' : 'Fill in the details to create a task'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:text-gray-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="label">
              Title <span className="text-rose-400">*</span>
            </label>
            <input
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              placeholder="What needs to be done?"
              className={`input-field ${errors.title ? 'border-rose-500/60 ring-1 ring-rose-500/40' : ''}`}
              autoFocus
            />
            {errors.title && (
              <p className="text-rose-400 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="label">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Add more details..."
              rows={3}
              className={`input-field resize-none ${errors.description ? 'border-rose-500/60' : ''}`}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.description && <p className="text-rose-400 text-xs">{errors.description}</p>}
              <p className="text-slate-400 dark:text-gray-600 text-xs ml-auto">{form.description.length}/500</p>
            </div>
          </div>

          {/* Priority + Status row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Priority</label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="input-field"
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p} className="bg-white dark:bg-dark-700 text-slate-800 dark:text-gray-100">{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="input-field"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s} className="bg-white dark:bg-dark-700 text-slate-800 dark:text-gray-100">{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="label">Due Date</label>
            <input
              name="dueDate"
              type="date"
              value={form.dueDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="input-field"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saving...
                </>
              ) : (
                isEdit ? 'Update Task' : 'Create Task'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
