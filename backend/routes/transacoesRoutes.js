const express = require('express');
const router = express.Router();
const transacoesController = require('../controllers/transacoesController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', transacoesController.createTransacao);
router.get('/', transacoesController.getAllTransacoes);
router.get('/:id', transacoesController.getTransacaoById);
router.put('/:id', transacoesController.updateTransacao);
router.delete('/:id', transacoesController.deleteTransacao);

module.exports = router;
