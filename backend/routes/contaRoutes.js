const express = require('express');
const contaController = require('../controllers/contaController');
const auth = require('../middleware/authMiddleware');

const router = new express.Router();

router.post('/contas', auth, contaController.criarConta);
router.get('/contas', auth, contaController.listarContas);
router.get('/contas/:id', auth, contaController.obterConta);
router.patch('/contas/:id', auth, contaController.atualizarConta);
router.delete('/contas/:id', auth, contaController.deletarConta);

module.exports = router;
