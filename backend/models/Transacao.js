const mongoose = require('mongoose');

const transacaoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  conta: { type: mongoose.Schema.Types.ObjectId, ref: 'Conta', required: true },
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: true },
  descricao: { type: String, required: true },
  valor: { type: Number, required: true },
  data: { type: Date, required: true },
  tipo: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

const Transacao = mongoose.model('Transacao', transacaoSchema);

module.exports = Transacao;
