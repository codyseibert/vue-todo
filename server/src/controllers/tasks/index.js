const express = require('express');

const update = require('./update');
const destroy = require('./destroy');
const isAuthenticated = require('../../policies/isAuthenticated');
const ownsTasks = require('./ownsTask');

const router = express.Router();

router.patch('/:taskId', isAuthenticated, ownsTasks, update);
router.delete('/:taskId', isAuthenticated, ownsTasks, destroy);

module.exports = router;
