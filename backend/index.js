const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const usuariosRoutes = require('./routes/usuarioRoutes');
const contaRoutes = require('./routes/contaRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo à API de Finanças' });
});

// Routes
app.use('/api/usuarios', usuariosRoutes);
app.use('/api', contaRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
