import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { MapPin, User, Plus, Trash2, Loader2, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getAddresses, createAddress, updateAddress, deleteAddress, updateProfile, getOrders } from '../lib/catalog';

const infoCardStyle = {
  backgroundColor: 'white',
  border: '1px solid #e2e8f0',
  borderRadius: '20px',
  padding: '1.75rem',
  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
};

const Modal = ({ title, children, onClose }) => (
  <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)', padding: '1rem' }}>
    <div style={{ backgroundColor: 'white', borderRadius: '24px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
      <div style={{ padding: '1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0b2e59' }}>{title}</h3>
        <button onClick={onClose} style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
      </div>
      <div style={{ padding: '1.5rem' }}>{children}</div>
    </div>
  </div>
);

const MiCuenta = () => {
  const { user, setUser, loading: authLoading } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState(null); // 'address', 'profile'
  const [editData, setEditData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    const [addrRes, orderRes] = await Promise.all([getAddresses(), getOrders()]);
    if (addrRes.ok) setAddresses(addrRes.addresses);
    if (orderRes.ok) setOrders(orderRes.orders);
    setLoading(false);
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      phone: formData.get('phone')
    };

    const res = await updateProfile(data);
    if (res.ok) {
      setUser({ ...user, ...data });
      setModalType(null);
    }
    setIsSubmitting(false);
  };

  const handleAddressSave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const data = {
      id: editData?.id,
      label: formData.get('label'),
      recipientName: formData.get('recipientName'),
      phone: formData.get('phone'),
      country: 'Cuba',
      province: formData.get('province'),
      city: formData.get('city'),
      municipality: formData.get('municipality'),
      addressLine1: formData.get('addressLine1'),
      addressLine2: formData.get('addressLine2'),
      isDefault: formData.get('isDefault') === 'on'
    };

    const res = editData ? await updateAddress(data) : await createAddress(data);
    if (res.ok) {
      loadData();
      setModalType(null);
    } else {
      alert(res.error || 'Error al guardar la dirección');
    }
    setIsSubmitting(false);
  };

  const handleDeleteAddress = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta dirección?')) {
      const res = await deleteAddress(id);
      if (res.ok) loadData();
    }
  };

  if (authLoading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10rem 0' }}><Loader2 className="animate-spin" size={48} color="#0b2e59" /></div>;
  if (!user) return <Navigate to="/cuenta" replace />;

  return (
    <div style={{ padding: '2rem 0 4rem' }}>
      <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0b2e59', marginBottom: '0.5rem' }}>Mi cuenta</h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Tus datos y gestión de pedidos.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        {/* Profile Card */}
        <section style={infoCardStyle}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <User size={20} color="#0b2e59" /> Info Personal
          </h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              { label: 'Nombre completo', val: `${user.firstName} ${user.lastName}` },
              { label: 'Email', val: user.email },
              { label: 'Teléfono', val: user.phone || 'No registrado' }
            ].map(i => (
              <div key={i.label} style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '14px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>{i.label}</div>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{i.val}</div>
              </div>
            ))}
          </div>
          <button onClick={() => setModalType('profile')} style={{ marginTop: '1.5rem', width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid #cbd5e1', fontWeight: 700, color: '#475569', cursor: 'pointer' }}>
            Editar Perfil
          </button>
        </section>

        {/* Addresses Card */}
        <section style={infoCardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <MapPin size={20} color="#0b2e59" /> Direcciones
            </h2>
            <button onClick={() => { setEditData(null); setModalType('address'); }} style={{ backgroundColor: '#0b2e59', color: 'white', border: 'none', borderRadius: '10px', padding: '0.6rem 1rem', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={16} /> Nueva
            </button>
          </div>

          <div style={{ display: 'grid', gap: '1rem' }}>
            {loading ? <Loader2 className="animate-spin" style={{ margin: '2rem auto' }} color="#cbd5e1" /> : addresses.length > 0 ? (
              addresses.map(addr => (
                <div key={addr.id} style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.25rem', position: 'relative' }}>
                  {addr.is_default === 1 && <span style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', color: '#10b981', fontSize: '0.65rem', fontWeight: 800, background: '#f0fdf4', padding: '4px 8px', borderRadius: '99px' }}>DEFAULT</span>}
                  <div style={{ fontWeight: 800, color: '#0b2e59', fontSize: '0.85rem', marginBottom: '0.25rem' }}>{addr.label}</div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{addr.recipient_name}</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>{addr.address_line_1}, {addr.city}, {addr.province}</div>
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                    <button onClick={() => { setEditData(addr); setModalType('address'); }} style={{ color: '#0b2e59', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>Editar</button>
                    <button onClick={() => handleDeleteAddress(addr.id)} style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>Eliminar</button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', background: '#f8fafc', borderRadius: '16px', border: '2px dashed #e2e8f0' }}>
                <p style={{ color: '#64748b' }}>No tienes direcciones guardadas.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Orders History */}
      <section style={{ ...infoCardStyle, marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>Historial de Pedidos</h2>
        {loading ? <div style={{ padding: '3rem', textAlign: 'center' }}><Loader2 className="animate-spin" style={{ margin: '0 auto' }} color="#cbd5e1" /></div> : orders.length > 0 ? (
           <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '1rem' }}>ID Pedido</th>
                  <th style={{ padding: '1rem' }}>Fecha</th>
                  <th style={{ padding: '1rem' }}>Destino</th>
                  <th style={{ padding: '1rem' }}>Estado</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id} style={{ borderBottom: '1px solid #f1f5f9', fontSize: '0.95rem' }}>
                    <td style={{ padding: '1rem', fontWeight: 700, color: '#0b2e59' }}>#{o.id.split('-')[0]}</td>
                    <td style={{ padding: '1rem' }}>{new Date(o.created_at).toLocaleDateString()}</td>
                    <td style={{ padding: '1rem' }}>{o.province}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ padding: '4px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700, backgroundColor: o.status === 'delivered' ? '#f0fdf4' : '#fef9c3', color: o.status === 'delivered' ? '#166534' : '#854d0e' }}>
                        {o.status.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 800 }}>US${o.total_amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
           </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem', background: '#f8fafc', borderRadius: '16px' }}>
            <p style={{ color: '#64748b', marginBottom: '1rem' }}>Aún no has realizado pedidos.</p>
            <Link to="/catalogo" style={{ background: '#0b2e59', color: 'white', padding: '0.8rem 2rem', borderRadius: '12px', fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>Explorar Tienda</Link>
          </div>
        )}
      </section>

      {/* Modals */}
      {modalType === 'profile' && (
        <Modal title="Editar Perfil" onClose={() => setModalType(null)}>
          <form onSubmit={handleProfileSave} style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Nombre</label>
              <input name="firstName" defaultValue={user.firstName} required style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Apellido</label>
              <input name="lastName" defaultValue={user.lastName} required style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Teléfono</label>
              <input name="phone" defaultValue={user.phone} placeholder="+53..." style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0' }} />
            </div>
            <button disabled={isSubmitting} style={{ marginTop: '1rem', background: '#0b2e59', color: 'white', padding: '0.9rem', borderRadius: '12px', fontWeight: 800, border: 'none', cursor: 'pointer' }}>
              {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </form>
        </Modal>
      )}

      {modalType === 'address' && (
        <Modal title={editData ? 'Editar Dirección' : 'Nueva Dirección'} onClose={() => setModalType(null)}>
          <form onSubmit={handleAddressSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Etiqueta (Ej: Casa, Trabajo)</label>
              <input name="label" defaultValue={editData?.label} placeholder="Casa" required style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Nombre del Receptor</label>
              <input name="recipientName" defaultValue={editData?.recipient_name} placeholder="Nombre completo" required style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Teléfono de contacto</label>
              <input name="phone" defaultValue={editData?.phone} placeholder="+53..." required style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Provincia</label>
              <select name="province" defaultValue={editData?.province || 'La Habana'} required style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <option value="Pinar del Río">Pinar del Río</option>
                <option value="Artemisa">Artemisa</option>
                <option value="La Habana">La Habana</option>
                <option value="Mayabeque">Mayabeque</option>
                <option value="Matanzas">Matanzas</option>
                <option value="Villa Clara">Villa Clara</option>
                <option value="Cienfuegos">Cienfuegos</option>
                <option value="Sancti Spíritus">Sancti Spíritus</option>
                <option value="Ciego de Ávila">Ciego de Ávila</option>
                <option value="Camagüey">Camagüey</option>
                <option value="Las Tunas">Las Tunas</option>
                <option value="Holguín">Holguín</option>
                <option value="Granma">Granma</option>
                <option value="Santiago de Cuba">Santiago de Cuba</option>
                <option value="Guantánamo">Guantánamo</option>
                <option value="Isla de la Juventud">Isla de la Juventud</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Ciudad / Localidad</label>
              <input name="city" defaultValue={editData?.city} placeholder="Ej: Playa" required style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Municipio</label>
              <input name="municipality" defaultValue={editData?.municipality} placeholder="Ej: Playa" required style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Dirección Línea 1 (Calle y No.)</label>
              <input name="addressLine1" defaultValue={editData?.address_line_1} required style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Dirección Línea 2 (Apto, Piso, entre calles - Opcional)</label>
              <input name="addressLine2" defaultValue={editData?.address_line_2} style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
               <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>
                <input type="checkbox" name="isDefault" defaultChecked={editData?.is_default === 1} style={{ width: '18px', height: '18px' }} /> Usar como dirección de envío predeterminada
              </label>
            </div>
            <div style={{ gridColumn: 'span 2', marginTop: '0.5rem' }}>
              <button disabled={isSubmitting} style={{ width: '100%', background: '#0b2e59', color: 'white', padding: '1rem', borderRadius: '14px', fontWeight: 800, border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(11, 46, 89, 0.2)' }}>
                {isSubmitting ? <Loader2 className="animate-spin" style={{ margin: '0 auto' }} /> : (editData ? 'Actualizar Dirección' : 'Guardar Nueva Dirección')}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default MiCuenta;


