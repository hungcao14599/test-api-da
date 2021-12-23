const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/auth');

const AuthController = require('../controllers/AuthController');

const User = require('../models/User');

// @route GET api/auth
// @desc Check if user is logged in
// @access Public
router.get('/', verifyToken, AuthController.read);

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', AuthController.register);

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', AuthController.login);

module.exports = router;
