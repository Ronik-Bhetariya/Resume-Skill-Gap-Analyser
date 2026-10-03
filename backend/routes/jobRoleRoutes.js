const express = require('express');
const router = express.Router();
const { getJobRoles, getJobRoleById } = require('../controllers/jobRoleController');

router.get('/', getJobRoles);
router.get('/:roleId', getJobRoleById);

module.exports = router;
