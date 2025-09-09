const express = require('express');
const AuthController = require('../controllers/AuthController');
const { authValidation } = require('../middleware/validation');
const { authenticate } = require('../middleware/auth');

const router = express.Router();
const authController = new AuthController();

// Public routes
router.post('/register', authValidation.register, authController.register.bind(authController));
router.post('/login', authValidation.login, authController.login.bind(authController));

// Protected routes
router.use(authenticate);
router.post('/logout', authController.logout.bind(authController));
router.get('/profile', authController.getProfile.bind(authController));
router.put('/profile', authController.updateProfile.bind(authController));

module.exports = router;