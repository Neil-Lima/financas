// parcelamentosRoutes.js
const express = require('express');
const router = express.Router();
const parcelamentosController = require('../controllers/parcelamentosController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', parcelamentosController.getAllParcelamentos);
router.post('/', parcelamentosController.createParcelamento);
router.put('/:id', parcelamentosController.updateParcelamento);
router.delete('/:id', parcelamentosController.deleteParcelamento);

module.exports = router;