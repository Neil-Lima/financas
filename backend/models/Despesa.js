const db = require('../config/database');

const Despesa = {
  createTable: () => {
    const sql = `
      CREATE TABLE IF NOT EXISTS despesas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER,
        descricao TEXT NOT NULL,
        valor REAL NOT NULL,
        data DATE NOT NULL,
        categoria_id INTEGER,
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id),
        FOREIGN KEY (categoria_id) REFERENCES categorias (id)
      )
    `;
    return db.run(sql);
  },

  create: (despesa) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO despesas (usuario_id, descricao, valor, data, categoria_id) VALUES (?, ?, ?, ?, ?)';
      db.run(sql, [despesa.usuario_id, despesa.descricao, despesa.valor, despesa.data, despesa.categoria_id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...despesa });
        }
      });
    });
  },

  findAll: (usuarioId) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM despesas WHERE usuario_id = ?';
      db.all(sql, [usuarioId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  update: (despesa) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE despesas SET descricao = ?, valor = ?, data = ?, categoria_id = ? WHERE id = ? AND usuario_id = ?';
      db.run(sql, [despesa.descricao, despesa.valor, despesa.data, despesa.categoria_id, despesa.id, despesa.usuario_id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: despesa.id, ...despesa });
        }
      });
    });
  },

  delete: (id, usuarioId) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM despesas WHERE id = ? AND usuario_id = ?';
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

module.exports = Despesa;
