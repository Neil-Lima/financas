const express = require('express');
const router = express.Router();
const contasController = require('../controllers/contasController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', contasController.createConta);
router.get('/', contasController.getAllContas);
router.get('/:id', contasController.getContaById);
router.put('/:id', contasController.updateConta);
router.delete('/:id', contasController.deleteConta);
router.post('/default', contasController.insertDefaultAccounts);

module.exports = router;
