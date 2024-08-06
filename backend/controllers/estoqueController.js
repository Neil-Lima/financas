const Estoque = require('../models/Estoque');

const estoqueController = {
  getAllItems: async (req, res) => {
    try {
      const items = await Estoque.find({ usuario: req.user.id });
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createItem: async (req, res) => {
    try {
      const novoItem = await Estoque.create({ ...req.body, usuario: req.user.id });
      res.status(201).json(novoItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateItem: async (req, res) => {
    try {
      const itemAtualizado = await Estoque.findOneAndUpdate(
        { _id: req.params.id, usuario: req.user.id },
        req.body,
        { new: true }
      );
      res.json(itemAtualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteItem: async (req, res) => {
    try {
      await Estoque.findOneAndDelete({ _id: req.params.id, usuario: req.user.id });
      res.json({ message: 'Item deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = estoqueController;
