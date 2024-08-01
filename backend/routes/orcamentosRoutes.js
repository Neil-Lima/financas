const express = require('express');
const router = express.Router();
const orcamentosController = require('../controllers/orcamentosController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', orcamentosController.createOrcamento);
router.get('/', orcamentosController.getAllOrcamentos);
router.get('/:id', orcamentosController.getOrcamentoById);
router.put('/:id', orcamentosController.updateOrcamento);
router.delete('/:id', orcamentosController.deleteOrcamento);

module.exports = router;
