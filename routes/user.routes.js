const express = require('express');
const router = express.Router();
const cleanBody = require('../utils/cleanBody');
const UserController = require('../controllers/user.controller');

router.post('/register', cleanBody, UserController.Signup);
router.post('/login', cleanBody, UserController.Login);

router.get('/logout', UserController.Logout);

module.exports = router;