const Orcamento = require('../models/Orcamento');

const orcamentosController = {
  createOrcamento: async (req, res) => {
    try {
      const novoOrcamento = await Orcamento.create({ ...req.body, usuario_id: req.user.id });
      res.status(201).json(novoOrcamento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllOrcamentos: async (req, res) => {
    try {
      const { mes, ano } = req.query;
      const orcamentos = await Orcamento.findAll(req.user.id, mes, ano);
      res.json(orcamentos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getOrcamentoById: async (req, res) => {
    try {
      const orcamento = await Orcamento.findById(req.params.id, req.user.id);
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
      const orcamentoAtualizado = await Orcamento.update({ ...req.body, id: req.params.id, usuario_id: req.user.id });
      res.json(orcamentoAtualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteOrcamento: async (req, res) => {
    try {
      await Orcamento.delete(req.params.id, req.user.id);
      res.json({ message: 'Orçamento deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = orcamentosController;
