import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import BottomNav from './components/Layout/BottomNav';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Encargos from './pages/Encargos';
import Ofertas from './pages/Ofertas';
import ComoFunciona from './pages/ComoFunciona';
import Login from './pages/Login';
import CompraMayorista from './pages/CompraMayorista';
import Combos from './pages/Combos';
import Membresias from './pages/Membresias';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div className="container main-layout" style={{ flex: 1 }}>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalogo" element={<Catalog />} />
              <Route path="/carrito" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/encargos" element={<Encargos />} />
              <Route path="/ofertas" element={<Ofertas />} />
              <Route path="/como-funciona" element={<ComoFunciona />} />
              <Route path="/cuenta" element={<Login />} />
              <Route path="/registro" element={<Login />} />
              <Route path="/mayorista-mipymes" element={<CompraMayorista />} />
              <Route path="/combos" element={<Combos />} />
              <Route path="/membresias" element={<Membresias />} />
              {/* Catch-all for not implemented pages */}
              <Route path="*" element={<div style={{ padding: 'var(--spacing-8) 0', minHeight: '60vh' }}><h1>Página en construcción</h1></div>} />
            </Routes>
          </main>
          
          <Sidebar />
        </div>
        
        <Footer />
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
