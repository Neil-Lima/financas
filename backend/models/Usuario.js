// models/Usuario.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  senha: {
    type: String,
    required: true,
    minlength: 7
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});

usuarioSchema.methods.generateAuthToken = async function() {
  const usuario = this;
  const token = jwt.sign({ _id: usuario._id.toString() }, process.env.JWT_SECRET);
  usuario.tokens = usuario.tokens.concat({ token });
  await usuario.save();
  return token;
};

usuarioSchema.statics.findByCredentials = async (email, senha) => {
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    throw new Error('Unable to login');
  }
  const isMatch = await bcrypt.compare(senha, usuario.senha);
  if (!isMatch) {
    throw new Error('Unable to login');
  }
  return usuario;
};

usuarioSchema.pre('save', async function (next) {
  const usuario = this;
  if (usuario.isModified('senha')) {
    usuario.senha = await bcrypt.hash(usuario.senha, 8);
  }
  next();
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
