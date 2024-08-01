const Categoria = require('../models/Categoria');

const categoriasController = {
  getAllCategorias: async (req, res) => {
    try {
      const categorias = await Categoria.findAll(req.user.id);
      res.json(categorias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createCategoria: async (req, res) => {
    try {
      const novaCategoria = await Categoria.create({ ...req.body, usuario_id: req.user.id });
      res.status(201).json(novaCategoria);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateCategoria: async (req, res) => {
    try {
      const categoriaAtualizada = await Categoria.update({ ...req.body, id: req.params.id, usuario_id: req.user.id });
      res.json(categoriaAtualizada);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteCategoria: async (req, res) => {
    try {
      await Categoria.delete(req.params.id, req.user.id);
      res.json({ message: 'Categoria deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  insertDefaultCategories: async (req, res) => {
    try {
      await Categoria.insertDefaultCategories(req.user.id);
      res.json({ message: 'Categorias padrão inseridas com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = categoriasController;
