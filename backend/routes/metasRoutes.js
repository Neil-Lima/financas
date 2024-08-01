const express = require('express');
const router = express.Router();
const metasController = require('../controllers/metasController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', metasController.createMeta);
router.get('/', metasController.getAllMetas);
router.get('/:id', metasController.getMetaById);
router.put('/:id', metasController.updateMeta);
router.delete('/:id', metasController.deleteMeta);

module.exports = router;
