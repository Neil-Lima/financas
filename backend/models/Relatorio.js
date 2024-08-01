const db = require('../config/database');

const Relatorio = {
  getResumoFinanceiro: (usuario_id, dataInicio, dataFim) => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT 
          SUM(CASE WHEN tipo = 'receita' THEN valor ELSE 0 END) as receita_total,
          SUM(CASE WHEN tipo = 'despesa' THEN valor ELSE 0 END) as despesa_total,
          SUM(CASE WHEN tipo = 'receita' THEN valor ELSE -valor END) as saldo_total
        FROM transacoes
        WHERE usuario_id = ? AND data BETWEEN ? AND ?
      `;
      db.get(sql, [usuario_id, dataInicio, dataFim], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },

  getTransacoesPorCategoria: (usuario_id, dataInicio, dataFim) => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT c.nome as categoria, SUM(t.valor) as total
        FROM transacoes t
        JOIN categorias c ON t.categoria_id = c.id
        WHERE t.usuario_id = ? AND t.data BETWEEN ? AND ?
        GROUP BY t.categoria_id
      `;
      db.all(sql, [usuario_id, dataInicio, dataFim], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  getFluxoCaixa: (usuario_id, dataInicio, dataFim) => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT 
          strftime('%Y-%m', data) as mes,
          SUM(CASE WHEN tipo = 'receita' THEN valor ELSE 0 END) as receitas,
          SUM(CASE WHEN tipo = 'despesa' THEN valor ELSE 0 END) as despesas
        FROM transacoes
        WHERE usuario_id = ? AND data BETWEEN ? AND ?
        GROUP BY strftime('%Y-%m', data)
        ORDER BY mes
      `;
      db.all(sql, [usuario_id, dataInicio, dataFim], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  getProgressoMetas: (usuario_id) => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT descricao, valor_alvo, valor_atual, data_limite
        FROM metas
        WHERE usuario_id = ? AND concluida = 0
      `;
      db.all(sql, [usuario_id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  getDesempenhoOrcamentos: (usuario_id, mes, ano) => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT c.nome as categoria, o.valor_planejado, o.valor_atual
        FROM orcamentos o
        JOIN categorias c ON o.categoria_id = c.id
        WHERE o.usuario_id = ? AND o.mes = ? AND o.ano = ?
      `;
      db.all(sql, [usuario_id, mes, ano], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
};

module.exports = Relatorio;
