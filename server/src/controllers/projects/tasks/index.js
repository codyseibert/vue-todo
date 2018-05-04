const express = require('express');

const find = require('./find');
const create = require('./create');
const isAuthenticated = require('../../../policies/isAuthenticated');
const ownsProject = require('../../projects/policy/ownsProject');

const router = express.Router({ mergeParams: true });

router.get('/', isAuthenticated, ownsProject, find);
router.post('/', isAuthenticated, ownsProject, create);

module.exports = router;
