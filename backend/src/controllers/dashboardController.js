const Project = require('../models/Project');
const Task = require('../models/Task');
const User = require('../models/User');

exports.getDashboard = async (req, res, next) => {
  try {
    const tasksQuery = req.user.role === 'ADMIN' ? {} : { assignee: req.user._id };
    const allTasks = await Task.find(tasksQuery).populate('project', 'name color').populate('assignee', 'name');

    const totalProjects = await Project.countDocuments();
    const myTasksCount = await Task.countDocuments({ assignee: req.user._id });

    const overdueList = allTasks.filter(t => t.isOverdue && t.status !== 'DONE');
    const inProgressList = allTasks.filter(t => t.status === 'IN_PROGRESS');
    const todoList = allTasks.filter(t => t.status === 'TODO' && !t.isOverdue);
    const doneList = allTasks.filter(t => t.status === 'DONE');

    const stats = {
      projects: totalProjects,
      todo: todoList.length,
      inProgress: inProgressList.length,
      done: doneList.length,
      overdue: overdueList.length,
      assignedToMe: myTasksCount
    };

    res.json({
      success: true,
      stats,
      overdueList,
      inProgressList,
      todoList
    });
  } catch (err) { next(err); }
};
