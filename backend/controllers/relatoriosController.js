const Transacao = require('../models/Transacao');
const Meta = require('../models/Meta');
const Orcamento = require('../models/Orcamento');
const PDFDocument = require('pdfkit');

const relatoriosController = {
  gerarRelatorioCompleto: async (req, res) => {
    try {
      const { dataInicio, dataFim } = req.query;
      const usuario_id = req.user.id;

      const resumoFinanceiro = await getResumoFinanceiro(usuario_id, dataInicio, dataFim);
      const transacoesPorCategoria = await getTransacoesPorCategoria(usuario_id, dataInicio, dataFim);
      const fluxoCaixa = await getFluxoCaixa(usuario_id, dataInicio, dataFim);
      const progressoMetas = await getProgressoMetas(usuario_id);
      const desempenhoOrcamentos = await getDesempenhoOrcamentos(usuario_id, new Date().getMonth() + 1, new Date().getFullYear());

      const relatorioCompleto = {
        resumoFinanceiro,
        transacoesPorCategoria,
        fluxoCaixa,
        progressoMetas,
        desempenhoOrcamentos
      };

      res.json(relatorioCompleto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  gerarRelatorioPDF: async (req, res) => {
    try {
      const { dataInicio, dataFim } = req.query;
      const usuario_id = req.user.id;

      const resumoFinanceiro = await getResumoFinanceiro(usuario_id, dataInicio, dataFim);
      const transacoesPorCategoria = await getTransacoesPorCategoria(usuario_id, dataInicio, dataFim);
      const fluxoCaixa = await getFluxoCaixa(usuario_id, dataInicio, dataFim);
      const progressoMetas = await getProgressoMetas(usuario_id);
      const desempenhoOrcamentos = await getDesempenhoOrcamentos(usuario_id, new Date().getMonth() + 1, new Date().getFullYear());

      const doc = new PDFDocument();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=relatorio_financeiro.pdf');
      doc.pipe(res);

      // Adicionar conteúdo ao PDF
      doc.fontSize(18).text('Relatório Financeiro', { align: 'center' });
      doc.moveDown();

      doc.fontSize(14).text('Resumo Financeiro');
      doc.fontSize(12).text(`Receita Total: R$ ${resumoFinanceiro.receita_total.toFixed(2)}`);
      doc.text(`Despesa Total: R$ ${resumoFinanceiro.despesa_total.toFixed(2)}`);
      doc.text(`Saldo Total: R$ ${resumoFinanceiro.saldo_total.toFixed(2)}`);
      doc.moveDown();

      doc.fontSize(14).text('Transações por Categoria');
      transacoesPorCategoria.forEach(item => {
        doc.fontSize(12).text(`${item.categoria}: R$ ${item.total.toFixed(2)}`);
      });
      doc.moveDown();

      doc.fontSize(14).text('Fluxo de Caixa');
      fluxoCaixa.forEach(item => {
        doc.fontSize(12).text(`${item.mes}: Receitas R$ ${item.receitas.toFixed(2)}, Despesas R$ ${item.despesas.toFixed(2)}`);
      });
      doc.moveDown();

      doc.fontSize(14).text('Progresso das Metas');
      progressoMetas.forEach(meta => {
        doc.fontSize(12).text(`${meta.descricao}: R$ ${meta.valor_atual.toFixed(2)} / R$ ${meta.valor_alvo.toFixed(2)}`);
      });
      doc.moveDown();

      doc.fontSize(14).text('Desempenho dos Orçamentos');
      desempenhoOrcamentos.forEach(orcamento => {
        doc.fontSize(12).text(`${orcamento.categoria}: R$ ${orcamento.valor_atual.toFixed(2)} / R$ ${orcamento.valor_planejado.toFixed(2)}`);
      });

      doc.end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

async function getResumoFinanceiro(usuario_id, dataInicio, dataFim) {
  const result = await Transacao.aggregate([
    {
      $match: {
        usuario: usuario_id,
        data: { $gte: new Date(dataInicio), $lte: new Date(dataFim) }
      }
    },
    {
      $group: {
        _id: null,
        receita_total: { $sum: { $cond: [{ $eq: ["$tipo", "receita"] }, "$valor", 0] } },
        despesa_total: { $sum: { $cond: [{ $eq: ["$tipo", "despesa"] }, "$valor", 0] } },
        saldo_total: { $sum: { $cond: [{ $eq: ["$tipo", "receita"] }, "$valor", { $multiply: ["$valor", -1] }] } }
      }
    }
  ]);

  return result[0] || { receita_total: 0, despesa_total: 0, saldo_total: 0 };
}

async function getTransacoesPorCategoria(usuario_id, dataInicio, dataFim) {
  return Transacao.aggregate([
    {
      $match: {
        usuario: usuario_id,
        data: { $gte: new Date(dataInicio), $lte: new Date(dataFim) }
      }
    },
    {
      $group: {
        _id: "$categoria",
        total: { $sum: "$valor" }
      }
    },
    {
      $lookup: {
        from: "categorias",
        localField: "_id",
        foreignField: "_id",
        as: "categoria_info"
      }
    },
    {
      $project: {
        categoria: { $arrayElemAt: ["$categoria_info.nome", 0] },
        total: 1
      }
    }
  ]);
}

async function getFluxoCaixa(usuario_id, dataInicio, dataFim) {
  return Transacao.aggregate([
    {
      $match: {
        usuario: usuario_id,
        data: { $gte: new Date(dataInicio), $lte: new Date(dataFim) }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$data" } },
        receitas: { $sum: { $cond: [{ $eq: ["$tipo", "receita"] }, "$valor", 0] } },
        despesas: { $sum: { $cond: [{ $eq: ["$tipo", "despesa"] }, "$valor", 0] } }
      }
    },
    {
      $project: {
        _id: 0,
        mes: "$_id",
        receitas: 1,
        despesas: 1
      }
    },
    { $sort: { mes: 1 } }
  ]);
}

async function getProgressoMetas(usuario_id) {
  return Meta.find({ usuario: usuario_id, concluida: false });
}

async function getDesempenhoOrcamentos(usuario_id, mes, ano) {
  return Orcamento.aggregate([
    {
      $match: {
        usuario: usuario_id,
        mes: mes,
        ano: ano
      }
    },
    {
      $lookup: {
        from: "categorias",
        localField: "categoria",
        foreignField: "_id",
        as: "categoria_info"
      }
    },
    {
      $project: {
        categoria: { $arrayElemAt: ["$categoria_info.nome", 0] },
        valor_planejado: 1,
        valor_atual: 1
      }
    }
  ]);
}

module.exports = relatoriosController;
