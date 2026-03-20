import './App.jsx'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import PaginaInicio from './Pages/PaginaInicio'
import PaginaHabitos from './Pages/PaginaHabitos'
import PaginaDetalhes from './Pages/PaginaDetalhes'
import PaginaNaoEncontrada from './Pages/PaginaNaoEncontrada'

function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/"            element={<PaginaInicio />} />
        <Route path="/habitos"     element={<PaginaHabitos />} />
        <Route path="/habito/:id"  element={<PaginaDetalhes />} />
        <Route path="*"            element={<PaginaNaoEncontrada />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App