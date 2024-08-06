const mongoose = require('mongoose');

const contaSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Usuario'
  },
  nome: {
    type: String,
    required: true,
    trim: true
  },
  tipo: {
    type: String,
    required: true,
    enum: ['Conta Corrente', 'Conta Poupança', 'Cartão de Crédito', 'Investimento', 'Dinheiro', 'Outros']
  },
  saldo: {
    type: Number,
    required: true,
    default: 0
  },
  instituicao: {
    type: String,
    trim: true
  },
  numero: {
    type: String,
    trim: true
  },
  cor: {
    type: String,
    default: '#000000'
  },
  ativo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Conta = mongoose.model('Conta', contaSchema);

module.exports = Conta;
