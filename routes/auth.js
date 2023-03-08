var express = require('express');
const login = require('../controllers/auth/login');
const regenerateToken = require('../controllers/auth/regenerateToken');
const register = require('../controllers/auth/register');
const { body } = require('express-validator');

var router = express.Router();

router.post('/login', body('email').isEmail(),
// password must be at least 8 chars long
body('password').isLength({ min: 8 }),  login);

router.post('/register',
    body('username').isString(),
    body('email').isEmail(),
    // password must be at least 8 chars long
    body('password').isLength({ min: 8 }), 
    register);

router.post('/regenerate-token', regenerateToken)
module.exports = router;