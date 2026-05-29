const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');

// @desc    Get all tasks for logged-in user (with search, filter, pagination)
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  const { search, status, priority, page = 1, limit = 9 } = req.query;

  const query = { user: req.user._id };

  // Search by title
  if (search && search.trim()) {
    query.title = { $regex: search.trim(), $options: 'i' };
  }

  // Filter by status
  if (status && status !== 'All') {
    query.status = status;
  }

  // Filter by priority
  if (priority && priority !== 'All') {
    query.priority = priority;
  }

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const total = await Task.countDocuments(query);
  const tasks = await Task.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNum);

  // Dashboard stats (all user tasks, unfiltered)
  const allUserTasks = await Task.find({ user: req.user._id });
  const stats = {
    total: allUserTasks.length,
    pending: allUserTasks.filter((t) => t.status === 'Pending').length,
    inProgress: allUserTasks.filter((t) => t.status === 'In Progress').length,
    completed: allUserTasks.filter((t) => t.status === 'Completed').length,
  };

  res.json({
    success: true,
    tasks,
    stats,
    pagination: {
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      limit: limitNum,
    },
  });
});

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const { title, description, priority, status, dueDate } = req.body;

  if (!title || !title.trim()) {
    res.status(400);
    throw new Error('Task title is required');
  }

  const task = await Task.create({
    title: title.trim(),
    description: description?.trim() || '',
    priority: priority || 'Medium',
    status: status || 'Pending',
    dueDate: dueDate || null,
    user: req.user._id,
  });

  res.status(201).json({ success: true, task });
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Ensure task belongs to requesting user
  if (task.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this task');
  }

  const { title, description, priority, status, dueDate } = req.body;

  task.title = title?.trim() || task.title;
  task.description = description?.trim() ?? task.description;
  task.priority = priority || task.priority;
  task.status = status || task.status;
  task.dueDate = dueDate !== undefined ? dueDate : task.dueDate;

  const updatedTask = await task.save();
  res.json({ success: true, task: updatedTask });
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Ensure task belongs to requesting user
  if (task.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this task');
  }

  await task.deleteOne();
  res.json({ success: true, message: 'Task removed successfully', id: req.params.id });
});

module.exports = { getTasks, createTask, updateTask, deleteTask };
