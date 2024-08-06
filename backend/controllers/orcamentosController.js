const Orcamento = require('../models/Orcamento');

const orcamentosController = {
  createOrcamento: async (req, res) => {
    try {
      const novoOrcamento = await Orcamento.create({ ...req.body, usuario: req.user.id });
      res.status(201).json(novoOrcamento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllOrcamentos: async (req, res) => {
    try {
      const { mes, ano } = req.query;
      const orcamentos = await Orcamento.find({ 
        usuario: req.user.id,
        mes: parseInt(mes),
        ano: parseInt(ano)
      }).populate('categoria');
      res.json(orcamentos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getOrcamentoById: async (req, res) => {
    try {
      const orcamento = await Orcamento.findOne({ _id: req.params.id, usuario: req.user.id }).populate('categoria');
      if (orcamento) {
        res.json(orcamento);
      } else {
        res.status(404).json({ message: 'Orçamento não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateOrcamento: async (req, res) => {
    try {
      const orcamentoAtualizado = await Orcamento.findOneAndUpdate(
        { _id: req.params.id, usuario: req.user.id },
        req.body,
        { new: true }
      ).populate('categoria');
      res.json(orcamentoAtualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteOrcamento: async (req, res) => {
    try {
      await Orcamento.findOneAndDelete({ _id: req.params.id, usuario: req.user.id });
      res.json({ message: 'Orçamento deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = orcamentosController;
