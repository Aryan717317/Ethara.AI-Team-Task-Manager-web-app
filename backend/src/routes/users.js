const router = require('express').Router();
const { getAllUsers, updateRole } = require('../controllers/userController');
const auth = require('../middleware/auth');
const roleGuard = require('../middleware/roleGuard');

router.use(auth, roleGuard('ADMIN'));
router.get('/', getAllUsers);
router.patch('/:id/role', updateRole);

module.exports = router;
