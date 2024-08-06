const Parcelamento = require('../models/Parcelamento');

const parcelamentosController = {
  getAllParcelamentos: async (req, res) => {
    try {
      const parcelamentos = await Parcelamento.find({ usuario: req.user.id });
      res.json(parcelamentos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createParcelamento: async (req, res) => {
    try {
      const novoParcelamento = await Parcelamento.create({ ...req.body, usuario: req.user.id });
      res.status(201).json(novoParcelamento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateParcelamento: async (req, res) => {
    try {
      const parcelamentoAtualizado = await Parcelamento.findOneAndUpdate(
        { _id: req.params.id, usuario: req.user.id },
        req.body,
        { new: true }
      );
      res.json(parcelamentoAtualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteParcelamento: async (req, res) => {
    try {
      await Parcelamento.findOneAndDelete({ _id: req.params.id, usuario: req.user.id });
      res.json({ message: 'Parcelamento deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = parcelamentosController;
