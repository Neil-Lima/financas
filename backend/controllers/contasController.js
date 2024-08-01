const Conta = require('../models/Conta');

const contasController = {
  createConta: async (req, res) => {
    try {
      const newConta = await Conta.create({ ...req.body, usuario_id: req.user.id });
      res.status(201).json(newConta);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllContas: async (req, res) => {
    try {
      const contas = await Conta.findAll(req.user.id);
      res.json(contas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getContaById: async (req, res) => {
    try {
      const conta = await Conta.findById(req.params.id, req.user.id);
      if (conta) {
        res.json(conta);
      } else {
        res.status(404).json({ message: 'Conta não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateConta: async (req, res) => {
    try {
      const updatedConta = await Conta.update(req.params.id, req.body, req.user.id);
      res.json(updatedConta);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteConta: async (req, res) => {
    try {
      await Conta.delete(req.params.id, req.user.id);
      res.json({ message: 'Conta deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = contasController;
