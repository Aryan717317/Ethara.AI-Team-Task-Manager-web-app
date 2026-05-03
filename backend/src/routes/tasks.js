const router = require('express').Router();
const ctrl = require('../controllers/taskController');
const auth = require('../middleware/auth');
const roleGuard = require('../middleware/roleGuard');

router.use(auth);

router.get('/my', ctrl.getMyTasks);
router.get('/project/:projectId', ctrl.getTasksByProject);
router.post('/project/:projectId', roleGuard('ADMIN'), ctrl.createTask);
router.patch('/:id', ctrl.updateTask);
router.delete('/:id', roleGuard('ADMIN'), ctrl.deleteTask);

module.exports = router;
