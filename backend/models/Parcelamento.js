// Parcelamento.js
const db = require('../config/database');

const Parcelamento = {
  createTable: () => {
    const sql = `
      CREATE TABLE IF NOT EXISTS parcelamentos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER,
        descricao TEXT NOT NULL,
        valor_total REAL NOT NULL,
        numero_parcelas INTEGER NOT NULL,
        data_inicio DATE NOT NULL,
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
      )
    `;
    return db.run(sql);
  },

  create: (parcelamento) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO parcelamentos (usuario_id, descricao, valor_total, numero_parcelas, data_inicio) VALUES (?, ?, ?, ?, ?)';
      db.run(sql, [parcelamento.usuario_id, parcelamento.descricao, parcelamento.valor_total, parcelamento.numero_parcelas, parcelamento.data_inicio], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...parcelamento });
        }
      });
    });
  },

  findAll: (usuarioId) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM parcelamentos WHERE usuario_id = ?';
      db.all(sql, [usuarioId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  update: (parcelamento) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE parcelamentos SET descricao = ?, valor_total = ?, numero_parcelas = ?, data_inicio = ? WHERE id = ? AND usuario_id = ?';
      db.run(sql, [parcelamento.descricao, parcelamento.valor_total, parcelamento.numero_parcelas, parcelamento.data_inicio, parcelamento.id, parcelamento.usuario_id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: parcelamento.id, ...parcelamento });
        }
      });
    });
  },

  delete: (id, usuarioId) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM parcelamentos WHERE id = ? AND usuario_id = ?';
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

module.exports = Parcelamento;