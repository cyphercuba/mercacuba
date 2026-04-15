import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, Clock, Lock, MessageCircle, Tag, DollarSign, ChevronDown, ChevronRight } from 'lucide-react';

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

const priceRanges = [
  'Menos de US$25',
  'US$25 a US$50',
  'US$50 a US$100',
  'US$100 a US$250',
  'Más de US$250',
];

const discountOptions = [
  'Ofertas del día',
  'Combos con descuento',
  'Entrega rápida',
  'Mayorista',
];

const featuredLinks = [
  { title: 'Combos familiares', text: 'Selecciones listas para enviar a Cuba con mejor relación valor-precio.', to: '/combos' },
  { title: 'Encargos personalizados', text: 'Si no lo ves en catálogo, lo buscamos por ti y te damos respuesta rápida.', to: '/encargos' },
  { title: 'Compra mayorista', text: 'Soluciones para mipymes, negocios y compras grandes desde RD.', to: '/mayorista-mipymes' },
];

const filterCardStyle = {
  backgroundColor: 'white',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
  overflow: 'hidden',
};

const Home = () => {
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
    <div>
      <div className="home-market-layout" style={{ display: 'grid', gridTemplateColumns: '290px minmax(0, 1fr)', gap: '1.5rem', alignItems: 'start' }}>
        <aside className="home-categories-sidebar" style={{ display: 'grid', gap: '1rem', position: 'sticky', top: '96px' }}>
          <div style={filterCardStyle}>
            <div style={{ backgroundColor: '#0b2e59', color: 'white', padding: '1rem 1.1rem', fontWeight: 800, fontSize: '1rem' }}>
              Categorías
            </div>
            <div style={{ padding: '0.35rem 0', maxHeight: '620px', overflowY: 'auto' }}>
              {categoryTree.map((cat) => {
                const isOpen = !!openCategories[cat.id];
                return (
                  <div key={cat.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <button
                      type="button"
                      onClick={() => toggleCategory(cat.id)}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', padding: '0.82rem 1.1rem', color: '#0f172a', background: 'none', border: 'none', fontSize: '0.95rem', cursor: 'pointer', textAlign: 'left' }}
                    >
                      <span>{cat.name}</span>
                      {isOpen ? <ChevronDown size={16} color="#64748b" /> : <ChevronRight size={16} color="#64748b" />}
                    </button>
                    {isOpen && cat.children?.length > 0 && (
                      <div style={{ padding: '0 0 0.5rem' }}>
                        {cat.children.map((child) => (
                          <Link
                            key={child}
                            to={`/catalogo?cat=${encodeURIComponent(cat.id)}&sub=${encodeURIComponent(child)}`}
                            style={{ display: 'block', padding: '0.4rem 1.1rem 0.4rem 2.2rem', color: '#475569', textDecoration: 'none', fontSize: '0.9rem' }}
                          >
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

        <div>
          <section
            style={{
              position: 'relative',
              backgroundColor: 'var(--color-brand-blue)',
              color: 'white',
              borderRadius: 'var(--border-radius-lg)',
              overflow: 'hidden',
              marginBottom: 'var(--spacing-6)',
            }}
          >
            <div
              className="hidden-mobile"
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: '55%',
                zIndex: 0,
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                overflow: 'hidden',
              }}
            >
              <img src="/dr_cuba_map.png" alt="Dominican Republic to Cuba" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9, mixBlendMode: 'screen' }} />
            </div>

            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(90deg, rgba(9,46,92,1) 45%, rgba(9,46,92,0) 100%)',
                zIndex: 0,
              }}
            ></div>

            <div className="hero-container" style={{ position: 'relative', zIndex: 1, padding: 'var(--spacing-12) var(--spacing-8)' }}>
              <h1 className="hero-title" style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.2, marginBottom: 'var(--spacing-4)', maxWidth: '500px' }}>
                Compra en República Dominicana <br />
                <span style={{ color: 'var(--color-accent)' }}>para tu familia en Cuba</span>
              </h1>
              <p className="hero-desc" style={{ fontSize: '1.1rem', maxWidth: '450px', marginBottom: 'var(--spacing-8)', opacity: 0.9 }}>
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

          <section style={{ backgroundColor: '#0b2e59', color: 'white', borderRadius: 'var(--border-radius-md)', padding: 'var(--spacing-4) var(--spacing-8)', marginBottom: 'var(--spacing-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--spacing-4)' }}>
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

          <section style={{ display: 'grid', gap: '1rem', marginBottom: 'var(--spacing-8)' }}>
            {featuredLinks.map((item) => (
              <Link
                key={item.title}
                to={item.to}
                style={{
                  ...filterCardStyle,
                  padding: '1.25rem 1.35rem',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                }}
              >
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>{item.title}</div>
                <p style={{ color: '#64748b', marginBottom: '0.8rem' }}>{item.text}</p>
                <span style={{ color: '#0b2e59', fontWeight: 700, fontSize: '0.92rem' }}>Explorar</span>
              </Link>
            ))}
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ marginBottom: 'var(--spacing-8)' }}>
            <div style={{ backgroundColor: 'var(--color-brand-blue)', color: 'white', padding: 'var(--spacing-4)', borderRadius: 'var(--border-radius)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
              <div style={{ backgroundColor: 'white', color: 'var(--color-brand-blue)', padding: '5px', borderRadius: '4px', fontWeight: 800 }}>/</div>
              <div>
                <h4 style={{ fontWeight: 600, fontSize: '0.9rem' }}>¿No encuentras algo?</h4>
                <p style={{ fontSize: '0.75rem', opacity: 0.8 }}>Haz tu encargo personalizado</p>
              </div>
            </div>
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

          <div style={{ paddingBottom: 'var(--spacing-8)' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
