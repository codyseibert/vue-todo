const express = require('express');
const authRouter = require('./routes/auth');
const projectsRouter = require('./routes/projects');
const tasksRouter = require('./routes/tasks');
const isAuthenticated = require('./policies/isAuthenticated');

const router = express.Router();
router.use('/auth', authRouter);
router.use('/projects', isAuthenticated, projectsRouter);
router.use('/tasks', isAuthenticated, tasksRouter);

module.exports = router;
