import React from 'react';
import { Navigate } from 'react-router-dom';
import { Mail, MapPin, Phone, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const infoCardStyle = {
  backgroundColor: 'white',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  padding: '1.5rem',
  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
};

const MiCuenta = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: '3rem 0' }}>Cargando cuenta...</div>;
  }

  if (!user) {
    return <Navigate to="/cuenta" replace />;
  }

  return (
    <div style={{ padding: '2rem 0 3rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0b2e59', marginBottom: '0.5rem' }}>Mi cuenta</h1>
        <p style={{ color: '#64748b', fontSize: '1rem' }}>
          Administra tu información personal y tus direcciones de entrega.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <section style={infoCardStyle}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.25rem' }}>Información personal</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <User size={18} color="#0b2e59" />
              <div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Nombre completo</div>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{user.firstName} {user.lastName}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <Mail size={18} color="#0b2e59" />
              <div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Correo electrónico</div>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{user.email}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <Phone size={18} color="#0b2e59" />
              <div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Número de teléfono</div>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{user.phone || 'No agregado todavía'}</div>
              </div>
            </div>
          </div>
        </section>

        <section style={infoCardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a' }}>Direcciones</h2>
            <button type="button" style={{ backgroundColor: '#0b2e59', color: 'white', border: 'none', borderRadius: '8px', padding: '0.7rem 1rem', fontWeight: 600, cursor: 'pointer' }}>
              Agregar dirección
            </button>
          </div>

          <div style={{ border: '1px dashed #cbd5e1', borderRadius: '14px', padding: '1.25rem', backgroundColor: '#f8fafc' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <MapPin size={18} color="#0b2e59" />
              <strong style={{ color: '#0f172a' }}>Aún no has agregado direcciones</strong>
            </div>
            <p style={{ color: '#64748b', marginBottom: 0 }}>
              Cuando agregues una dirección de entrega, aparecerá aquí para usarla rápidamente en tus pedidos.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MiCuenta;
