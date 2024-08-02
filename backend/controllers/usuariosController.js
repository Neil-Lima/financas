const Usuario = require('../models/Usuario');
const Categoria = require('../models/Categoria');
const Conta = require('../models/Conta');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usuariosController = {
  register: async (req, res) => {
    try {
      const newUser = await Usuario.create(req.body);
      await Categoria.insertDefaultCategories(newUser.id);
      await Conta.insertDefaultAccounts(newUser.id);
      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json({ token, user: { id: newUser.id, nome: newUser.nome, email: newUser.email } });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, senha } = req.body;
      const user = await Usuario.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Email ou senha inválidos' });
      }
      const isValidPassword = await bcrypt.compare(senha, user.senha);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Email ou senha inválidos' });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, user: { id: user.id, nome: user.nome, email: user.email } });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProfile: async (req, res) => {
    try {
      const user = await Usuario.findById(req.user.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const updatedUser = await Usuario.update(req.user.id, req.body);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteProfile: async (req, res) => {
    try {
      await Usuario.delete(req.user.id);
      res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await Usuario.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      await Usuario.delete(req.params.id);
      res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = usuariosController;
