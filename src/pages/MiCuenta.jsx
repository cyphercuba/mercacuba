import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Mail, MapPin, Phone, User, Plus, Trash2, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getAddresses } from '../lib/catalog';

const infoCardStyle = {
  backgroundColor: 'white',
  border: '1px solid #e2e8f0',
  borderRadius: '20px',
  padding: '1.75rem',
  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
};

const MiCuenta = () => {
  const { user, loading: authLoading } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      async function loadAddresses() {
        setLoading(true);
        const res = await getAddresses();
        if (res.ok) {
          setAddresses(res.addresses);
        }
        setLoading(false);
      }
      loadAddresses();
    }
  }, [user]);

  if (authLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 0', gap: '1rem' }}>
        <Loader2 className="animate-spin" size={32} color="#0b2e59" />
        <span style={{ color: '#64748b', fontWeight: 500 }}>Cargando cuenta...</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/cuenta" replace />;
  }

  return (
    <div style={{ padding: '2rem 0 4rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0b2e59', marginBottom: '0.5rem' }}>Mi cuenta</h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
          Información personal y gestión de envíos.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        <section style={infoCardStyle}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <User size={20} color="#0b2e59" /> Información personal
          </h2>
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '14px', border: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.25rem' }}>Nombre completo</div>
              <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '1.05rem' }}>{user.firstName} {user.lastName}</div>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '14px', border: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.25rem' }}>Correo electrónico</div>
              <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '1.05rem' }}>{user.email}</div>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '14px', border: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.25rem' }}>Número de teléfono</div>
              <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '1.05rem' }}>{user.phone || 'No agregado todavía'}</div>
            </div>
          </div>
          
          <button style={{ marginTop: '1.5rem', width: '100%', background: 'none', border: '1px solid #CBD5E1', padding: '0.75rem', borderRadius: '12px', color: '#475569', fontWeight: 600, cursor: 'pointer' }}>
            Editar perfil
          </button>
        </section>

        <section style={infoCardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <MapPin size={20} color="#0b2e59" /> Direcciones
            </h2>
            <button type="button" style={{ backgroundColor: '#0b2e59', color: 'white', border: 'none', borderRadius: '10px', padding: '0.6rem 1rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={16} /> Nueva
            </button>
          </div>

          <div style={{ display: 'grid', gap: '1rem' }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <Loader2 className="animate-spin" style={{ margin: '0 auto' }} color="#94a3b8" />
              </div>
            ) : addresses.length > 0 ? (
              addresses.map((addr) => (
                <div key={addr.id} style={{ border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1rem', position: 'relative', transition: 'border-color 0.2s' }}>
                  {addr.is_default === 1 && (
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem', fontWeight: 700 }}>
                      <CheckCircle size={14} /> PREDETERMINADA
                    </div>
                  )}
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0b2e59', marginBottom: '0.25rem' }}>{addr.label || 'Dirección'}</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>{addr.recipient_name}</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem', lineHeight: '1.4' }}>
                    {addr.address_line_1}<br />
                    {addr.city}, {addr.province}, {addr.country}
                  </div>
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                    <button style={{ background: 'none', border: 'none', color: '#0b2e59', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', padding: 0 }}>Editar</button>
                    {!addr.is_default && (
                      <button style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', padding: 0 }}>Eliminar</button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ border: '2px dashed #e2e8f0', borderRadius: '16px', padding: '2rem 1.5rem', backgroundColor: '#f8fafc', textAlign: 'center' }}>
                <MapPin size={32} color="#94a3b8" style={{ marginBottom: '0.75rem', opacity: 0.5 }} />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#475569', marginBottom: '0.25rem' }}>No hay direcciones</h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
                  Agrega una dirección para facilitar tus próximos envíos a Cuba.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      <section style={{ ...infoCardStyle, marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>Historial de Pedidos</h2>
        <div style={{ textAlign: 'center', padding: '3rem 0', backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
          <p style={{ color: '#64748b', fontWeight: 500 }}>Aún no has realizado ningún pedido.</p>
          <button style={{ marginTop: '1rem', backgroundColor: 'transparent', color: '#0b2e59', border: '2px solid #0b2e59', padding: '0.6rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
            Explorar Tienda
          </button>
        </div>
      </section>
    </div>
  );
};

export default MiCuenta;

