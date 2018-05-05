const express = require('express');

const find = require('./find');
const create = require('./create');

const router = express.Router({ mergeParams: true });

router.get('/', find);
router.post('/', create);

module.exports = router;
