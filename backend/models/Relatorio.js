const mongoose = require("mongoose");

const relatorioSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  tipo: { type: String, required: true },
  data_inicio: { type: Date, required: true },
  data_fim: { type: Date, required: true },
  conteudo: { type: mongoose.Schema.Types.Mixed, required: true },
  created_at: { type: Date, default: Date.now },
});

const Relatorio = mongoose.model("Relatorio", relatorioSchema);

module.exports = Relatorio;
