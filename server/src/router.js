const express = require('express');
const authRouter = require('./routes/auth');
const projectsRouter = require('./routes/projects');
const tasksRouter = require('./routes/tasks');

const router = express.Router();
router.use('/auth', authRouter);
router.use('/projects', projectsRouter);
router.use('/tasks', tasksRouter);

module.exports = router;
