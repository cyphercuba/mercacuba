import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, MessageCircle, Tag, DollarSign, ChevronDown, ChevronRight } from 'lucide-react';

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
      <div className="home-market-layout" style={{ display: 'grid', gridTemplateColumns: '290px minmax(0, 1fr)', gap: '1.2rem', alignItems: 'start' }}>
        <aside className="home-categories-sidebar" style={{ display: 'grid', gap: '1rem', position: 'sticky', top: '56px' }}>
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
          <div style={{ display: 'grid', gap: '1rem', marginBottom: 'var(--spacing-8)' }}>
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
