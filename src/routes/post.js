const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

const PostController = require('../controllers/PostController');

// @route GET api/posts
// @desc Get posts
// @access Private
router.get('/', verifyToken, PostController.fetch);

router.post('/', verifyToken, PostController.create);

router.put('/:id', verifyToken, PostController.put);

router.delete('/:id', verifyToken, PostController.delete);

module.exports = router;