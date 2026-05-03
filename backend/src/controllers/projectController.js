const Project = require('../models/Project');
const Task = require('../models/Task');
const User = require('../models/User');
const { z } = require('zod');

const projectSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  color: z.string().optional(),
});

const getTaskStats = async (projectId) => {
  const tasks = await Task.find({ project: projectId });
  const total = tasks.length;
  const done = tasks.filter(t => t.status === 'DONE').length;
  const inProgress = tasks.filter(t => t.status === 'IN_PROGRESS').length;
  const overdue = tasks.filter(t => t.isOverdue).length;
  return { total, done, inProgress, overdue };
};

exports.createProject = async (req, res, next) => {
  try {
    const body = projectSchema.parse(req.body);
    const project = await Project.create({
      ...body,
      createdBy: req.user._id,
      members: [req.user._id],
    });
    res.status(201).json({ success: true, project });
  } catch (err) {
    if (err.name === 'ZodError') return res.status(422).json({ success: false, errors: err.errors });
    next(err);
  }
};

exports.getProjects = async (req, res, next) => {
  try {
    const filter = req.user.role === 'ADMIN' ? {} : { members: req.user._id };
    const projects = await Project.find(filter)
      .populate('createdBy', 'name email')
      .populate('members', 'name email role')
      .sort({ createdAt: -1 });

    const projectsWithStats = await Promise.all(
      projects.map(async (p) => {
        const stats = await getTaskStats(p._id);
        return { ...p.toObject(), stats };
      })
    );

    res.json({ success: true, projects: projectsWithStats });
  } catch (err) { next(err); }
};

exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('members', 'name email role');

    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

    const isMember = project.members.some(m => m._id.toString() === req.user._id.toString());
    if (req.user.role !== 'ADMIN' && !isMember) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const stats = await getTaskStats(project._id);
    res.json({ success: true, project: { ...project.toObject(), stats } });
  } catch (err) { next(err); }
};

exports.updateProject = async (req, res, next) => {
  try {
    const body = projectSchema.partial().parse(req.body);
    const project = await Project.findByIdAndUpdate(req.params.id, body, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, project });
  } catch (err) {
    if (err.name === 'ZodError') return res.status(422).json({ success: false, errors: err.errors });
    next(err);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    await Task.deleteMany({ project: req.params.id });
    res.json({ success: true, message: 'Project deleted' });
  } catch (err) { next(err); }
};

exports.addMember = async (req, res, next) => {
  try {
    const { userId } = z.object({ userId: z.string() }).parse(req.body);
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    if (project.members.map(String).includes(userId)) {
      return res.status(409).json({ success: false, message: 'User already a member' });
    }
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    project.members.push(userId);
    await project.save();
    res.json({ success: true, project });
  } catch (err) {
    if (err.name === 'ZodError') return res.status(422).json({ success: false, errors: err.errors });
    next(err);
  }
};

exports.removeMember = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    project.members = project.members.filter(m => m.toString() !== req.params.userId);
    await project.save();
    res.json({ success: true, project });
  } catch (err) { next(err); }
};
