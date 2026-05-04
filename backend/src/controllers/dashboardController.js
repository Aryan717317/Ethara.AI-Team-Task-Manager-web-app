const Project = require('../models/Project');
const Task = require('../models/Task');
const User = require('../models/User');

exports.getDashboard = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const role = req.user.role;

    let tasksQuery = {};
    if (role !== 'ADMIN') {
      tasksQuery = { assignee: userId };
    }

    const tasks = await Task.find(tasksQuery).populate('project', 'name color').populate('assignee', 'name email');

    const totalProjects = await Project.countDocuments(role === 'ADMIN' ? {} : { members: userId });
    const totalMembers = role === 'ADMIN' ? await User.countDocuments() : 0;

    const tasksByStatus = {
      TODO: tasks.filter(t => t.status === 'TODO').length,
      IN_PROGRESS: tasks.filter(t => t.status === 'IN_PROGRESS').length,
      DONE: tasks.filter(t => t.status === 'DONE').length,
    };
    
    const overdueCount = tasks.filter(t => t.isOverdue).length;
    const myAssignedCount = tasks.filter(t => t.assignee && t.assignee._id.toString() === userId.toString()).length;

    const overdueList = tasks
      .filter(t => t.isOverdue && t.status !== 'DONE')
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5);

    const inProgressList = tasks
      .filter(t => t.status === 'IN_PROGRESS')
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 5);

    return res.json({
      success: true,
      stats: {
        totalProjects,
        totalMembers,
        todo: tasksByStatus.TODO,
        inProgress: tasksByStatus.IN_PROGRESS,
        done: tasksByStatus.DONE,
        overdue: overdueCount,
        assignedToMe: myAssignedCount
      },
      lists: {
        overdue: overdueList,
        inProgress: inProgressList
      }
    });
  } catch (err) { next(err); }
};
