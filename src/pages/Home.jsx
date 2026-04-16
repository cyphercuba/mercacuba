import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Truck, MessageCircle, Tag, DollarSign, ChevronDown, ChevronRight, ShieldCheck, Clock, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getCategories, getProducts } from '../lib/catalog';
import ProductCard from '../components/ProductCard';

// Secondary condensed list for public home hero
const publicCatalogCats = [
  { id: 'despensa', slug: 'despensa', name: '🥫 Despensa', image: '/logo.png' },
  { id: 'huevos-lacteos', slug: 'huevos-lacteos', name: '🥚 Lácteos', image: '/logo.png' },
  { id: 'carnicos', slug: 'carnicos', name: '🥩 Cárnicos', image: '/logo.png' },
  { id: 'bebidas', slug: 'bebidas', name: '🥤 Bebidas', image: '/logo.png' },
  { id: 'electrodomesticos', slug: 'electrodomesticos', name: '🔌 Electro', image: '/logo.png' },
  { id: 'agro', slug: 'agro', name: '🌾 Agro', image: '/logo.png' },
  { id: 'limpieza-utiles', slug: 'limpieza-utiles', name: '🧼 Limpieza', image: '/logo.png' },
  { id: 'otros', slug: 'otros', name: 'Más', image: '/logo.png' },
];

const fullHierarchyFallback = [
  { id: 1, name: '🥫 Despensa', slug: 'despensa', subcategories: [
    { id: 101, name: 'Conservas', slug: 'conservas' }, { id: 102, name: 'Aceites y salsas', slug: 'aceites-salsas' },
    { id: 103, name: 'Café e infusiones', slug: 'cafe-infusiones' }, { id: 104, name: 'Granos y legumbres', slug: 'granos-legumbres' },
    { id: 105, name: 'Galletas', slug: 'galletas' }, { id: 106, name: 'Panadería', slug: 'panaderia' }, { id: 107, name: 'Confituras', slug: 'confituras' }
  ]},
  { id: 2, name: '🥚 Huevos y Lácteos', slug: 'huevos-lacteos', subcategories: [
    { id: 201, name: 'Huevos', slug: 'huevos' }, { id: 202, name: 'Lácteos', slug: 'lacteos' }
  ]},
  { id: 3, name: '🥩 Cárnicos', slug: 'carnicos', subcategories: [
    { id: 301, name: 'Carne de res', slug: 'carne-res' }, { id: 302, name: 'Cerdo', slug: 'cerdo' }, 
    { id: 303, name: 'Pollo', slug: 'pollo' }, { id: 304, name: 'Cordero (Carnero)', slug: 'cordero-carnero' },
    { id: 305, name: 'Embutidos', slug: 'embutidos' }, { id: 306, name: 'Cárnicos varios', slug: 'carnicos-varios' }
  ]},
  { id: 4, name: '🍰 Dulces y Helados', slug: 'dulces-helados', subcategories: [
    { id: 401, name: 'Cakes y tartas', slug: 'cakes-tartas' }, { id: 402, name: 'Helados', slug: 'helados' }, { id: 403, name: 'Dulces caseros', slug: 'dulces-caseros' }
  ]},
  { id: 5, name: '🧴 Aseo y Cuidado Personal', slug: 'aseo-cuidado-personal', subcategories: [
    { id: 501, name: 'Productos de aseo', slug: 'productos-aseo' }, { id: 502, name: 'Perfumes', slug: 'perfumes' }
  ]},
  { id: 6, name: '🍽️ Cenas y Bufets', slug: 'cenas-bufets', subcategories: [
    { id: 601, name: 'Comidas preparadas', slug: 'comidas-preparadas' }, { id: 602, name: 'Catering / Bufet', slug: 'catering-bufet' }
  ]},
  { id: 7, name: '🔌 Electrodomésticos', slug: 'electrodomesticos', subcategories: [
    { id: 701, name: 'Cocina', slug: 'cocina' }, { id: 702, name: 'Refrigeración', slug: 'refrigeracion' },
    { id: 703, name: 'Lavado', slug: 'lavado' }, { id: 704, name: 'Pequeños electrodomésticos', slug: 'pequenos-electrodomesticos' }
  ]},
  { id: 8, name: '🐟 Pescados y Mariscos', slug: 'pescados-mariscos', subcategories: [
    { id: 801, name: 'Pescados', slug: 'pescados' }, { id: 802, name: 'Mariscos', slug: 'mariscos' }
  ]},
  { id: 9, name: '🥤 Bebidas', slug: 'bebidas', subcategories: [
    { id: 901, name: 'Refrescos', slug: 'refrescos' }, { id: 902, name: 'Jugos', slug: 'jugos' },
    { id: 903, name: 'Bebidas alcohólicas', slug: 'bebidas-alcoholicas' }, { id: 904, name: 'Agua', slug: 'agua' }
  ]},
  { id: 10, name: '🌾 De Agro', slug: 'agro', subcategories: [
    { id: 1001, name: 'Viandas', slug: 'viandas' }, { id: 1002, name: 'Vegetales', slug: 'vegetales' }, { id: 1003, name: 'Frutas', slug: 'frutas' }
  ]},
  { id: 11, name: '💊 Farmacia', slug: 'farmacia', subcategories: [
    { id: 1101, name: 'Medicamentos', slug: 'medicamentos' }, { id: 1102, name: 'Vitaminas', slug: 'vitaminas' }, { id: 1103, name: 'Productos médicos', slug: 'productos-medicos' }
  ]},
  { id: 12, name: '🔧 Ferretería', slug: 'ferreteria', subcategories: [
    { id: 1201, name: 'Herramientas', slug: 'herramientas' }, { id: 1202, name: 'Materiales de construcción', slug: 'materiales-construccion' }
  ]},
  { id: 13, name: '🍕 Alimentos Preelaborados', slug: 'alimentos-preelaborados', subcategories: [
    { id: 1301, name: 'Pizzas', slug: 'pizzas' }, { id: 1302, name: 'Comida rápida', slug: 'comida-rapida' }, { id: 1303, name: 'Congelados', slug: 'congelados-alimentos' }
  ]},
  { id: 14, name: '🧼 Limpieza y Útiles', slug: 'limpieza-utiles', subcategories: [
    { id: 1401, name: 'Productos de limpieza', slug: 'productos-limpieza' }, { id: 1402, name: 'Utensilios del hogar', slug: 'utensilios-hogar' }
  ]},
  { id: 15, name: '🎁 Regalos', slug: 'regalos', subcategories: [
    { id: 1501, name: 'Regalos para hombre', slug: 'regalos-hombre' }, { id: 1502, name: 'Regalos para mujer', slug: 'regalos-mujer' },
    { id: 1503, name: 'Regalos para niños/as', slug: 'regalos-ninos' }, { id: 1504, name: 'Flores', slug: 'flores' }
  ]},
  { id: 16, name: '🛠️ Piezas y Accesorios', slug: 'piezas-accesorios', subcategories: [
    { id: 1601, name: 'Repuestos', slug: 'repuestos' }, { id: 1602, name: 'Accesorios varios', slug: 'accesorios-varios' }
  ]},
  { id: 17, name: '🛋️ Hogar y Mobiliario', slug: 'hogar-mobiliario', subcategories: [
    { id: 1701, name: 'Muebles', slug: 'muebles' }, { id: 1702, name: 'Decoración', slug: 'decoracion' }
  ]},
  { id: 18, name: '🎒 Infantiles y Escolares', slug: 'infantiles-escolares', subcategories: [
    { id: 1801, name: 'Útiles escolares', slug: 'utiles-escolares' }, { id: 1802, name: 'Productos infantiles', slug: 'productos-infantiles' }
  ]},
  { id: 19, name: '👕 Moda y Accesorios', slug: 'moda-accesorios', subcategories: [
    { id: 1901, name: 'Ropa', slug: 'ropa' }, { id: 1902, name: 'Accesorios', slug: 'accesorios-moda' }
  ]},
  { id: 20, name: '👶 Bebé', slug: 'bebe', subcategories: [
    { id: 2001, name: 'Productos para bebé', slug: 'productos-bebe' }
  ]},
  { id: 21, name: '📦 Otros', slug: 'otros', subcategories: [
    { id: 2101, name: 'Otros productos', slug: 'otros-productos' }, { id: 2102, name: 'Congelados y refrigerados', slug: 'congelados-refrigerados' }
  ]}
];

const priceRanges = ['Menos de US$25', 'US$25 a US$50', 'US$50 a US$100', 'US$100 a US$250', 'Más de US$250'];

const filterCardStyle = {
  backgroundColor: 'white',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
  overflow: 'hidden',
};

const PublicHome = () => (
  <div style={{ width: '100%' }}>
    <section style={{ position: 'relative', backgroundColor: 'var(--color-brand-blue)', color: 'white', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden', marginBottom: 'var(--spacing-6)' }}>
      <div className="hidden-mobile" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '55%', zIndex: 0, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', overflow: 'hidden' }}>
        <img src="/dr_cuba_map.png" alt="Dominican Republic to Cuba" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9, mixBlendMode: 'screen' }} />
      </div>

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(90deg, rgba(9,46,92,1) 45%, rgba(9,46,92,0) 100%)', zIndex: 0 }}></div>

      <div className="hero-container" style={{ position: 'relative', zIndex: 1, padding: 'var(--spacing-12) var(--spacing-8)' }}>
        <h1 className="hero-title" style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.2, marginBottom: 'var(--spacing-4)', maxWidth: '520px' }}>
          Compra en República Dominicana <br />
          <span style={{ color: 'var(--color-accent)' }}>para tu familia en Cuba</span>
        </h1>
        <p className="hero-desc" style={{ fontSize: '1.1rem', maxWidth: '460px', marginBottom: 'var(--spacing-8)', opacity: 0.9 }}>
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
          <Link key={cat.id} to={`/catalogo?cat=${cat.slug}`} className="flex flex-col items-center gap-2 category-item-mobile" style={{ textDecoration: 'none', color: 'inherit' }}>
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
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [loadingProds, setLoadingProds] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [openCategories, setOpenCategories] = useState({});

  useEffect(() => {
    async function loadInitialData() {
      setLoadingCats(true);
      try {
        const catRes = await getCategories();
        if (catRes.ok) {
          setCategories(catRes.categories || []);
          // Only open active one if any
          const initialOpen = {};
          setOpenCategories(initialOpen);
        }
      } catch (err) {
        console.error("Error loading categories", err);
      } finally {
        setLoadingCats(false);
      }

      setLoadingProds(true);
      try {
        const prodRes = await getProducts({ featured: true, limit: 12 });
        if (prodRes.ok) {
          setProducts(prodRes.products || []);
        }
      } catch (err) {
        console.error("Error loading products", err);
      } finally {
        setLoadingProds(false);
      }
    }
    loadInitialData();
  }, []);

  const toggleCategory = (id) => {
    setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCategoryClick = async (category) => {
    setActiveCategory(category);
    setLoadingProds(true);
    try {
      const prodRes = await getProducts({ category: category.slug, limit: 12 });
      if (prodRes.ok) {
        setProducts(prodRes.products || []);
      }
    } catch (err) {
      console.error("Error loading category products", err);
    } finally {
      setLoadingProds(false);
    }
  };

  const clearFilter = async () => {
    setActiveCategory(null);
    setLoadingProds(true);
    try {
      const prodRes = await getProducts({ featured: true, limit: 12 });
      if (prodRes.ok) {
        setProducts(prodRes.products || []);
      }
    } catch (err) {
      console.error("Error resetting filters", err);
    } finally {
      setLoadingProds(false);
    }
  };

  const fallbackProducts = [
    { id: 'f1', name: 'Producto en Espera', price: 0.00, image_url: null, category_name: 'Catálogo' },
    { id: 'f2', name: 'Novedad Próximamente', price: 0.00, image_url: null, category_name: 'Catálogo' },
  ];

  const displayProducts = (products?.length > 0) ? products : fallbackProducts;
  const displayCategories = (categories?.length > 0) ? categories : fullHierarchyFallback;

  return (
    <div className="authenticated-home-grid">
      
      {/* Real Sidebar - Stays Aligned at Top */}
      <aside className="home-sidebar-sticky">
        <div style={filterCardStyle}>
          <div style={{ backgroundColor: '#0b2e59', color: 'white', padding: '0.85rem 1.1rem', fontWeight: 800, fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>CATEGORÍAS</span>
            {loadingCats && <Loader2 className="animate-spin" size={14} />}
          </div>
          <div style={{ padding: '0.25rem 0', maxHeight: '720px', overflowY: 'auto' }}>
            {loadingCats ? (
              <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                <Loader2 className="animate-spin" size={24} color="#cbd5e1" style={{ margin: '0 auto' }} />
              </div>
            ) : displayCategories.map((cat) => {
              const isOpen = !!openCategories[cat.id];
              const isActive = activeCategory?.id === cat.id;
              return (
                <div key={cat.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                  <div 
                    onClick={() => {
                      handleCategoryClick(cat);
                      if (cat.subcategories?.length > 0) toggleCategory(cat.id);
                    }}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      backgroundColor: isActive ? '#f8fafc' : 'transparent',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    <div 
                      style={{ flexGrow: 1, padding: '0.75rem 0.5rem 0.75rem 1.1rem', color: isActive ? '#0b2e59' : '#1e293b', fontSize: '0.85rem', fontWeight: isActive ? 700 : 600, display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      {cat.name}
                    </div>
                    {cat.subcategories?.length > 0 && (
                      <div 
                        style={{ padding: '0.75rem', display: 'flex', alignItems: 'center' }}
                      >
                        {isOpen ? <ChevronDown size={14} color="#94a3b8" /> : <ChevronRight size={14} color="#94a3b8" />}
                      </div>
                    )}
                  </div>
                  {isOpen && cat.subcategories?.length > 0 && (
                    <div style={{ padding: '0 0 0.5rem', backgroundColor: '#fafafa' }}>
                      {cat.subcategories.map((child) => (
                        <Link 
                          key={child.id} 
                          to={`/catalogo?cat=${encodeURIComponent(cat.slug)}&sub=${encodeURIComponent(child.slug)}`} 
                          style={{ display: 'block', padding: '0.4rem 1.1rem 0.4rem 2.2rem', color: '#64748b', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 500 }}
                        >
                          {child.name}
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
           <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.85rem 1.1rem', borderBottom: '1px solid #f1f5f9', fontWeight: 800, color: '#0b2e59', fontSize: '0.9rem' }}>
            <DollarSign size={16} /> RANGO DE PRECIO
          </div>
          <div style={{ padding: '0.5rem 1.1rem 0.9rem' }}>
            {priceRanges.map((range) => (
              <label key={range} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.4rem 0', fontSize: '0.85rem', color: '#475569', cursor: 'pointer', fontWeight: 500 }}>
                <input type="checkbox" style={{ accentColor: '#0b2e59' }} />
                {range}
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="home-market-main-area" style={{ minWidth: 0 }}>
        
        {/* Compact Featured Section */}
        <div className="featured-compact-banner">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0b2e59', marginBottom: '0.15rem' }}>
                {activeCategory ? activeCategory.name : 'Lo más buscado esta semana'}
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 500 }}>
                {activeCategory ? `Inventario disponible en ${activeCategory.name}` : 'Productos seleccionados con entrega prioritaria.'}
              </p>
            </div>
            {activeCategory && (
              <button onClick={clearFilter} style={{ fontSize: '0.8rem', color: '#0b2e59', fontWeight: 700, background: '#f1f5f9', border: 'none', padding: '0.5rem 0.9rem', borderRadius: '10px', cursor: 'pointer' }}>
                Ver Todo
              </button>
            )}
          </div>
        </div>

        {/* Compact Product Grid */}
        {loadingProds ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10rem 0', gap: '1rem', backgroundColor: 'white', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
            <Loader2 className="animate-spin" size={40} color="#0b2e59" />
            <p style={{ color: '#64748b', fontWeight: 600, fontSize: '1rem' }}>Sincronizando productos exclusivos...</p>
          </div>
        ) : (
          <div className="product-grid-compact">
            {displayProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        </div>
      </main>
    </div>
  );
};

const Home = () => {
  const { user } = useAuth();
  return <div className="home-container-wrapper" style={{ paddingTop: '2rem' }}>{user ? <AuthenticatedHome /> : <PublicHome />}</div>;
};

export default Home;
