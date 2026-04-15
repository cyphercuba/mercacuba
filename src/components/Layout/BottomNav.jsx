import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, ShoppingCart, FileText, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const BottomNav = () => {
  const location = useLocation();
  const { state } = useCart();
  const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="bottom-nav">
      <Link to="/" className={`bottom-nav-item ${isActive('/')}`}>
        <Home size={24} />
        <span>Inicio</span>
      </Link>
      <Link to="/catalogo" className={`bottom-nav-item ${isActive('/catalogo')}`}>
        <Grid size={24} />
        <span>Categorías</span>
      </Link>
      <Link to="/carrito" className={`bottom-nav-item ${isActive('/carrito')}`} style={{ position: 'relative' }}>
        <ShoppingCart size={24} />
        <span>Carrito</span>
        {totalItems > 0 && (
          <span className="badge badge-accent" style={{ position: 'absolute', top: -5, right: 5, padding: '2px 6px', fontSize: '10px' }}>
            {totalItems}
          </span>
        )}
      </Link>
      <Link to="/pedidos" className={`bottom-nav-item ${isActive('/pedidos')}`}>
        <FileText size={24} />
        <span>Pedidos</span>
      </Link>
      <Link to="/cuenta" className={`bottom-nav-item ${isActive('/cuenta')}`}>
        <User size={24} />
        <span>Cuenta</span>
      </Link>
    </nav>
  );
};

export default BottomNav;
