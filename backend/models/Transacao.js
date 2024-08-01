const db = require('../config/database');

const Transacao = {
  createTable: () => {
    const sql = `
      CREATE TABLE IF NOT EXISTS transacoes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER,
        conta_id INTEGER,
        categoria_id INTEGER,
        descricao TEXT NOT NULL,
        valor REAL NOT NULL,
        data DATE NOT NULL,
        tipo TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id),
        FOREIGN KEY (conta_id) REFERENCES contas (id),
        FOREIGN KEY (categoria_id) REFERENCES categorias (id)
      )
    `;
    return db.run(sql);
  },

  create: (transacao) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO transacoes (usuario_id, conta_id, categoria_id, descricao, valor, data, tipo) VALUES (?, ?, ?, ?, ?, ?, ?)';
      db.run(sql, [transacao.usuario_id, transacao.conta_id, transacao.categoria_id, transacao.descricao, transacao.valor, transacao.data, transacao.tipo], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...transacao });
        }
      });
    });
  },

  findAll: (usuario_id) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM transacoes WHERE usuario_id = ? ORDER BY data DESC';
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
      const sql = 'SELECT * FROM transacoes WHERE id = ? AND usuario_id = ?';
      db.get(sql, [id, usuario_id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },

  update: (id, transacao, usuario_id) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE transacoes SET conta_id = ?, categoria_id = ?, descricao = ?, valor = ?, data = ?, tipo = ? WHERE id = ? AND usuario_id = ?';
      db.run(sql, [transacao.conta_id, transacao.categoria_id, transacao.descricao, transacao.valor, transacao.data, transacao.tipo, id, usuario_id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id, ...transacao });
        }
      });
    });
  },

  delete: (id, usuario_id) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM transacoes WHERE id = ? AND usuario_id = ?';
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

module.exports = Transacao;
