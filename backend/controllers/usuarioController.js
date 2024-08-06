// controllers/usuarioController.js
const Usuario = require('../models/Usuario');

exports.register = async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    const token = await usuario.generateAuthToken();
    res.status(201).send({ usuario, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    const usuario = await Usuario.findByCredentials(req.body.email, req.body.senha);
    const token = await usuario.generateAuthToken();
    res.send({ usuario, token });
  } catch (error) {
    res.status(400).send();
  }
};

exports.logout = async (req, res) => {
  try {
    req.usuario.tokens = req.usuario.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.usuario.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
};

exports.getProfile = async (req, res) => {
  res.send(req.usuario);
};
