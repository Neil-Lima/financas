import React from 'react'
import HomePage from '../pages/HomePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function Rotas() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Rotas