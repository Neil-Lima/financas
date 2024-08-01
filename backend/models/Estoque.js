// Estoque.js
const db = require('../config/database');

const Estoque = {
  createTable: () => {
    const sql = `
      CREATE TABLE IF NOT EXISTS estoque (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER,
        nome TEXT NOT NULL,
        quantidade INTEGER NOT NULL,
        preco_unitario REAL NOT NULL,
        categoria TEXT,
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
      )
    `;
    return db.run(sql);
  },

  create: (item) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO estoque (usuario_id, nome, quantidade, preco_unitario, categoria) VALUES (?, ?, ?, ?, ?)';
      db.run(sql, [item.usuario_id, item.nome, item.quantidade, item.preco_unitario, item.categoria], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...item });
        }
      });
    });
  },

  findAll: (usuarioId) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM estoque WHERE usuario_id = ?';
      db.all(sql, [usuarioId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  update: (item) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE estoque SET nome = ?, quantidade = ?, preco_unitario = ?, categoria = ? WHERE id = ? AND usuario_id = ?';
        db.run(sql, [item.nome, item.quantidade, item.preco_unitario, item.categoria, item.id, item.usuario_id], function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: item.id, ...item });
          }
        });
      });
    },
  
    delete: (id, usuarioId) => {
      return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM estoque WHERE id = ? AND usuario_id = ?';
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
  
  module.exports = Estoque;
  
