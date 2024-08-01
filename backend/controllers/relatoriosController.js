const Relatorio = require('../models/Relatorio');
const PDFDocument = require('pdfkit');

const relatoriosController = {
  gerarRelatorioCompleto: async (req, res) => {
    try {
      const { dataInicio, dataFim } = req.query;
      const usuario_id = req.user.id;

      const resumoFinanceiro = await Relatorio.getResumoFinanceiro(usuario_id, dataInicio, dataFim);
      const transacoesPorCategoria = await Relatorio.getTransacoesPorCategoria(usuario_id, dataInicio, dataFim);
      const fluxoCaixa = await Relatorio.getFluxoCaixa(usuario_id, dataInicio, dataFim);
      const progressoMetas = await Relatorio.getProgressoMetas(usuario_id);
      const desempenhoOrcamentos = await Relatorio.getDesempenhoOrcamentos(usuario_id, new Date().getMonth() + 1, new Date().getFullYear());

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

      const resumoFinanceiro = await Relatorio.getResumoFinanceiro(usuario_id, dataInicio, dataFim);
      const transacoesPorCategoria = await Relatorio.getTransacoesPorCategoria(usuario_id, dataInicio, dataFim);
      const fluxoCaixa = await Relatorio.getFluxoCaixa(usuario_id, dataInicio, dataFim);
      const progressoMetas = await Relatorio.getProgressoMetas(usuario_id);
      const desempenhoOrcamentos = await Relatorio.getDesempenhoOrcamentos(usuario_id, new Date().getMonth() + 1, new Date().getFullYear());

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

module.exports = relatoriosController;
