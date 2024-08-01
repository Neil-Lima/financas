const db = require('../config/database');

const Orcamento = {
  createTable: () => {
    const sql = `
      CREATE TABLE IF NOT EXISTS orcamentos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER,
        categoria_id INTEGER,
        valor_planejado REAL NOT NULL,
        valor_atual REAL DEFAULT 0,
        mes INTEGER NOT NULL,
        ano INTEGER NOT NULL,
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id),
        FOREIGN KEY (categoria_id) REFERENCES categorias (id)
      )
    `;
    return db.run(sql);
  },

  create: (orcamento) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO orcamentos (usuario_id, categoria_id, valor_planejado, mes, ano) VALUES (?, ?, ?, ?, ?)';
      db.run(sql, [orcamento.usuario_id, orcamento.categoria_id, orcamento.valor_planejado, orcamento.mes, orcamento.ano], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...orcamento });
        }
      });
    });
  },

  findAll: (usuarioId, mes, ano) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT o.*, c.nome as categoria_nome FROM orcamentos o JOIN categorias c ON o.categoria_id = c.id WHERE o.usuario_id = ? AND o.mes = ? AND o.ano = ?';
      db.all(sql, [usuarioId, mes, ano], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  update: (orcamento) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE orcamentos SET valor_planejado = ?, valor_atual = ? WHERE id = ? AND usuario_id = ?';
      db.run(sql, [orcamento.valor_planejado, orcamento.valor_atual, orcamento.id, orcamento.usuario_id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: orcamento.id, ...orcamento });
        }
      });
    });
  },

  delete: (id, usuarioId) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM orcamentos WHERE id = ? AND usuario_id = ?';
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

module.exports = Orcamento;
