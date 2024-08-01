// Configuracao.js
const db = require('../config/database');

const Configuracao = {
  createTable: () => {
    const sql = `
      CREATE TABLE IF NOT EXISTS configuracoes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER,
        tema TEXT,
        notificacoes TEXT,
        idioma TEXT,
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
      )
    `;
    return db.run(sql);
  },

  create: (configuracao) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO configuracoes (usuario_id, tema, notificacoes, idioma) VALUES (?, ?, ?, ?)';
      db.run(sql, [configuracao.usuario_id, configuracao.tema, configuracao.notificacoes, configuracao.idioma], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...configuracao });
        }
      });
    });
  },

  findByUsuarioId: (usuarioId) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM configuracoes WHERE usuario_id = ?';
      db.get(sql, [usuarioId], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },

  update: (configuracao) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE configuracoes SET tema = ?, notificacoes = ?, idioma = ? WHERE usuario_id = ?';
      db.run(sql, [configuracao.tema, configuracao.notificacoes, configuracao.idioma, configuracao.usuario_id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...configuracao });
        }
      });
    });
  }
};

module.exports = Configuracao;