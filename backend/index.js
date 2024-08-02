const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const db = require('./config/database');
const Usuario = require('./models/Usuario');
const Conta = require('./models/Conta');
const Transacao = require('./models/Transacao');
const Categoria = require('./models/Categoria');
const Orcamento = require('./models/Orcamento');
const Meta = require('./models/Meta');
const Financiamento = require('./models/Financiamento');
const Parcelamento = require('./models/Parcelamento');
const Estoque = require('./models/Estoque');
const Despesa = require('./models/Despesa');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Configuração do caminho do banco de dados
const dbPath = process.env.NODE_ENV === 'production' 
  ? path.join('/tmp', 'financas.db')
  : path.join(__dirname, 'financas.db');

// Inicializar tabelas do banco de dados
Usuario.createTable(dbPath);
Conta.createTable(dbPath);
Transacao.createTable(dbPath);
Categoria.createTable(dbPath);
Orcamento.createTable(dbPath);
Meta.createTable(dbPath);
Financiamento.createTable(dbPath);
Parcelamento.createTable(dbPath);
Estoque.createTable(dbPath);
Despesa.createTable(dbPath);

// Rotas
app.use('/api/usuarios', require('./routes/usuariosRoutes'));
app.use('/api/contas', require('./routes/contasRoutes'));
app.use('/api/transacoes', require('./routes/transacoesRoutes'));
app.use('/api/categorias', require('./routes/categoriasRoutes'));
app.use('/api/orcamentos', require('./routes/orcamentosRoutes'));
app.use('/api/metas', require('./routes/metasRoutes'));
app.use('/api/financiamentos', require('./routes/financiamentosRoutes'));
app.use('/api/parcelamentos', require('./routes/parcelamentosRoutes'));
app.use('/api/estoque', require('./routes/estoqueRoutes'));
app.use('/api/relatorios', require('./routes/relatoriosRoutes'));
app.use('/api/despesas', require('./routes/despesasRoutes'));

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

module.exports = app;
