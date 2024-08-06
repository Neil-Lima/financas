const Financiamento = require('../models/Financiamento');

const financiamentosController = {
  getAllFinanciamentos: async (req, res) => {
    try {
      const financiamentos = await Financiamento.find({ usuario: req.user.id });
      res.json(financiamentos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createFinanciamento: async (req, res) => {
    try {
      const novoFinanciamento = await Financiamento.create({ ...req.body, usuario: req.user.id });
      res.status(201).json(novoFinanciamento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateFinanciamento: async (req, res) => {
    try {
      const financiamentoAtualizado = await Financiamento.findOneAndUpdate(
        { _id: req.params.id, usuario: req.user.id },
        req.body,
        { new: true }
      );
      res.json(financiamentoAtualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteFinanciamento: async (req, res) => {
    try {
      await Financiamento.findOneAndDelete({ _id: req.params.id, usuario: req.user.id });
      res.json({ message: 'Financiamento deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = financiamentosController;
