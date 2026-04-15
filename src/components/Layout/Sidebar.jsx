import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();

  if (user) {
    return null;
  }

  return (
    <aside className="sidebar-right">
      <div className="card" style={{ padding: 'var(--spacing-4)' }}>
        <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-4)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Mi Cuenta</h3>
        </div>

        <div className="flex flex-col gap-4 text-center">
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Inicia sesión para ver tus pedidos, repetir compras fácilmente y gestionar tus direcciones.
          </p>
          <Link to="/cuenta" className="btn btn-primary btn-hover" style={{ width: '100%', fontSize: '0.875rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 0', marginBottom: 'var(--spacing-3)' }}>
            Iniciar Sesión
          </Link>
          <Link to="/cuenta" className="nav-link" style={{ fontSize: '0.75rem', color: 'var(--color-brand-blue)', fontWeight: 500 }}>
            ¿No tienes cuenta? Regístrate aquí
          </Link>
        </div>
      </div>

      <div className="card" style={{ padding: 'var(--spacing-4)' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 'var(--spacing-3)' }}>Dirección principal</h3>
        <div style={{ backgroundColor: 'var(--color-background)', padding: 'var(--spacing-3)', borderRadius: 'var(--border-radius)' }}>
          <p style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '2px' }}>Calle Presidente Enríquez, Plaza Eunice</p>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '2px' }}>No. 40, Suite 204, sector Miramar</p>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>San Pedro de Macorís, República Dominicana</p>
          <div className="flex justify-end mt-2">
            <a href="#" style={{ fontSize: '0.75rem', color: 'var(--color-brand-blue)' }}>Cambiar</a>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 'var(--spacing-4)' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 'var(--spacing-3)' }}>Métodos de pago</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2" style={{ padding: 'var(--spacing-2) 0' }}>
            <div style={{ width: '24px', height: '24px', backgroundColor: '#7c3aed', color: 'white', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>Z</div>
            <span style={{ fontSize: '0.875rem' }}>Zelle</span>
          </div>
          <div className="flex items-center gap-2" style={{ padding: 'var(--spacing-2) 0' }}>
            <div style={{ width: '24px', height: '24px', backgroundColor: '#22c55e', color: 'white', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>$</div>
            <span style={{ fontSize: '0.875rem' }}>Cash App</span>
          </div>
          <div className="flex items-center gap-2" style={{ padding: 'var(--spacing-2) 0' }}>
            <div style={{ width: '24px', height: '24px', backgroundColor: '#008CFF', color: 'white', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>V</div>
            <span style={{ fontSize: '0.875rem' }}>Venmo</span>
          </div>
          <div className="flex items-center gap-2" style={{ padding: 'var(--spacing-2) 0' }}>
            <div style={{ width: '24px', height: '24px', backgroundColor: '#003087', color: 'white', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>PP</div>
            <span style={{ fontSize: '0.875rem' }}>PayPal</span>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 'var(--spacing-4)', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
        <div className="flex items-center gap-2" style={{ marginBottom: 'var(--spacing-2)' }}>
          <MessageCircle size={20} color="var(--color-brand-blue)" />
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>¿Tienes dudas?</h3>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-3)' }}>Visita la página de Soporte de la tienda</p>
        <button style={{ width: '100%', backgroundColor: 'var(--color-brand-blue)', color: 'white', padding: 'var(--spacing-2)', borderRadius: 'var(--border-radius)', fontWeight: 600, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '0.875rem' }}>
          Soporte
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
