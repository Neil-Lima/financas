const mongoose = require('mongoose');

const metaSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  descricao: { type: String, required: true },
  valor_alvo: { type: Number, required: true },
  valor_atual: { type: Number, default: 0 },
  data_limite: { type: Date, required: true },
  concluida: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

const Meta = mongoose.model('Meta', metaSchema);

module.exports = Meta;
