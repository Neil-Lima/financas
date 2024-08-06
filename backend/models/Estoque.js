const mongoose = require('mongoose');

const estoqueSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  nome: { type: String, required: true },
  quantidade: { type: Number, required: true },
  preco_unitario: { type: Number, required: true },
  categoria: { type: String }
});

const Estoque = mongoose.model('Estoque', estoqueSchema);

module.exports = Estoque;
