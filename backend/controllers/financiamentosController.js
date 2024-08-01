// financiamentosController.js
const db = require('../config/database');

const financiamentosController = {
  getAllFinanciamentos: async (req, res) => {
    try {
      const sql = 'SELECT * FROM financiamentos WHERE usuario_id = ?';
      db.all(sql, [req.user.id], (err, rows) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json(rows);
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createFinanciamento: async (req, res) => {
    const { descricao, valor_total, parcelas_totais, taxa_juros, data_inicio } = req.body;
    try {
      const sql = 'INSERT INTO financiamentos (usuario_id, descricao, valor_total, parcelas_totais, taxa_juros, data_inicio) VALUES (?, ?, ?, ?, ?, ?)';
      db.run(sql, [req.user.id, descricao, valor_total, parcelas_totais, taxa_juros, data_inicio], function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, descricao, valor_total, parcelas_totais, taxa_juros, data_inicio });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateFinanciamento: async (req, res) => {
    const { id, descricao, valor_total, parcelas_totais, taxa_juros, data_inicio } = req.body;
    try {
      const sql = 'UPDATE financiamentos SET descricao = ?, valor_total = ?, parcelas_totais = ?, taxa_juros = ?, data_inicio = ? WHERE id = ? AND usuario_id = ?';
      db.run(sql, [descricao, valor_total, parcelas_totais, taxa_juros, data_inicio, id, req.user.id], function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Financiamento atualizado com sucesso' });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteFinanciamento: async (req, res) => {
    const { id } = req.params;
    try {
      const sql = 'DELETE FROM financiamentos WHERE id = ? AND usuario_id = ?';
      db.run(sql, [id, req.user.id], function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Financiamento deletado com sucesso' });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = financiamentosController;