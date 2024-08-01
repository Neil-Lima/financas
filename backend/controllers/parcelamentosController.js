// parcelamentosController.js
const db = require('../config/database');

const parcelamentosController = {
  getAllParcelamentos: async (req, res) => {
    try {
      const sql = 'SELECT * FROM parcelamentos WHERE usuario_id = ?';
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

  createParcelamento: async (req, res) => {
    const { descricao, valor_total, numero_parcelas, data_inicio } = req.body;
    try {
      const sql = 'INSERT INTO parcelamentos (usuario_id, descricao, valor_total, numero_parcelas, data_inicio) VALUES (?, ?, ?, ?, ?)';
      db.run(sql, [req.user.id, descricao, valor_total, numero_parcelas, data_inicio], function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, descricao, valor_total, numero_parcelas, data_inicio });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateParcelamento: async (req, res) => {
    const { id, descricao, valor_total, numero_parcelas, data_inicio } = req.body;
    try {
      const sql = 'UPDATE parcelamentos SET descricao = ?, valor_total = ?, numero_parcelas = ?, data_inicio = ? WHERE id = ? AND usuario_id = ?';
      db.run(sql, [descricao, valor_total, numero_parcelas, data_inicio, id, req.user.id], function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Parcelamento atualizado com sucesso' });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteParcelamento: async (req, res) => {
    const { id } = req.params;
    try {
      const sql = 'DELETE FROM parcelamentos WHERE id = ? AND usuario_id = ?';
      db.run(sql, [id, req.user.id], function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Parcelamento deletado com sucesso' });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = parcelamentosController;