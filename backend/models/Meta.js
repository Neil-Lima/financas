const db = require('../config/database');

const Meta = {
  createTable: () => {
    const sql = `
      CREATE TABLE IF NOT EXISTS metas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER,
        descricao TEXT NOT NULL,
        valor_alvo REAL NOT NULL,
        valor_atual REAL DEFAULT 0,
        data_limite DATE NOT NULL,
        concluida BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
      )
    `;
    return db.run(sql);
  },

  create: (meta) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO metas (usuario_id, descricao, valor_alvo, data_limite) VALUES (?, ?, ?, ?)';
      db.run(sql, [meta.usuario_id, meta.descricao, meta.valor_alvo, meta.data_limite], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...meta });
        }
      });
    });
  },

  findAll: (usuario_id) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM metas WHERE usuario_id = ?';
      db.all(sql, [usuario_id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  findById: (id, usuario_id) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM metas WHERE id = ? AND usuario_id = ?';
      db.get(sql, [id, usuario_id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },

  update: (id, meta, usuario_id) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE metas SET descricao = ?, valor_alvo = ?, valor_atual = ?, data_limite = ?, concluida = ? WHERE id = ? AND usuario_id = ?';
      db.run(sql, [meta.descricao, meta.valor_alvo, meta.valor_atual, meta.data_limite, meta.concluida, id, usuario_id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id, ...meta });
        }
      });
    });
  },

  delete: (id, usuario_id) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM metas WHERE id = ? AND usuario_id = ?';
      db.run(sql, [id, usuario_id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id });
        }
      });
    });
  }
};

module.exports = Meta;
