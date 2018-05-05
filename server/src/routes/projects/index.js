const express = require('express');
const find = require('./find');
const create = require('./create');
const update = require('./update');
const destroy = require('./destroy');
const isAuthenticated = require('../../policies/isAuthenticated');
const ownsProject = require('../../policies/ownsProject');
const tasksRouter = require('./tasks');

const router = express.Router();

router.get('/', isAuthenticated, find);
router.post('/', isAuthenticated, create);
router.patch('/:projectId', isAuthenticated, ownsProject, update);
router.delete('/:projectId', isAuthenticated, ownsProject, destroy);
router.use('/:projectId/tasks', tasksRouter);

module.exports = router;

