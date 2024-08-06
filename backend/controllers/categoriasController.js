const Categoria = require('../models/Categoria');

const categoriasController = {
  getAllCategorias: async (req, res) => {
    try {
      const categorias = await Categoria.find({ usuario: req.user.id });
      res.json(categorias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createCategoria: async (req, res) => {
    try {
      const novaCategoria = await Categoria.create({ ...req.body, usuario: req.user.id });
      res.status(201).json(novaCategoria);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateCategoria: async (req, res) => {
    try {
      const categoriaAtualizada = await Categoria.findOneAndUpdate(
        { _id: req.params.id, usuario: req.user.id },
        req.body,
        { new: true }
      );
      res.json(categoriaAtualizada);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteCategoria: async (req, res) => {
    try {
      await Categoria.findOneAndDelete({ _id: req.params.id, usuario: req.user.id });
      res.json({ message: 'Categoria deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  insertDefaultCategories: async (req, res) => {
    try {
      const defaultCategories = [
        { nome: 'Alimentação', tipo: 'despesa' },
        { nome: 'Transporte', tipo: 'despesa' },
        { nome: 'Moradia', tipo: 'despesa' },
        { nome: 'Saúde', tipo: 'despesa' },
        { nome: 'Educação', tipo: 'despesa' },
        { nome: 'Lazer', tipo: 'despesa' },
        { nome: 'Salário', tipo: 'receita' },
        { nome: 'Investimentos', tipo: 'receita' },
        { nome: 'Outros', tipo: 'despesa' }
      ];

      const createdCategories = await Categoria.insertMany(
        defaultCategories.map(category => ({ ...category, usuario: req.user.id }))
      );

      res.json({ message: 'Categorias padrão inseridas com sucesso', categorias: createdCategories });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = categoriasController;
