const express = require('express');
const authRouter = require('./auth');
const projectsRouter = require('./projects');
const tasksRouter = require('./tasks');
const isAuthenticated = require('../policies/isAuthenticated');

const router = express.Router();
router.use('/auth', authRouter);
router.use('/projects', isAuthenticated, projectsRouter);
router.use('/tasks', isAuthenticated, tasksRouter);

module.exports = router;
