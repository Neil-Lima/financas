const db = require('../config/database');
const bcrypt = require('bcrypt');

const Usuario = {
  createTable: () => {
    const sql = `
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;
    return db.run(sql);
  },

  create: async (usuario) => {
    const hashedPassword = await bcrypt.hash(usuario.senha, 10);
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
      db.run(sql, [usuario.nome, usuario.email, hashedPassword], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, nome: usuario.nome, email: usuario.email });
        }
      });
    });
  },

  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM usuarios WHERE email = ?';
      db.get(sql, [email], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT id, nome, email, created_at FROM usuarios WHERE id = ?';
      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },

  update: async (id, usuario) => {
    let hashedPassword = usuario.senha;
    if (usuario.senha) {
      hashedPassword = await bcrypt.hash(usuario.senha, 10);
    }
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?';
      db.run(sql, [usuario.nome, usuario.email, hashedPassword, id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id, nome: usuario.nome, email: usuario.email });
        }
      });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM usuarios WHERE id = ?';
      db.run(sql, [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id });
        }
      });
    });
  }
};

module.exports = Usuario;
