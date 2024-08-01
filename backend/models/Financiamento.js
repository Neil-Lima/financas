
// Financiamento.js
const db = require('../config/database');

const Financiamento = {
  createTable: () => {
    const sql = `
      CREATE TABLE IF NOT EXISTS financiamentos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER,
        descricao TEXT NOT NULL,
        valor_total REAL NOT NULL,
        parcelas_totais INTEGER NOT NULL,
        taxa_juros REAL NOT NULL,
        data_inicio DATE NOT NULL,
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
      )
    `;
    return db.run(sql);
  },

  create: (financiamento) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO financiamentos (usuario_id, descricao, valor_total, parcelas_totais, taxa_juros, data_inicio) VALUES (?, ?, ?, ?, ?, ?)';
      db.run(sql, [financiamento.usuario_id, financiamento.descricao, financiamento.valor_total, financiamento.parcelas_totais, financiamento.taxa_juros, financiamento.data_inicio], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...financiamento });
        }
      });
    });
  },

  findAll: (usuarioId) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM financiamentos WHERE usuario_id = ?';
      db.all(sql, [usuarioId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  update: (financiamento) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE financiamentos SET descricao = ?, valor_total = ?, parcelas_totais = ?, taxa_juros = ?, data_inicio = ? WHERE id = ? AND usuario_id = ?';
      db.run(sql, [financiamento.descricao, financiamento.valor_total, financiamento.parcelas_totais, financiamento.taxa_juros, financiamento.data_inicio, financiamento.id, financiamento.usuario_id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: financiamento.id, ...financiamento });
        }
      });
    });
  },

  delete: (id, usuarioId) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM financiamentos WHERE id = ? AND usuario_id = ?';
      db.run(sql, [id, usuarioId], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id });
        }
      });
    });
  }
};

module.exports = Financiamento;