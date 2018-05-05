const express = require('express');
const find = require('./find');
const create = require('./create');
const update = require('./update');
const destroy = require('./destroy');
const ownsProject = require('../../policies/ownsProject');
const tasksRouter = require('./tasks');

const router = express.Router();

router.get('/', find);
router.post('/', create);
router.patch('/:projectId', ownsProject, update);
router.delete('/:projectId', ownsProject, destroy);
router.use('/:projectId/tasks', ownsProject, tasksRouter);

module.exports = router;

