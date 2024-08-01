const Transacao = require('../models/Transacao');

const transacoesController = {
  createTransacao: async (req, res) => {
    try {
      const newTransacao = await Transacao.create({ ...req.body, usuario_id: req.user.id });
      res.status(201).json(newTransacao);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllTransacoes: async (req, res) => {
    try {
      const transacoes = await Transacao.findAll(req.user.id);
      res.json(transacoes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getTransacaoById: async (req, res) => {
    try {
      const transacao = await Transacao.findById(req.params.id, req.user.id);
      if (transacao) {
        res.json(transacao);
      } else {
        res.status(404).json({ message: 'Transação não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateTransacao: async (req, res) => {
    try {
      const updatedTransacao = await Transacao.update(req.params.id, req.body, req.user.id);
      res.json(updatedTransacao);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteTransacao: async (req, res) => {
    try {
      await Transacao.delete(req.params.id, req.user.id);
      res.json({ message: 'Transação deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = transacoesController;
