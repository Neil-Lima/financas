// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const auth = require('../middleware/authMiddleware');

router.post('/register', usuarioController.register);
router.post('/login', usuarioController.login);
router.post('/logout', auth, usuarioController.logout);
router.get('/profile', auth, usuarioController.getProfile);

module.exports = router;
