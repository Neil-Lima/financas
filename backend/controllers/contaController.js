const Conta = require('../models/Conta');

exports.criarConta = async (req, res) => {
  try {
    const conta = new Conta({
      ...req.body,
      usuario: req.usuario._id
    });
    await conta.save();
    res.status(201).send(conta);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.listarContas = async (req, res) => {
  try {
    const contas = await Conta.find({ usuario: req.usuario._id });
    res.send(contas);
  } catch (error) {
    res.status(500).send();
  }
};

exports.obterConta = async (req, res) => {
  try {
    const conta = await Conta.findOne({ _id: req.params.id, usuario: req.usuario._id });
    if (!conta) {
      return res.status(404).send();
    }
    res.send(conta);
  } catch (error) {
    res.status(500).send();
  }
};

exports.atualizarConta = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['nome', 'tipo', 'saldo', 'instituicao', 'numero', 'cor', 'ativo'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Atualizações inválidas!' });
  }

  try {
    const conta = await Conta.findOne({ _id: req.params.id, usuario: req.usuario._id });
    if (!conta) {
      return res.status(404).send();
    }

    updates.forEach((update) => conta[update] = req.body[update]);
    await conta.save();
    res.send(conta);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deletarConta = async (req, res) => {
  try {
    const conta = await Conta.findOneAndDelete({ _id: req.params.id, usuario: req.usuario._id });
    if (!conta) {
      return res.status(404).send();
    }
    res.send(conta);
  } catch (error) {
    res.status(500).send();
  }
};
