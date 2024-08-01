const Despesa = require('../models/Despesa');

const despesasController = {
  getAllDespesas: async (req, res) => {
    try {
      const despesas = await Despesa.findAll(req.user.id);
      res.json(despesas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createDespesa: async (req, res) => {
    try {
      const novaDespesa = await Despesa.create({ ...req.body, usuario_id: req.user.id });
      res.status(201).json(novaDespesa);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateDespesa: async (req, res) => {
    try {
      const despesaAtualizada = await Despesa.update({ ...req.body, usuario_id: req.user.id });
      res.json(despesaAtualizada);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteDespesa: async (req, res) => {
    try {
      await Despesa.delete(req.params.id, req.user.id);
      res.json({ message: 'Despesa deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = despesasController;
