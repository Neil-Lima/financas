const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', usuariosController.register);
router.post('/login', usuariosController.login);
router.get('/profile', authMiddleware, usuariosController.getProfile);
router.put('/profile', authMiddleware, usuariosController.updateProfile);
router.delete('/profile', authMiddleware, usuariosController.deleteProfile);
router.get('/', authMiddleware, usuariosController.getAllUsers);
router.delete('/:id', authMiddleware, usuariosController.deleteUser);

module.exports = router;
