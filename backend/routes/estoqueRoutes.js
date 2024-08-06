const express = require('express');
const router = express.Router();
const estoqueController = require('../controllers/estoqueController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', estoqueController.getAllItems);
router.post('/', estoqueController.createItem);
router.put('/:id', estoqueController.updateItem);
router.delete('/:id', estoqueController.deleteItem);

module.exports = router;
