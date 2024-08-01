const express = require('express');
const router = express.Router();
const configuracoesController = require('../controllers/configuracoesController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', configuracoesController.getConfiguracoes);
router.put('/', configuracoesController.updateConfiguracoes);

module.exports = router;