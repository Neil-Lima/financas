const db = require('../config/database');

const Conta = {
  createTable: () => {
    const sql = `
      CREATE TABLE IF NOT EXISTS contas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER,
        nome TEXT NOT NULL,
        saldo REAL NOT NULL,
        tipo TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
      )
    `;
    return db.run(sql);
  },

  create: (conta) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO contas (usuario_id, nome, saldo, tipo) VALUES (?, ?, ?, ?)';
      db.run(sql, [conta.usuario_id, conta.nome, conta.saldo, conta.tipo], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...conta });
        }
      });
    });
  },

  findAll: (usuario_id) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM contas WHERE usuario_id = ?';
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
      const sql = 'SELECT * FROM contas WHERE id = ? AND usuario_id = ?';
      db.get(sql, [id, usuario_id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },

  update: (id, conta, usuario_id) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE contas SET nome = ?, saldo = ?, tipo = ? WHERE id = ? AND usuario_id = ?';
      db.run(sql, [conta.nome, conta.saldo, conta.tipo, id, usuario_id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id, ...conta });
        }
      });
    });
  },

  delete: (id, usuario_id) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM contas WHERE id = ? AND usuario_id = ?';
      db.run(sql, [id, usuario_id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id });
        }
      });
    });
  },

  insertDefaultAccounts: (usuario_id) => {
    const defaultAccounts = [
      { nome: 'Conta Corrente', saldo: 0, tipo: 'Corrente' },
      { nome: 'Poupança', saldo: 0, tipo: 'Poupança' },
      { nome: 'Carteira', saldo: 0, tipo: 'Dinheiro' }
    ];

    const promises = defaultAccounts.map(account => 
      Conta.create({ ...account, usuario_id })
    );

    return Promise.all(promises);
  }
};

module.exports = Conta;
