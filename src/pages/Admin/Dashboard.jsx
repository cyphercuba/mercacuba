import React, { useState, useEffect } from 'react';
import { 
  Package, Users, ShoppingBag, TrendingUp, AlertCircle, Plus, Loader2, X, 
  ShoppingCart, Edit, Trash2, Tag, LayoutDashboard, Layers, Zap, Eye, EyeOff, Check, Save 
} from 'lucide-react';
import { 
  getAdminStats, getAdminProducts, createAdminProduct, updateAdminProduct, deleteAdminProduct, patchAdminProduct,
  getAdminCategories, createAdminCategory, updateAdminCategory, deleteAdminCategory,
  getAdminSubcategories, createAdminSubcategory, updateAdminSubcategory, deleteAdminSubcategory 
} from '../../lib/catalog';
import { fullHierarchyFallback } from '../../data/catalogFallback';

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
  const [activeTab, setActiveTab] = useState('overview'); // overview, products, categories, inventory
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modals state
  const [modalType, setModalType] = useState(null); // 'prod_add', 'prod_edit', 'cat_add', 'cat_edit', 'sub_add', 'sub_edit'
  const [editData, setEditData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formCategoryId, setFormCategoryId] = useState('');

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    if (modalType?.startsWith('prod')) {
      setFormCategoryId(editData?.category_id || (categories.length > 0 ? categories[0].id : ''));
    }
  }, [modalType, editData, categories]);

  const loadAll = async () => {
    setLoading(true);
    const [statRes, prodRes, catRes, subRes] = await Promise.all([
      getAdminStats(),
      getAdminProducts(),
      getAdminCategories(),
      getAdminSubcategories()
    ]);
    
    if (statRes.ok) {
      setStats(statRes.stats);
      setLowStock(statRes.lowStock || []);
    }
    if (prodRes.ok) setProducts(prodRes.products);
    if (catRes.ok) setCategories(catRes.categories);
    if (subRes.ok) setSubcategories(subRes.subcategories);
    
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
      subcategoryId: formData.get('subcategoryId'),
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

  const handleCategorySave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const data = {
      id: editData?.id,
      name: formData.get('name'),
      slug: formData.get('slug') || formData.get('name').toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
      image_url: formData.get('image_url'),
      display_order: parseInt(formData.get('display_order') || '0'),
      status: editData ? editData.status : 'active'
    };
    const res = editData ? await updateAdminCategory(data) : await createAdminCategory(data);
    if (res.ok) { loadAll(); setModalType(null); }
    setIsSubmitting(false);
  };

  const handleSubCategorySave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const data = {
      id: editData?.id,
      category_id: formData.get('category_id'),
      name: formData.get('name'),
      slug: formData.get('slug') || formData.get('name').toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
      display_order: parseInt(formData.get('display_order') || '0'),
      status: editData ? editData.status : 'active'
    };
    const res = editData ? await updateAdminSubcategory(data) : await createAdminSubcategory(data);
    if (res.ok) { loadAll(); setModalType(null); }
    setIsSubmitting(false);
  };

  const toggleProductStatus = async (product) => {
    const newStatus = product.status === 'active' ? 'inactive' : 'active';
    const res = await patchAdminProduct(product.id, { status: newStatus });
    if (res.ok) {
      setProducts(products.map(p => p.id === product.id ? { ...p, status: newStatus } : p));
    }
  };

  const updateProductStock = async (id, newStock) => {
    const res = await patchAdminProduct(id, { stock: parseInt(newStock) });
    if (res.ok) {
      setProducts(products.map(p => p.id === id ? { ...p, stock: parseInt(newStock) } : p));
    }
  };

  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10rem 0' }}><Loader2 className="animate-spin" size={48} color="#0b2e59" /></div>;

  const TabButton = ({ id, label, icon }) => {
    const isActive = activeTab === id;
    return (
      <button 
        onClick={() => setActiveTab(id)}
        style={{ 
          display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.9rem 1.5rem', borderRadius: '14px', border: 'none', cursor: 'pointer',
          backgroundColor: isActive ? '#0b2e59' : 'transparent', color: isActive ? 'white' : '#64748b', fontWeight: 700, fontSize: '0.95rem',
          transition: 'all 0.2s'
        }}
      >
        {icon} {label}
      </button>
    );
  };

  return (
    <div style={{ padding: '2rem 0' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0b2e59', marginBottom: '0.25rem' }}>Administración</h1>
          <p style={{ color: '#64748b', fontWeight: 500 }}>Gestiona el catálogo, inventario y configuración de MercadoCuba.</p>
        </div>
        <div style={{ display: 'flex', backgroundColor: '#f1f5f9', padding: '0.4rem', borderRadius: '18px', gap: '0.25rem' }}>
          <TabButton id="overview" label="Dashboard" icon={<LayoutDashboard size={18} />} />
          <TabButton id="products" label="Productos" icon={<Package size={18} />} />
          <TabButton id="categories" label="Categorías" icon={<Layers size={18} />} />
          <TabButton id="inventory" label="Inventario Rápido" icon={<Zap size={18} />} />
        </div>
      </header>

      {/* Overview Module */}
      {activeTab === 'overview' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {[
              { label: 'Productos', value: stats?.products || '0', icon: <Package size={24} />, color: '#0b2e59' },
              { label: 'Clientes', value: stats?.users || '0', icon: <Users size={24} />, color: '#10b981' },
              { label: 'Pedidos Hoy', value: stats?.todayOrders || '0', icon: <ShoppingBag size={24} />, color: '#f59e0b' },
              { label: 'Ventas Mes', value: `US$ ${stats?.monthlySales?.toFixed(1) || '0.0'}k`, icon: <TrendingUp size={24} />, color: '#6366f1' },
            ].map((stat, i) => (
              <div key={i} style={{ backgroundColor: 'white', padding: '1.75rem', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                <div style={{ backgroundColor: `${stat.color}12`, color: stat.color, padding: '0.8rem', borderRadius: '16px', display: 'inline-block', marginBottom: '1.25rem' }}>{stat.icon}</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{stat.label}</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a' }}>{stat.value}</div>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: '#fff1f2', padding: '2rem', borderRadius: '24px', border: '1px solid #fee2e2' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#e11d48', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <AlertCircle size={22} /> Alertas de Inventario
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
              {lowStock.map(p => (
                <div key={p.id} style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ fontWeight: 800, flex: 1 }}>{p.name}</div>
                  <div style={{ color: '#e11d48', fontWeight: 700 }}>Stock: {p.stock}</div>
                  <button onClick={() => setActiveTab('inventory')} style={{ border: 'none', background: '#f1f5f9', padding: '6px 12px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Gestionar</button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Products Module */}
      {activeTab === 'products' && (
        <section style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Módulo de Productos</h3>
            <button onClick={() => { setEditData(null); setModalType('prod_add'); }} style={{ backgroundColor: '#0b2e59', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '12px', border: 'none', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={20} /> Nuevo Producto
            </button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #f8fafc' }}>
                <th style={{ padding: '1rem' }}>Producto</th>
                <th style={{ padding: '1rem' }}>Categoría</th>
                <th style={{ padding: '1rem' }}>Precio</th>
                <th style={{ padding: '1rem' }}>Estado</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                   <td style={{ padding: '1rem', fontWeight: 700 }}>{p.name}</td>
                   <td style={{ padding: '1rem', color: '#64748b' }}>{p.category_name}</td>
                   <td style={{ padding: '1rem', fontWeight: 600 }}>US${p.price.toFixed(2)}</td>
                   <td style={{ padding: '1rem' }}>
                    <span style={{ padding: '4px 10px', borderRadius: '99px', fontSize: '0.7rem', fontWeight: 800, backgroundColor: p.status === 'active' ? '#f0fdf4' : '#f1f5f9', color: p.status === 'active' ? '#166534' : '#64748b' }}>
                      {p.status.toUpperCase()}
                    </span>
                   </td>
                   <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button onClick={() => { setEditData(p); setModalType('prod_edit'); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px', color: '#0b2e59' }}><Edit size={18} /></button>
                    <button onClick={async () => { if(confirm('¿De verdad?')) { await deleteAdminProduct(p.id); loadAll(); } }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px', color: '#ef4444' }}><Trash2 size={18} /></button>
                   </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Categories Module */}
      {activeTab === 'categories' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Main Categories */}
          <section style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Categorías Base</h3>
              <button onClick={() => { setEditData(null); setModalType('cat_add'); }} style={{ background: '#f1f5f9', color: '#0b2e59', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer' }}><Plus size={16} /></button>
            </div>
            {categories.map(cat => (
              <div key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: '1.5rem' }}>{cat.name.split(' ')[0]}</span>
                <div style={{ flex: 1, fontWeight: 700 }}>{cat.name}</div>
                <button onClick={() => { setEditData(cat); setModalType('cat_edit'); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><Edit size={16} /></button>
              </div>
            ))}
          </section>

          {/* Subcategories */}
          <section style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Sub-Categorías</h3>
              <button onClick={() => { setEditData(null); setModalType('sub_add'); }} style={{ background: '#f1f5f9', color: '#0b2e59', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer' }}><Plus size={16} /></button>
            </div>
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {subcategories.map(sub => (
                <div key={sub.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem', borderBottom: '1px solid #f8fafc' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{sub.name}</div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Padre: {categories.find(c => c.id === sub.category_id)?.name || 'Desconocido'}</div>
                  </div>
                  <button onClick={() => { setEditData(sub); setModalType('sub_edit'); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><Edit size={16} /></button>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Quick Inventory Module */}
      {activeTab === 'inventory' && (
        <section style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0b2e59' }}>Control Rápido de Inventario</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Actualiza stock y disponibilidad sin recargar la página.</p>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #f8fafc' }}>
                <th style={{ padding: '1rem' }}>Producto</th>
                <th style={{ padding: '1rem' }}>Stock Actual</th>
                <th style={{ padding: '1rem' }}>Disponibilidad</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => {
                const isOut = p.status === 'inactive' || p.stock <= 0;
                return (
                  <tr key={p.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                    <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                       <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#f1f5f9', overflow: 'hidden' }}>
                        <img src={p.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                       </div>
                       <span style={{ fontWeight: 700 }}>{p.name}</span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <input 
                        type="number" 
                        defaultValue={p.stock} 
                        onBlur={(e) => updateProductStock(p.id, e.target.value)}
                        style={{ width: '80px', padding: '0.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontWeight: 800, textAlign: 'center' }} 
                      />
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <button 
                        onClick={() => toggleProductStatus(p)}
                        style={{ 
                          border: 'none', padding: '0.6rem 1rem', borderRadius: '10px', cursor: 'pointer', fontWeight: 800, fontSize: '0.75rem',
                          backgroundColor: p.status === 'active' ? '#dcfce7' : '#f1f5f9',
                          color: p.status === 'active' ? '#166534' : '#64748b',
                          display: 'flex', alignItems: 'center', gap: '6px'
                        }}
                      >
                        {p.status === 'active' ? <Eye size={16} /> : <EyeOff size={16} />}
                        {p.status === 'active' ? 'VISIBLE' : 'OCULTO'}
                      </button>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                       <div style={{ 
                         display: 'inline-flex', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800,
                         backgroundColor: p.stock > 0 ? '#ecfdf5' : '#fff1f2',
                         color: p.stock > 0 ? '#059669' : '#e11d48',
                         border: `1px solid ${p.stock > 0 ? '#10b98120' : '#f43f5e20'}`
                       }}>
                         {p.stock > 0 ? 'DISPONIBLE' : 'AGOTADO'}
                       </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      )}

      {/* MODALS */}
      {modalType && (
        <Modal 
          title={modalType.startsWith('prod') ? 'Gestión de Producto' : modalType.startsWith('cat') ? 'Gestión de Categoría' : 'Gestión de Sub-Categoría'} 
          onClose={() => setModalType(null)}
        >
          {/* Product Form */}
          {modalType.startsWith('prod') && (
            <form onSubmit={handleProductSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Nombre</label>
                <input name="name" defaultValue={editData?.name} required style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid #e2e8f0' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Categoría</label>
                <select 
                  name="categoryId" 
                  value={formCategoryId}
                  onChange={(e) => setFormCategoryId(e.target.value)}
                  required 
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}
                >
                  <option value="" disabled>Seleccionar...</option>
                  {(categories.length > 0 ? categories : fullHierarchyFallback).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Sub-Cat (Opcional)</label>
                <select 
                  name="subcategoryId" 
                  defaultValue={editData?.subcategory_id} 
                  style={{ 
                    width: '100%', 
                    padding: '0.8rem', 
                    borderRadius: '10px', 
                    border: '1px solid #e2e8f0',
                    backgroundColor: (subcategories.length > 0 ? subcategories : fullHierarchyFallback.flatMap(c => c.subcategories || []))
                      .filter(s => s.category_id === formCategoryId || (fullHierarchyFallback.find(cat => cat.id === formCategoryId)?.subcategories?.some(sub => sub.id === s.id)))
                      .length === 0 ? '#f8fafc' : 'white'
                  }}
                  disabled={
                    (subcategories.length > 0 ? subcategories : fullHierarchyFallback.flatMap(c => c.subcategories || []))
                      .filter(s => s.category_id === formCategoryId || (fullHierarchyFallback.find(cat => cat.id === formCategoryId)?.subcategories?.some(sub => sub.id === s.id)))
                      .length === 0
                  }
                >
                  <option value="">Ninguna</option>
                  {(subcategories.length > 0 ? subcategories : (fullHierarchyFallback.find(c => c.id === formCategoryId)?.subcategories || []))
                    .map(s => <option key={s.id} value={s.id}>{s.name}</option>)
                  }
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Precio Base</label>
                <input type="number" step="0.01" name="price" defaultValue={editData?.price} required style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid #e2e8f0' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Stock</label>
                <input type="number" name="stock" defaultValue={editData?.stock} required style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid #e2e8f0' }} />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>URL Imagen</label>
                <input name="imageUrl" defaultValue={editData?.image_url} style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid #e2e8f0' }} />
              </div>
               <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, cursor: 'pointer' }}>
                  <input type="checkbox" name="isFeatured" defaultChecked={editData?.is_featured === 1} /> <span>Producto Destacado</span>
                </label>
              </div>
              <button disabled={isSubmitting} style={{ gridColumn: 'span 2', padding: '1rem', background: '#0b2e59', color: 'white', borderRadius: '12px', border: 'none', fontWeight: 800, cursor: 'pointer' }}>
                {isSubmitting ? 'Guardando...' : 'Guardar Producto'}
              </button>
            </form>
          )}

          {/* Category Form */}
          {modalType.startsWith('cat') && (
            <form onSubmit={handleCategorySave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Nombre (ej: 🥫 Despensa)</label>
                <input name="name" defaultValue={editData?.name} required style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid #e2e8f0' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Slug</label>
                  <input name="slug" defaultValue={editData?.slug} placeholder="Opcional" style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid #e2e8f0' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Orden</label>
                  <input type="number" name="display_order" defaultValue={editData?.display_order || 0} style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid #e2e8f0' }} />
                </div>
              </div>
              <button disabled={isSubmitting} style={{ padding: '1rem', background: '#0b2e59', color: 'white', borderRadius: '12px', border: 'none', fontWeight: 800 }}>Guardar Categoría</button>
            </form>
          )}

          {/* Subcategory Form */}
          {modalType.startsWith('sub') && (
            <form onSubmit={handleSubCategorySave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Categoría Padre</label>
                <select name="category_id" defaultValue={editData?.category_id} required style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Nombre</label>
                <input name="name" defaultValue={editData?.name} required style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid #e2e8f0' }} />
              </div>
              <button disabled={isSubmitting} style={{ padding: '1rem', background: '#0b2e59', color: 'white', borderRadius: '12px', border: 'none', fontWeight: 800 }}>Guardar Sub-Categoría</button>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
};

export default AdminDashboard;
