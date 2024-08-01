// estoqueController.js
const db = require('../config/database');

const estoqueController = {
  getAllItems: async (req, res) => {
    try {
      const sql = 'SELECT * FROM estoque WHERE usuario_id = ?';
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

  createItem: async (req, res) => {
    const { nome, quantidade, preco_unitario, categoria } = req.body;
    try {
      const sql = 'INSERT INTO estoque (usuario_id, nome, quantidade, preco_unitario, categoria) VALUES (?, ?, ?, ?, ?)';
      db.run(sql, [req.user.id, nome, quantidade, preco_unitario, categoria], function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, nome, quantidade, preco_unitario, categoria });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateItem: async (req, res) => {
    const { id, nome, quantidade, preco_unitario, categoria } = req.body;
    try {
      const sql = 'UPDATE estoque SET nome = ?, quantidade = ?, preco_unitario = ?, categoria = ? WHERE id = ? AND usuario_id = ?';
      db.run(sql, [nome, quantidade, preco_unitario, categoria, id, req.user.id], function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Item atualizado com sucesso' });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteItem: async (req, res) => {
    const { id } = req.params;
    try {
      const sql = 'DELETE FROM estoque WHERE id = ? AND usuario_id = ?';
      db.run(sql, [id, req.user.id], function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Item deletado com sucesso' });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = estoqueController;