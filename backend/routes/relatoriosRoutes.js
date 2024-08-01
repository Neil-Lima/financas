const express = require('express');
const router = express.Router();
const relatoriosController = require('../controllers/relatoriosController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/completo', relatoriosController.gerarRelatorioCompleto);
router.get('/pdf', relatoriosController.gerarRelatorioPDF);

module.exports = router;
