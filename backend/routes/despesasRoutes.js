const express = require('express');
const router = express.Router();
const despesasController = require('../controllers/despesasController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', despesasController.getAllDespesas);
router.post('/', despesasController.createDespesa);
router.put('/:id', despesasController.updateDespesa);
router.delete('/:id', despesasController.deleteDespesa);

module.exports = router;
