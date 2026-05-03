const Task = require('../models/Task');
const Project = require('../models/Project');
const { z } = require('zod');

const taskSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  assignee: z.string(),
  dueDate: z.string().datetime({ offset: true }).optional().nullable(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).optional(),
});

const ensureProjectAccess = async (projectId, user) => {
  const project = await Project.findById(projectId);
  if (!project) return null;
  if (user.role === 'ADMIN') return project;
  const isMember = project.members.map(String).includes(user._id.toString());
  return isMember ? project : null;
};

exports.getTasksByProject = async (req, res, next) => {
  try {
    const project = await ensureProjectAccess(req.params.projectId, req.user);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found or access denied' });

    const filter = { project: req.params.projectId };
    if (req.user.role !== 'ADMIN') filter.assignee = req.user._id;

    const tasks = await Task.find(filter)
      .populate('assignee', 'name email')
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });

    res.json({ success: true, tasks });
  } catch (err) { next(err); }
};

exports.createTask = async (req, res, next) => {
  try {
    const body = taskSchema.parse(req.body);
    const project = await ensureProjectAccess(req.params.projectId, req.user);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found or access denied' });

    if (req.user.role !== 'ADMIN') {
      const isMemberAssignee = project.members.map(String).includes(body.assignee);
      if (!isMemberAssignee) return res.status(400).json({ success: false, message: 'Assignee must be a project member' });
    }

    const task = await Task.create({
      ...body,
      project: req.params.projectId,
      createdBy: req.user._id,
    });

    const populated = await task.populate(['assignee', 'createdBy']);
    res.status(201).json({ success: true, task: populated });
  } catch (err) {
    if (err.name === 'ZodError') return res.status(422).json({ success: false, errors: err.errors });
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

    const isAssignee = task.assignee.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'ADMIN';

    if (!isAdmin && !isAssignee) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const allowedFields = isAdmin
      ? ['title', 'description', 'assignee', 'dueDate', 'priority', 'status']
      : ['status'];

    const update = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) update[field] = req.body[field];
    }

    const updated = await Task.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true })
      .populate('assignee', 'name email')
      .populate('createdBy', 'name');

    res.json({ success: true, task: updated });
  } catch (err) { next(err); }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    res.json({ success: true, message: 'Task deleted' });
  } catch (err) { next(err); }
};

exports.getMyTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ assignee: req.user._id })
      .populate('project', 'name color')
      .populate('assignee', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, tasks });
  } catch (err) { next(err); }
};
