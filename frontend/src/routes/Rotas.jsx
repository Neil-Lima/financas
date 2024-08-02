import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import MetasPage from '../pages/MetasPage'
import OrcamentosPage from '../pages/OrcamentosPage'
import RelatoriosPage from '../pages/RelatoriosPage'
import TransacoesPage from '../pages/TransacoesPage'
import ContasPage from '../pages/ContasPage'
import LoginPage from '../pages/LoginPage'
import DespesaPage from '../pages/DespesaPage'
import ParcelamentosPage from '../pages/ParcelamentosPage'
import FinanciamentosPage from '../pages/FinanciamentosPage'
import ConfiguracoesPage from '../pages/ConfiguracoesPage'
import HistoricoPage from '../pages/HistoricoPage'
import PerfilPage from '../pages/PerfilPage'
import EstoquePage from '../pages/EstoquePage'
import UsuariosPage from '../pages/UsuariosPage'


function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/metas" element={<MetasPage />} />
        <Route path="/orcamentos" element={<OrcamentosPage />} />
        <Route path="/relatorios" element={<RelatoriosPage />} />
        <Route path="/transacoes" element={<TransacoesPage />} />
        <Route path="/contas" element={<ContasPage />} />
        <Route path="/despesas" element={<DespesaPage />} />
        <Route path="/parcelamentos" element={<ParcelamentosPage/>} />
        <Route path="/financiamentos" element={<FinanciamentosPage/>} />
        <Route path="/configuracoes" element={<ConfiguracoesPage/>} />
        <Route path="/historico" element={<HistoricoPage/>} />
        <Route path="/perfil" element={<PerfilPage/>} />
        <Route path="/estoque" element={<EstoquePage/>} />
        <Route path="/usuarios" element={<UsuariosPage/>} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default Rotas
