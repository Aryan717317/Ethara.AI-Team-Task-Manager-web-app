const Project = require('../models/Project');
const Task = require('../models/Task');
const User = require('../models/User');

exports.getDashboard = async (req, res, next) => {
  try {
    if (req.user.role === 'ADMIN') {
      const [totalProjects, totalMembers, tasks] = await Promise.all([
        Project.countDocuments(),
        User.countDocuments(),
        Task.find(),
      ]);

      const tasksByStatus = {
        TODO: tasks.filter(t => t.status === 'TODO').length,
        IN_PROGRESS: tasks.filter(t => t.status === 'IN_PROGRESS').length,
        DONE: tasks.filter(t => t.status === 'DONE').length,
      };
      const overdueTasks = tasks.filter(t => t.isOverdue).length;

      const recentProjects = await Project.find()
        .sort({ createdAt: -1 })
        .limit(4)
        .populate('members', 'name');

      const projectsWithStats = await Promise.all(recentProjects.map(async (p) => {
        const ptasks = await Task.find({ project: p._id });
        const total = ptasks.length;
        const done = ptasks.filter(t => t.status === 'DONE').length;
        const overdueCount = ptasks.filter(t => t.isOverdue).length;
        return { ...p.toObject(), stats: { total, done, overdue: overdueCount } };
      }));

      return res.json({
        success: true,
        totalProjects,
        totalMembers,
        totalTasks: tasks.length,
        tasksByStatus,
        overdueTasks,
        recentProjects: projectsWithStats,
      });
    }

    // Member view
    const myTasks = await Task.find({ assignee: req.user._id }).populate('project', 'name color');
    const done = myTasks.filter(t => t.status === 'DONE').length;
    const inProgress = myTasks.filter(t => t.status === 'IN_PROGRESS').length;
    const overdue = myTasks.filter(t => t.isOverdue).length;
    const upcoming = myTasks
      .filter(t => t.dueDate && t.status !== 'DONE' && new Date(t.dueDate) >= new Date())
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5);

    res.json({
      success: true,
      myTasks: { total: myTasks.length, done, inProgress, overdue },
      upcomingDeadlines: upcoming,
    });
  } catch (err) { next(err); }
};
