const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
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

// Initialize database tables
Usuario.createTable();
Conta.createTable();
Transacao.createTable();
Categoria.createTable();
Orcamento.createTable();
Meta.createTable();
Financiamento.createTable();
Parcelamento.createTable();
Estoque.createTable();
Despesa.createTable();

// Routes
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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
