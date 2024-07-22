import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import MetasPage from '../pages/MetasPage'
import OrcamentosPage from '../pages/OrcamentosPage'
import RelatoriosPage from '../pages/RelatoriosPage'
import TransacoesPage from '../pages/TransacoesPage'
import ContasPage from '../pages/ContasPage'
import LoginPage from '../pages/LoginPage'

function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/metas" element={<MetasPage />} />
        <Route path="/orcamentos" element={<OrcamentosPage />} />
        <Route path="/relatorios" element={<RelatoriosPage />} />
        <Route path="/transacoes" element={<TransacoesPage />} />
        <Route path="/contas" element={<ContasPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Rotas
