import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, HelpCircle, Menu, X, Package, MapPin, LogOut, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useShop } from '../../context/ShopContext';
import { fullHierarchyFallback } from '../../data/catalogFallback';

const Navbar = () => {
  const { state } = useCart();
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const userMenuRef = useRef(null);
  const categoriesMenuRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { location: selectedLocation, setIsLocationModalOpen } = useShop();
  const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/catalogo?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (categoriesMenuRef.current && !categoriesMenuRef.current.contains(event.target)) {
        setIsCategoriesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut();
    setIsUserMenuOpen(false);
    navigate('/');
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

          {/* Desktop Search Bar & Location */}
          <div className="search-container" style={{ flex: 1, maxWidth: '700px', margin: '0 var(--spacing-8)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ flex: 1, display: 'flex', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius)', overflow: 'hidden' }}>
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

            <button 
              onClick={() => setIsLocationModalOpen(true)}
              style={{ 
                display: 'flex', alignItems: 'baseline', gap: '6px', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px 14px', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#0b2e59'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}
            >
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Entrega en</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0b2e59' }}>
                  {selectedLocation ? `${selectedLocation.province}, ${selectedLocation.municipality}` : 'Seleccionar...'}
                </div>
            </button>
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
            
            {user ? (
              <div className="hidden-mobile" ref={userMenuRef} style={{ position: 'relative', paddingBottom: '14px', marginBottom: '-14px' }} onMouseEnter={() => setIsUserMenuOpen(true)} onMouseLeave={() => setIsUserMenuOpen(false)}>
                <button type="button" onClick={() => setIsUserMenuOpen((prev) => !prev)} style={{ color: 'var(--color-text-main)', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}>
                  <User size={18} />
                  <span>{user.firstName || user.email}</span>
                </button>
                {isUserMenuOpen && (
                  <div style={{ position: 'absolute', top: 'calc(100% + 2px)', right: 0, width: '220px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.12)', padding: '0.6rem', zIndex: 60 }}>
                    <Link to="/mi-cuenta" onClick={() => setIsUserMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0.8rem', borderRadius: '10px', color: '#0f172a', textDecoration: 'none' }}>
                      <User size={18} /> Mi cuenta
                    </Link>
                    <button type="button" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '0.8rem', borderRadius: '10px', color: '#0f172a', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>
                      <Package size={18} /> Mis pedidos
                    </button>
                    <button type="button" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '0.8rem', borderRadius: '10px', color: '#0f172a', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>
                      <MapPin size={18} /> Mis direcciones
                    </button>
                    <button type="button" onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '0.8rem', borderRadius: '10px', color: '#b91c1c', background: '#fff1f2', border: '1px solid #fecdd3', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600, marginTop: '0.35rem' }}>
                      <LogOut size={18} /> Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/cuenta" className="hidden-mobile flex items-center gap-2 btn-nav" style={{ color: 'var(--color-text-main)', transition: 'color 0.2s' }}>
                <User size={18} />
                <span>Iniciar Sesión</span>
              </Link>
            )}

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
            {/* Categorías Dropdown */}
            <div 
              ref={categoriesMenuRef}
              style={{ position: 'relative' }}
              onMouseEnter={() => setIsCategoriesDropdownOpen(true)}
              onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
            >
              <button
                onClick={() => setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)}
                className="nav-link"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px', 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: 'inherit',
                  color: 'white'
                }}
              >
                Categorías <ChevronDown size={16} />
              </button>
              
              {isCategoriesDropdownOpen && (
                <div 
                  className="glass-card" 
                  style={{ 
                    position: 'absolute', 
                    top: '100%', 
                    left: 0, 
                    width: '320px', 
                    padding: '1rem', 
                    borderRadius: '16px', 
                    boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                    zIndex: 200,
                    columns: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    maxHeight: '400px',
                    overflowY: 'auto'
                  }}
                >
                  {fullHierarchyFallback.map(cat => (
                    <Link 
                      key={cat.id} 
                      to={`/catalogo?cat=${cat.slug}`} 
                      className="cat-dropdown-item"
                      onClick={() => setIsCategoriesDropdownOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/combos" className="nav-link">Combos</Link>
            <Link to="/encargos" className="nav-link">Encargos</Link>
            <Link to="/ofertas" className="nav-link">Ofertas</Link>
            <Link to="/como-funciona" className="nav-link">Cómo funciona</Link>
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
          {user ? (
            <>
              <Link to="/mi-cuenta" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 nav-link" style={{ fontSize: '1.1rem', color: 'var(--color-text-main)' }}><User size={20} /> {user.firstName || user.email}</Link>
              <button onClick={() => { setIsMobileMenuOpen(false); navigate('/cuenta'); }} className="flex items-center gap-3 nav-link" style={{ fontSize: '1.1rem', color: 'var(--color-text-main)', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}><Package size={20} /> Mis pedidos</button>
              <button onClick={() => { setIsMobileMenuOpen(false); navigate('/cuenta'); }} className="flex items-center gap-3 nav-link" style={{ fontSize: '1.1rem', color: 'var(--color-text-main)', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}><MapPin size={20} /> Mis direcciones</button>
              <button onClick={async () => { await handleLogout(); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 nav-link" style={{ fontSize: '1.1rem', color: '#b91c1c', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}><LogOut size={20} /> Cerrar sesión</button>
            </>
          ) : (
            <Link to="/cuenta" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 nav-link" style={{ fontSize: '1.1rem', color: 'var(--color-text-main)' }}><User size={20} /> Iniciar Sesión</Link>
          )}
          <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: 'var(--spacing-2) 0' }}></div>
          <Link to="/catalogo" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 nav-link" style={{ fontSize: '1.1rem', color: 'var(--color-text-main)' }}>Todas las categorías</Link>
          <Link to="/combos" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 nav-link" style={{ fontSize: '1.1rem', color: 'var(--color-text-main)' }}>Combos</Link>
          <Link to="/encargos" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 nav-link" style={{ fontSize: '1.1rem', color: 'var(--color-text-main)' }}>Encargos</Link>
          <Link to="/ofertas" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 nav-link" style={{ fontSize: '1.1rem', color: 'var(--color-text-main)' }}>Ofertas</Link>
          <Link to="/como-funciona" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 nav-link" style={{ fontSize: '1.1rem', color: 'var(--color-text-main)' }}>Cómo funciona</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
