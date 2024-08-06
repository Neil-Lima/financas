const express = require('express');
const router = express.Router();
const financiamentosController = require('../controllers/financiamentosController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', financiamentosController.getAllFinanciamentos);
router.post('/', financiamentosController.createFinanciamento);
router.put('/:id', financiamentosController.updateFinanciamento);
router.delete('/:id', financiamentosController.deleteFinanciamento);

module.exports = router;
