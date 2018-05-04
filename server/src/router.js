const express = require('express');
const authRouter = require('./controllers/auth');
const projectsRouter = require('./controllers/projects');
const tasksRouter = require('./controllers/tasks');

const router = express.Router();
router.use('/auth', authRouter);
router.use('/projects', projectsRouter);
router.use('/tasks', tasksRouter);

module.exports = router;
