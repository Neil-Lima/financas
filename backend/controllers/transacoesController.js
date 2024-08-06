const Transacao = require('../models/Transacao');

const transacoesController = {
  createTransacao: async (req, res) => {
    try {
      const newTransacao = await Transacao.create({ ...req.body, usuario: req.user.id });
      res.status(201).json(newTransacao);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllTransacoes: async (req, res) => {
    try {
      const transacoes = await Transacao.find({ usuario: req.user.id })
        .populate('conta', 'nome saldo tipo')
        .populate('categoria');
      res.json(transacoes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  

  getTransacaoById: async (req, res) => {
    try {
      const transacao = await Transacao.findOne({ _id: req.params.id, usuario: req.user.id })
        .populate('conta')
        .populate('categoria');
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
      const updatedTransacao = await Transacao.findOneAndUpdate(
        { _id: req.params.id, usuario: req.user.id },
        req.body,
        { new: true }
      ).populate('conta').populate('categoria');
      res.json(updatedTransacao);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteTransacao: async (req, res) => {
    try {
      await Transacao.findOneAndDelete({ _id: req.params.id, usuario: req.user.id });
      res.json({ message: 'Transação deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = transacoesController;
