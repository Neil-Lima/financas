const mongoose = require('mongoose');

const parcelamentoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  descricao: { type: String, required: true },
  valor_total: { type: Number, required: true },
  numero_parcelas: { type: Number, required: true },
  data_inicio: { type: Date, required: true }
});

const Parcelamento = mongoose.model('Parcelamento', parcelamentoSchema);

module.exports = Parcelamento;
