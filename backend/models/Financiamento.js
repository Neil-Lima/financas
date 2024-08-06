const mongoose = require("mongoose");

const financiamentoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  descricao: { type: String, required: true },
  valor_total: { type: Number, required: true },
  parcelas_totais: { type: Number, required: true },
  taxa_juros: { type: Number, required: true },
  data_inicio: { type: Date, required: true },
});

const Financiamento = mongoose.model("Financiamento", financiamentoSchema);

module.exports = Financiamento;
