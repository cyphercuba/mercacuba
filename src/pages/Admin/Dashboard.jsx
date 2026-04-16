import React from 'react';
import { Package, Users, ShoppingBag, TrendingUp, AlertCircle, Plus } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { label: 'Productos', value: '124', icon: <Package size={24} />, color: '#0b2e59' },
    { label: 'Clientes', value: '1,042', icon: <Users size={24} />, color: '#10b981' },
    { label: 'Pedidos Hoy', value: '18', icon: <ShoppingBag size={24} />, color: '#ff6f00' },
    { label: 'Ventas Mes', value: 'US$ 4.2k', icon: <TrendingUp size={24} />, color: '#6366f1' },
  ];

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0b2e59', marginBottom: '0.25rem' }}>Panel de Control</h1>
          <p style={{ color: '#64748b' }}>Bienvenido al administrador de MercadoCuba.</p>
        </div>
        <button style={{ backgroundColor: '#0b2e59', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer' }}>
          <Plus size={20} /> Nuevo Producto
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ backgroundColor: `${stat.color}15`, color: stat.color, padding: '0.75rem', borderRadius: '12px' }}>
                {stat.icon}
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981' }}>+12%</span>
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b', marginBottom: '0.25rem' }}>{stat.label}</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>Pedidos Recientes</h2>
          <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
            <AlertCircle size={40} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
            <p>Implementación de tabla de pedidos en curso...</p>
          </div>
        </div>
        
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>Stock Bajo</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#f8fafc', borderRadius: '8px' }}></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Aceite de Soya</div>
                <div style={{ fontSize: '0.75rem', color: '#ef4444' }}>Solo 5 unidades</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
