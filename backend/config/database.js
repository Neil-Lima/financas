const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = process.env.NODE_ENV === 'production'
  ? '/tmp/financas.db'
  : path.join(__dirname, '..', 'financas.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados', err);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
    db.run(`PRAGMA foreign_keys = ON`);
  }
});

module.exports = db;
