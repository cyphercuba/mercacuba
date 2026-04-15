import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, MessageCircle, Tag, DollarSign, ChevronDown, ChevronRight, ShieldCheck, Clock, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const publicCatalogCats = [
  { id: 'alimentos', name: 'Alimentos', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'bebidas', name: 'Bebidas', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'aseo-e-higiene', name: 'Higiene', image: '/hygiene_combo.png' },
  { id: 'ferreteria', name: 'Construcción', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'electrodomesticos', name: 'Electrodomésticos', image: 'https://images.unsplash.com/photo-1626806787426-5910811b6325?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'articulos-del-hogar', name: 'Hogar', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'mayorista', name: 'Venta Mayorista', image: '/wholesale_pallet.png' },
  { id: 'otros', name: 'Más', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=200&h=200&q=80' },
];

const categoryTree = [
  { id: 'despensa', name: '🥫 Despensa', children: ['Conservas', 'Aceites y salsas', 'Café e infusiones', 'Granos y legumbres', 'Galletas', 'Panadería', 'Confituras'] },
  { id: 'huevos-lacteos', name: '🥚 Huevos y Lácteos', children: ['Huevos', 'Lácteos'] },
  { id: 'carnicos', name: '🥩 Cárnicos', children: ['Carne de res', 'Cerdo', 'Pollo', 'Cordero (Carnero)', 'Embutidos', 'Cárnicos varios'] },
  { id: 'dulces-helados', name: '🍰 Dulces y Helados', children: ['Cakes y tartas', 'Helados', 'Dulces caseros'] },
  { id: 'aseo-cuidado', name: '🧴 Aseo y Cuidado Personal', children: ['Productos de aseo', 'Perfumes'] },
  { id: 'cenas-bufets', name: '🍽️ Cenas y Bufets', children: ['Comidas preparadas', 'Catering / Bufet'] },
  { id: 'electrodomesticos', name: '🔌 Electrodomésticos', children: ['Cocina', 'Refrigeración', 'Lavado', 'Pequeños electrodomésticos'] },
  { id: 'pescados-mariscos', name: '🐟 Pescados y Mariscos', children: ['Pescados', 'Mariscos'] },
  { id: 'bebidas', name: '🥤 Bebidas', children: ['Refrescos', 'Jugos', 'Bebidas alcohólicas', 'Agua'] },
  { id: 'de-agro', name: '🌾 De Agro', children: ['Viandas', 'Vegetales', 'Frutas'] },
  { id: 'farmacia', name: '💊 Farmacia', children: ['Medicamentos', 'Vitaminas', 'Productos médicos'] },
  { id: 'ferreteria', name: '🔧 Ferretería', children: ['Herramientas', 'Materiales de construcción'] },
  { id: 'preelaborados', name: '🍕 Alimentos Preelaborados', children: ['Pizzas', 'Comida rápida', 'Congelados'] },
  { id: 'limpieza-utiles', name: '🧼 Limpieza y Útiles', children: ['Productos de limpieza', 'Utensilios del hogar'] },
  { id: 'regalos', name: '🎁 Regalos', children: ['Regalos para hombre', 'Regalos para mujer', 'Regalos para niños/as', 'Flores'] },
  { id: 'piezas-accesorios', name: '🛠️ Piezas y Accesorios', children: ['Repuestos', 'Accesorios varios'] },
  { id: 'hogar-mobiliario', name: '🛋️ Hogar y Mobiliario', children: ['Muebles', 'Decoración'] },
  { id: 'infantiles-escolares', name: '🎒 Infantiles y Escolares', children: ['Útiles escolares', 'Productos infantiles'] },
  { id: 'moda-accesorios', name: '👕 Moda y Accesorios', children: ['Ropa', 'Accesorios'] },
  { id: 'bebe', name: '👶 Bebé', children: ['Productos para bebé'] },
  { id: 'otros', name: '📦 Otros', children: ['Otros productos', 'Congelados y refrigerados'] },
];

const priceRanges = ['Menos de US$25', 'US$25 a US$50', 'US$50 a US$100', 'US$100 a US$250', 'Más de US$250'];
const discountOptions = ['Ofertas del día', 'Combos con descuento', 'Entrega rápida', 'Mayorista'];

const filterCardStyle = {
  backgroundColor: 'white',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
  overflow: 'hidden',
};

const PublicHome = () => (
  <div>
    <section style={{ position: 'relative', backgroundColor: 'var(--color-brand-blue)', color: 'white', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden', marginBottom: 'var(--spacing-6)' }}>
      <div className="hidden-mobile" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '55%', zIndex: 0, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', overflow: 'hidden' }}>
        <img src="/dr_cuba_map.png" alt="Dominican Republic to Cuba" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9, mixBlendMode: 'screen' }} />
      </div>

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(90deg, rgba(9,46,92,1) 45%, rgba(9,46,92,0) 100%)', zIndex: 0 }}></div>

      <div className="hero-container" style={{ position: 'relative', zIndex: 1, padding: 'var(--spacing-10) var(--spacing-8)' }}>
        <h1 className="hero-title" style={{ fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.15, marginBottom: 'var(--spacing-4)', maxWidth: '520px' }}>
          Compra en República Dominicana <br />
          <span style={{ color: 'var(--color-accent)' }}>para tu familia en Cuba</span>
        </h1>
        <p className="hero-desc" style={{ fontSize: '1.05rem', maxWidth: '460px', marginBottom: 'var(--spacing-7)', opacity: 0.9 }}>
          Nosotros compramos, consolidamos y entregamos con amor.
        </p>

        <div className="flex gap-4 hero-buttons">
          <Link to="/catalogo" className="btn btn-secondary" style={{ padding: 'var(--spacing-3) var(--spacing-6)', fontSize: '1rem', fontWeight: 600, display: 'inline-block', textDecoration: 'none' }}>
            Comprar ahora
          </Link>
          <Link to="/mayorista-mipymes" className="btn btn-gold-hover" style={{ padding: 'var(--spacing-3) var(--spacing-6)', fontSize: '1rem', fontWeight: 600, border: '1px solid white', backgroundColor: 'transparent', color: 'white', textDecoration: 'none', display: 'inline-block' }}>
            Compra Mayorista
          </Link>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '45%', zIndex: 0, opacity: 0.1, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10%' }}>
        <img src="/logo.png" alt="" style={{ width: '100%', objectFit: 'contain', filter: 'invert(1)', mixBlendMode: 'screen' }} />
      </div>
    </section>

    <section style={{ backgroundColor: '#0b2e59', color: 'white', borderRadius: 'var(--border-radius-md)', padding: 'var(--spacing-4) var(--spacing-8)', marginBottom: 'var(--spacing-8)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--spacing-4)' }}>
      <div className="flex items-center gap-2" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
        <ShieldCheck size={20} opacity={0.8} /> Envíos seguros
      </div>
      <div className="flex items-center gap-2" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
        <Truck size={20} opacity={0.8} /> Entrega confiable
      </div>
      <div className="flex items-center gap-2" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
        <Clock size={20} opacity={0.8} /> Soporte 24/7
      </div>
      <div className="flex items-center gap-2" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
        <Lock size={20} opacity={0.8} /> Pagos seguros
      </div>
    </section>

    <section style={{ marginBottom: 'var(--spacing-10)' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-4)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Explora por categorías</h2>
        <Link to="/catalogo" style={{ fontSize: '0.875rem', color: 'var(--color-brand-blue)', fontWeight: 600 }}>
          Ver catálogo
        </Link>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-8 gap-4 categories-grid-mobile">
        {publicCatalogCats.map((cat) => (
          <Link key={cat.id} to={`/catalogo?cat=${cat.id}`} className="flex flex-col items-center gap-2 category-item-mobile" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="category-img-container" style={{ padding: '4px', border: '1px solid var(--color-border)', width: '100%', aspectRatio: '1/1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s', cursor: 'pointer', overflow: 'hidden' }}>
              <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, textAlign: 'center', color: 'var(--color-primary)' }}>{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginBottom: 'var(--spacing-8)' }}>
      <div style={{ backgroundColor: '#1e3050', color: 'white', padding: 'var(--spacing-4)', borderRadius: 'var(--border-radius)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
        <Truck size={24} color="#4ade80" />
        <div>
          <h4 style={{ fontWeight: 600, fontSize: '0.9rem' }}>Entregas desde 7 días</h4>
          <p style={{ fontSize: '0.75rem', opacity: 0.8 }}>según la provincia</p>
        </div>
      </div>
      <div style={{ backgroundColor: '#064e3b', color: 'white', padding: 'var(--spacing-4)', borderRadius: 'var(--border-radius)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
        <MessageCircle size={24} color="#4ade80" />
        <div>
          <h4 style={{ fontWeight: 600, fontSize: '0.9rem' }}>Atención por WhatsApp</h4>
          <p style={{ fontSize: '0.75rem', opacity: 0.8 }}>Escríbenos ahora</p>
        </div>
      </div>
    </div>
  </div>
);

const AuthenticatedHome = () => {
  const [openCategories, setOpenCategories] = useState({
    despensa: true,
    'huevos-lacteos': true,
    carnicos: true,
    'dulces-helados': false,
    'aseo-cuidado': false,
  });

  const toggleCategory = (id) => {
    setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="home-market-layout" style={{ display: 'grid', gridTemplateColumns: '270px minmax(0, 1fr)', gap: '0.9rem', alignItems: 'start' }}>
      <aside className="home-categories-sidebar" style={{ display: 'grid', gap: '1rem', position: 'sticky', top: '56px' }}>
        <div style={filterCardStyle}>
          <div style={{ backgroundColor: '#0b2e59', color: 'white', padding: '1rem 1.1rem', fontWeight: 800, fontSize: '1rem' }}>Categorías</div>
          <div style={{ padding: '0.35rem 0', maxHeight: '620px', overflowY: 'auto' }}>
            {categoryTree.map((cat) => {
              const isOpen = !!openCategories[cat.id];
              return (
                <div key={cat.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <button type="button" onClick={() => toggleCategory(cat.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', padding: '0.82rem 1.1rem', color: '#0f172a', background: 'none', border: 'none', fontSize: '0.95rem', cursor: 'pointer', textAlign: 'left' }}>
                    <span>{cat.name}</span>
                    {isOpen ? <ChevronDown size={16} color="#64748b" /> : <ChevronRight size={16} color="#64748b" />}
                  </button>
                  {isOpen && cat.children?.length > 0 && (
                    <div style={{ padding: '0 0 0.5rem' }}>
                      {cat.children.map((child) => (
                        <Link key={child} to={`/catalogo?cat=${encodeURIComponent(cat.id)}&sub=${encodeURIComponent(child)}`} style={{ display: 'block', padding: '0.4rem 1.1rem 0.4rem 2.2rem', color: '#475569', textDecoration: 'none', fontSize: '0.9rem' }}>
                          {child}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div style={filterCardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '1rem 1.1rem', borderBottom: '1px solid #f1f5f9', fontWeight: 800, color: '#0f172a' }}>
            <DollarSign size={18} /> Precio
          </div>
          <div style={{ padding: '0.5rem 1.1rem 0.9rem' }}>
            {priceRanges.map((range) => (
              <label key={range} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.45rem 0', fontSize: '0.92rem', color: '#334155', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: '#0b2e59' }} />
                {range}
              </label>
            ))}
          </div>
        </div>

        <div style={filterCardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '1rem 1.1rem', borderBottom: '1px solid #f1f5f9', fontWeight: 800, color: '#0f172a' }}>
            <Tag size={18} /> Ofertas y descuentos
          </div>
          <div style={{ padding: '0.5rem 1.1rem 0.9rem' }}>
            {discountOptions.map((option) => (
              <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.45rem 0', fontSize: '0.92rem', color: '#334155', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: '#0b2e59' }} />
                {option}
              </label>
            ))}
          </div>
        </div>
      </aside>

      <div style={{ minHeight: '600px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)', padding: '1.5rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem' }}>Explora la tienda</h2>
        <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
          Selecciona una categoría a la izquierda para ir cargando productos y resultados en esta área central.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div style={{ backgroundColor: '#1e3050', color: 'white', padding: 'var(--spacing-4)', borderRadius: 'var(--border-radius)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
            <Truck size={24} color="#4ade80" />
            <div>
              <h4 style={{ fontWeight: 600, fontSize: '0.9rem' }}>Entregas desde 7 días</h4>
              <p style={{ fontSize: '0.75rem', opacity: 0.8 }}>según la provincia</p>
            </div>
          </div>
          <div style={{ backgroundColor: '#064e3b', color: 'white', padding: 'var(--spacing-4)', borderRadius: 'var(--border-radius)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
            <MessageCircle size={24} color="#4ade80" />
            <div>
              <h4 style={{ fontWeight: 600, fontSize: '0.9rem' }}>Atención por WhatsApp</h4>
              <p style={{ fontSize: '0.75rem', opacity: 0.8 }}>Escríbenos ahora</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const { user } = useAuth();

  return <div>{user ? <AuthenticatedHome /> : <PublicHome />}</div>;
};

export default Home;
