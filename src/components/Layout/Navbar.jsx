import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, HelpCircle, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { state } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/catalogo?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid var(--color-border)' }}>
      {/* Top Bar - White */}
      <div style={{ backgroundColor: 'white', padding: 'var(--spacing-3) 0' }}>
        <div className="container flex justify-between items-center header-top-container">
          
          {/* Logo & Name */}
          <Link to="/" className="logo-container" style={{ textDecoration: 'none', position: 'relative', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)' }}>
            {/* Background Map */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'url("/dr_cuba_map.png")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.85 }}></div>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(9, 46, 92, 0.5)' }}></div>

            {/* Seamless Transparent Logo */}
            <img src="/logo_transparent.png" alt="GAINDM" className="logo-img" style={{ position: 'relative', zIndex: 1, height: '60px', objectFit: 'contain', filter: 'drop-shadow(0px 2px 10px rgba(255,255,255,0.4))' }} />

            <span className="logo-text" style={{ position: 'relative', zIndex: 1, color: 'white', fontSize: '2.2rem', fontWeight: 900, textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
              MercaCuba<span style={{ color: '#f97316' }}>RD</span>
            </span>
          </Link>

          {/* Desktop Search Bar */}
          <div className="search-container" style={{ flex: 1, maxWidth: '600px', margin: '0 var(--spacing-8)' }}>
            <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius)', overflow: 'hidden' }}>
              <input 
                type="text" 
                placeholder="Buscar productos, combos o tiendas..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                style={{ border: 'none', outline: 'none', width: '100%', padding: 'var(--spacing-3) var(--spacing-4)', fontSize: '0.875rem' }}
              />
              <button onClick={handleSearch} style={{ backgroundColor: 'var(--color-brand-blue)', padding: '0 var(--spacing-6)', color: 'white', cursor: 'pointer' }}>
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-6 top-actions" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
            <Link to="/ayuda" className="hidden-mobile flex items-center gap-2" style={{ color: 'var(--color-text-main)' }}>
              <HelpCircle size={18} />
              <span>Ayuda</span>
            </Link>
            
            <Link to="/carrito" className="flex items-center gap-2" style={{ color: 'var(--color-text-main)', position: 'relative' }}>
              <ShoppingCart size={20} />
              <span className="hidden-mobile">Carrito</span>
              {totalItems > 0 && (
                <span className="badge" style={{ backgroundColor: 'var(--color-accent)', color: 'white', position: 'absolute', top: -8, left: 10, padding: '2px 6px', fontSize: '0.7rem' }}>
                  {totalItems}
                </span>
              )}
            </Link>
            
            <Link to="/cuenta" className="hidden-mobile flex items-center gap-2 btn-nav" style={{ color: 'var(--color-text-main)', transition: 'color 0.2s' }}>
              <User size={18} />
              <span>Iniciar Sesión</span>
            </Link>

            <button className="mobile-only" style={{ color: 'var(--color-text-main)', cursor: 'pointer' }} onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>


      {/* Bottom Bar - Dark Blue (Hidden on mobile) */}
      <div style={{ backgroundColor: '#0b2e59', color: 'white', fontSize: '0.875rem' }}>
        <div className="container flex justify-between items-center nav-overflow-mobile" style={{ height: '48px' }}>
          
          <div className="flex items-center gap-6">
            <div className="nav-dropdown" style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '48px', cursor: 'pointer' }}>
              <div className="flex items-center gap-2 nav-link" style={{ fontWeight: 600 }}>
                <Menu size={18} /> Categorías
              </div>
              <div className="dropdown-content" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <Link to="/catalogo?cat=entregas-rapidas">Entregas Rápidas</Link>
                <Link to="/catalogo?cat=alimentos">Alimentos</Link>
                <Link to="/catalogo?cat=combos-de-alimentos">Combos de Alimentos</Link>
                <Link to="/catalogo?cat=bebidas">Bebidas</Link>
                <Link to="/catalogo?cat=aseo-e-higiene">Aseo e Higiene</Link>
                <Link to="/catalogo?cat=electrodomesticos">Electrodomésticos</Link>
                <Link to="/catalogo?cat=bicicletas-electricas">Bicicletas Eléctricas</Link>
                <Link to="/catalogo?cat=motos-de-gasolina">Motos de Gasolina</Link>
                <Link to="/catalogo?cat=triciclos">Triciclos Eléctricos o Híbridos</Link>
                <Link to="/catalogo?cat=plantas-electricas">Plantas Eléctricas</Link>
                <Link to="/catalogo?cat=ferreteria">Ferretería</Link>
                <Link to="/catalogo?cat=aires-acondicionados">Aires Acondicionados</Link>
                <Link to="/catalogo?cat=colchones">Colchones</Link>
                <Link to="/catalogo?cat=articulos-del-hogar">Artículos del Hogar</Link>
                <Link to="/catalogo?cat=articulos-de-escuela">Artículos de Escuela</Link>
                <Link to="/catalogo?cat=juguetes-y-deportes">Juguetes y Deportes</Link>
                <Link to="/catalogo?cat=telefonos-celulares">Teléfonos Celulares</Link>
                <Link to="/catalogo?cat=dulces-y-confituras">Dulces y Confituras</Link>
                <Link to="/catalogo?cat=otros">Otros</Link>
                <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '4px 0' }}></div>
                <Link to="/catalogo" style={{ fontWeight: 'bold' }}>Todas las categorías</Link>
              </div>
            </div>
            <Link to="/combos" className="nav-link">Combos</Link>
            <Link to="/encargos" className="nav-link">Encargos</Link>
            <Link to="/ofertas" className="nav-link">Ofertas</Link>
            <Link to="/como-funciona" className="nav-link">Cómo funciona</Link>
            <Link
              to="/membresias"
              className="nav-link"
              style={{
                background: 'linear-gradient(135deg, #c9991a 0%, #d4af37 100%)',
                color: '#092e5c',
                fontWeight: 700,
                padding: '5px 14px',
                borderRadius: '999px',
                fontSize: '0.82rem',
                letterSpacing: '0.03em',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                whiteSpace: 'nowrap',
              }}
            >
              ⚡ Membresía
            </Link>
          </div>

          <div className="flex items-center gap-2" style={{ fontWeight: 500 }}>
            <span>Entrega en Cuba</span>
            <img src="https://flagcdn.com/w40/cu.png" alt="Cuba Flag" style={{ width: '24px', borderRadius: '2px', marginLeft: '4px' }} />
          </div>

        </div>
      </div>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999 }} onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
      
      {/* Mobile Menu Drawer */}
      <div className="mobile-drawer" style={{ position: 'fixed', top: 0, right: 0, transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)', width: '85%', maxWidth: '350px', height: '100vh', backgroundColor: 'var(--color-surface)', zIndex: 1000, transition: 'transform 0.3s ease', display: 'flex', flexDirection: 'column' }}>
        <div className="mobile-drawer-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1.4rem', color: 'var(--color-brand-blue)' }}>Menú</span>
          <button onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--color-text-main)', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>
        <div className="mobile-drawer-content" style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          <Link to="/ayuda" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 nav-link" style={{ fontSize: '1.1rem', color: 'var(--color-text-main)' }}><HelpCircle size={20} /> Ayuda</Link>
          <Link to="/cuenta" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 nav-link" style={{ fontSize: '1.1rem', color: 'var(--color-text-main)' }}><User size={20} /> Iniciar Sesión</Link>
          <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: 'var(--spacing-2) 0' }}></div>
          <Link to="/catalogo" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 nav-link" style={{ fontSize: '1.1rem', color: 'var(--color-text-main)' }}>Todas las categorías</Link>
          <Link to="/combos" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 nav-link" style={{ fontSize: '1.1rem', color: 'var(--color-text-main)' }}>Combos</Link>
          <Link to="/encargos" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 nav-link" style={{ fontSize: '1.1rem', color: 'var(--color-text-main)' }}>Encargos</Link>
          <Link to="/ofertas" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 nav-link" style={{ fontSize: '1.1rem', color: 'var(--color-text-main)' }}>Ofertas</Link>
          <Link to="/como-funciona" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 nav-link" style={{ fontSize: '1.1rem', color: 'var(--color-text-main)' }}>Cómo funciona</Link>
          <Link
            to="/membresias"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3"
            style={{
              fontSize: '1.1rem',
              color: '#092e5c',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #c9991a 0%, #d4af37 100%)',
              padding: '10px 16px',
              borderRadius: '12px',
              marginTop: '4px',
            }}
          >
            ⚡ Membresía
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
