const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  nome: { type: String, required: true },
  tipo: { type: String, required: true }
});

const Categoria = mongoose.model('Categoria', categoriaSchema);

module.exports = Categoria;
