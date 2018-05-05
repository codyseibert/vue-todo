const express = require('express');

const update = require('./update');
const destroy = require('./destroy');
const ownsTasks = require('../../policies/ownsTask');

const router = express.Router();

router.patch('/:taskId', ownsTasks, update);
router.delete('/:taskId', ownsTasks, destroy);

module.exports = router;
