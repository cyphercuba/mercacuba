import React, { useState, useEffect } from 'react';
import { Package, Users, ShoppingBag, TrendingUp, AlertCircle, Plus, Loader2, X, ShoppingCart, Edit, Trash2, Tag } from 'lucide-react';
import { getAdminStats, getAdminProducts, createAdminProduct, updateAdminProduct, deleteAdminProduct, getCategories } from '../../lib/catalog';

const Modal = ({ title, children, onClose }) => (
  <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)', padding: '1rem' }}>
    <div style={{ backgroundColor: 'white', borderRadius: '24px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
      <div style={{ padding: '1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0b2e59' }}>{title}</h3>
        <button onClick={onClose} style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
      </div>
      <div style={{ padding: '1.5rem' }}>{children}</div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState(null); // 'add', 'edit'
  const [editData, setEditData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    const [statRes, prodRes, catRes] = await Promise.all([
      getAdminStats(),
      getAdminProducts(),
      getCategories()
    ]);
    
    if (statRes.ok) {
      setStats(statRes.stats);
      setLowStock(statRes.lowStock || []);
    }
    if (prodRes.ok) setProducts(prodRes.products);
    if (catRes.ok) setCategories(catRes.categories);
    
    setLoading(false);
  };

  const handleProductSave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const data = {
      id: editData?.id,
      name: formData.get('name'),
      categoryId: formData.get('categoryId'),
      price: parseFloat(formData.get('price')),
      salePrice: formData.get('salePrice') ? parseFloat(formData.get('salePrice')) : null,
      stock: parseInt(formData.get('stock')),
      description: formData.get('description'),
      imageUrl: formData.get('imageUrl'),
      isFeatured: formData.get('isFeatured') === 'on',
      status: editData ? editData.status : 'active'
    };

    const res = editData ? await updateAdminProduct(data) : await createAdminProduct(data);
    if (res.ok) {
      loadAll();
      setModalType(null);
    } else {
      alert(res.error || 'Error al guardar el producto');
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de desactivar este producto?')) {
      const res = await deleteAdminProduct(id);
      if (res.ok) loadAll();
    }
  };

  const statCards = [
    { label: 'Productos', value: stats?.products || '0', icon: <Package size={24} />, color: '#0b2e59' },
    { label: 'Clientes', value: stats?.users || '0', icon: <Users size={24} />, color: '#10b981' },
    { label: 'Pedidos Hoy', value: stats?.todayOrders || '0', icon: <ShoppingBag size={24} />, color: '#ff6f00' },
    { label: 'Ventas Mes', value: `US$ ${stats?.monthlySales?.toFixed(1) || '0.0'}k`, icon: <TrendingUp size={24} />, color: '#6366f1' },
  ];

  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10rem 0' }}><Loader2 className="animate-spin" size={48} color="#0b2e59" /></div>;

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0b2e59', marginBottom: '0.25rem' }}>Panel de Control</h1>
          <p style={{ color: '#64748b' }}>Administración global de MercadoCuba.</p>
        </div>
        <button onClick={() => { setEditData(null); setModalType('add'); }} style={{ backgroundColor: '#0b2e59', color: 'white', padding: '0.8rem 1.75rem', borderRadius: '14px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(11, 46, 89, 0.2)' }}>
          <Plus size={22} /> Nuevo Producto
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {statCards.map((stat, i) => (
          <div key={i} style={{ backgroundColor: 'white', padding: '1.75rem', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div style={{ backgroundColor: `${stat.color}12`, color: stat.color, padding: '0.8rem', borderRadius: '16px' }}>
                {stat.icon}
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981', padding: '4px 8px', background: '#f0fdf4', borderRadius: '8px' }}>ACTIVO</span>
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>{stat.label}</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a' }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Product Management Table */}
      <section style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid #e2e8f0', marginBottom: '2rem', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0b2e59' }}>Inventario de Productos</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Total: {products.length} Items</span>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f8fafc', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '1.25rem 1rem' }}>Producto</th>
                <th style={{ padding: '1.25rem 1rem' }}>Categoría</th>
                <th style={{ padding: '1.25rem 1rem' }}>Precio Base</th>
                <th style={{ padding: '1.25rem 1rem' }}>Oferta</th>
                <th style={{ padding: '1.25rem 1rem' }}>Stock</th>
                <th style={{ padding: '1.25rem 1rem' }}>Estado</th>
                <th style={{ padding: '1.25rem 1rem', textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #f8fafc', fontSize: '0.9rem' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: '#f1f5f9', overflow: 'hidden', flexShrink: 0 }}>
                        <img src={p.image_url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=44&h=44'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{p.name}</div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600 }}>
                      {p.category_name || 'Sin catálogo'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 600, color: '#0b2e59' }}>US${(p.price || 0).toFixed(2)}</td>
                  <td style={{ padding: '1rem' }}>
                    {p.sale_price ? (
                      <span style={{ color: '#ef4444', fontWeight: 800 }}>US${p.sale_price.toFixed(2)}</span>
                    ) : (
                      <span style={{ color: '#94a3b8' }}>-</span>
                    )}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ 
                        width: '8px', height: '8px', borderRadius: '50%', 
                        backgroundColor: p.stock === 0 ? '#ef4444' : (p.stock < 10 ? '#f59e0b' : '#10b981') 
                      }}></span>
                      <span style={{ fontWeight: 700 }}>{p.stock}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '4px 10px', borderRadius: '99px', fontSize: '0.7rem', fontWeight: 800, 
                      backgroundColor: p.status === 'active' ? '#f0fdf4' : '#f1f5f9', 
                      color: p.status === 'active' ? '#166534' : '#64748b' 
                    }}>
                      {(p.status || 'active').toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button onClick={() => { setEditData(p); setModalType('edit'); }} style={{ padding: '6px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', color: '#475569' }}><Edit size={16} /></button>
                      <button onClick={() => handleDelete(p.id)} style={{ padding: '6px', backgroundColor: '#fff1f2', border: '1px solid #fee2e2', borderRadius: '8px', cursor: 'pointer', color: '#e11d48' }}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <AlertCircle size={20} color="#e11d48" /> Alertas Críticas
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {lowStock.length > 0 ? lowStock.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center', paddingBottom: '1rem', borderBottom: idx === lowStock.length -1 ? 'none' : '1px solid #f1f5f9' }}>
                <div style={{ width: '48px', height: '48px', backgroundColor: '#fff1f2', color: '#e11d48', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShoppingCart size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>{item.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#e11d48', fontWeight: 700 }}>Inventario bajo: {item.stock} unidades</div>
                </div>
                <button onClick={() => { setEditData(item); setModalType('edit'); }} style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>Reponer</button>
              </div>
            )) : (
              <p style={{ color: '#64748b', textAlign: 'center', padding: '2rem' }}>Todo el inventario está saludable.</p>
            )}
          </div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Tag size={20} color="#0b2e59" /> Categorías Activas
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {categories.map(cat => (
              <div key={cat.id} style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0b2e59' }}></div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {modalType && (
        <Modal title={modalType === 'add' ? 'Añadir Nuevo Producto' : 'Editar Producto'} onClose={() => setModalType(null)}>
          <form onSubmit={handleProductSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Nombre del Producto</label>
              <input name="name" defaultValue={editData?.name} required style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', border: '1px solid #e2e8f0' }} placeholder="Caja de Pollo 40lb..." />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Categoría Principal</label>
              <select name="categoryId" defaultValue={editData?.category_id} required style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <option value="">Seleccionar...</option>
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Stock Actual</label>
              <input type="number" name="stock" defaultValue={editData?.stock} required style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', border: '1px solid #e2e8f0' }} placeholder="100" />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Precio Base (US$)</label>
              <input type="number" step="0.01" name="price" defaultValue={editData?.price} required style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', border: '1px solid #e2e8f0' }} placeholder="45.00" />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Precio Oferta (Opcional - US$)</label>
              <input type="number" step="0.01" name="salePrice" defaultValue={editData?.sale_price} style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', border: '1px solid #e2e8f0' }} placeholder="39.99" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>URL de Imagen (Unsplash o CDN)</label>
              <input name="imageUrl" defaultValue={editData?.image_url} style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', border: '1px solid #e2e8f0' }} placeholder="https://..." />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Descripción Detallada</label>
              <textarea name="description" defaultValue={editData?.description} style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', border: '1px solid #e2e8f0', minHeight: '80px' }} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', color: '#0b2e59' }}>
                <input type="checkbox" name="isFeatured" defaultChecked={editData?.is_featured === 1} style={{ width: '20px', height: '20px' }} /> 
                <span>Destacar este producto en la página principal</span>
              </label>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <button disabled={isSubmitting} style={{ width: '100%', marginTop: '1rem', background: '#0b2e59', color: 'white', padding: '1.1rem', borderRadius: '14px', fontWeight: 900, border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(11, 46, 89, 0.25)', fontSize: '1rem' }}>
                {isSubmitting ? <Loader2 className="animate-spin" style={{ margin: '0 auto' }} /> : (editData ? 'Actualizar Producto' : 'Publicar Producto')}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AdminDashboard;
