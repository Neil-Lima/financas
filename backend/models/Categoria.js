const db = require('../config/database');

const Categoria = {
  createTable: () => {
    const sql = `
      CREATE TABLE IF NOT EXISTS categorias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER,
        nome TEXT NOT NULL,
        tipo TEXT NOT NULL,
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
      )
    `;
    return db.run(sql);
  },

  create: (categoria) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO categorias (usuario_id, nome, tipo) VALUES (?, ?, ?)';
      db.run(sql, [categoria.usuario_id, categoria.nome, categoria.tipo], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...categoria });
        }
      });
    });
  },

  findAll: (usuarioId) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM categorias WHERE usuario_id = ?';
      db.all(sql, [usuarioId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  update: (categoria) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE categorias SET nome = ?, tipo = ? WHERE id = ? AND usuario_id = ?';
      db.run(sql, [categoria.nome, categoria.tipo, categoria.id, categoria.usuario_id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: categoria.id, ...categoria });
        }
      });
    });
  },

  delete: (id, usuarioId) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM categorias WHERE id = ? AND usuario_id = ?';
      db.run(sql, [id, usuarioId], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id });
        }
      });
    });
  },

  insertDefaultCategories: (usuarioId) => {
    return new Promise((resolve, reject) => {
      const defaultCategories = [
        { nome: 'Alimentação', tipo: 'despesa' },
        { nome: 'Transporte', tipo: 'despesa' },
        { nome: 'Moradia', tipo: 'despesa' },
        { nome: 'Saúde', tipo: 'despesa' },
        { nome: 'Educação', tipo: 'despesa' },
        { nome: 'Lazer', tipo: 'despesa' },
        { nome: 'Salário', tipo: 'receita' },
        { nome: 'Investimentos', tipo: 'receita' },
        { nome: 'Outros', tipo: 'despesa' }
      ];

      const sql = 'INSERT INTO categorias (usuario_id, nome, tipo) VALUES (?, ?, ?)';
      const stmt = db.prepare(sql);

      db.serialize(() => {
        db.run('BEGIN TRANSACTION');
        defaultCategories.forEach(category => {
          stmt.run(usuarioId, category.nome, category.tipo);
        });
        db.run('COMMIT', (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      stmt.finalize();
    });
  }
};

module.exports = Categoria;
