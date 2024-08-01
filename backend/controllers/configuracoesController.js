// configuracoesController.js
const db = require('../config/database');

const configuracoesController = {
  getConfiguracoes: async (req, res) => {
    try {
      const sql = 'SELECT * FROM configuracoes WHERE usuario_id = ?';
      db.get(sql, [req.user.id], (err, row) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json(row);
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateConfiguracoes: async (req, res) => {
    const { tema, notificacoes, idioma } = req.body;
    try {
      const sql = 'UPDATE configuracoes SET tema = ?, notificacoes = ?, idioma = ? WHERE usuario_id = ?';
      db.run(sql, [tema, notificacoes, idioma, req.user.id], function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Configurações atualizadas com sucesso' });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = configuracoesController;