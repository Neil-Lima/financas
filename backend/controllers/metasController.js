const Meta = require('../models/Meta');

const metasController = {
  createMeta: async (req, res) => {
    try {
      const newMeta = await Meta.create({ ...req.body, usuario: req.user.id });
      res.status(201).json(newMeta);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllMetas: async (req, res) => {
    try {
      const metas = await Meta.find({ usuario: req.user.id });
      res.json(metas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getMetaById: async (req, res) => {
    try {
      const meta = await Meta.findOne({ _id: req.params.id, usuario: req.user.id });
      if (meta) {
        res.json(meta);
      } else {
        res.status(404).json({ message: 'Meta não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateMeta: async (req, res) => {
    try {
      const updatedMeta = await Meta.findOneAndUpdate(
        { _id: req.params.id, usuario: req.user.id },
        req.body,
        { new: true }
      );
      res.json(updatedMeta);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteMeta: async (req, res) => {
    try {
      await Meta.findOneAndDelete({ _id: req.params.id, usuario: req.user.id });
      res.json({ message: 'Meta deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = metasController;
