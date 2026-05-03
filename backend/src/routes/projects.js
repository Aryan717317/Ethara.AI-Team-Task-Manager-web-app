const router = require('express').Router();
const ctrl = require('../controllers/projectController');
const auth = require('../middleware/auth');
const roleGuard = require('../middleware/roleGuard');

router.use(auth);

router.get('/',    ctrl.getProjects);
router.post('/',   roleGuard('ADMIN'), ctrl.createProject);
router.get('/:id', ctrl.getProject);
router.patch('/:id', roleGuard('ADMIN'), ctrl.updateProject);
router.delete('/:id', roleGuard('ADMIN'), ctrl.deleteProject);
router.post('/:id/members', roleGuard('ADMIN'), ctrl.addMember);
router.delete('/:id/members/:userId', roleGuard('ADMIN'), ctrl.removeMember);

module.exports = router;
