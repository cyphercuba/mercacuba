import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Truck, MessageCircle, Tag, DollarSign, ChevronDown, ChevronRight, ShieldCheck, Clock, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getCategories, getProducts } from '../lib/catalog';
import ProductCard from '../components/ProductCard';

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
          setCategories(catRes.categories);
          const initialOpen = {};
          catRes.categories.slice(0, 3).forEach(c => {
            if (c.subcategories?.length > 0) initialOpen[c.id] = true;
          });
          setOpenCategories(initialOpen);
        }
      } catch (err) {
        console.error("Error loading categories", err);
      } finally {
        setLoadingCats(false);
      }

      setLoadingProds(true);
      try {
        const prodRes = await getProducts({ featured: true, limit: 8 });
        if (prodRes.ok) {
          setProducts(prodRes.products);
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
        setProducts(prodRes.products);
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
      const prodRes = await getProducts({ featured: true, limit: 8 });
      if (prodRes.ok) {
        setProducts(prodRes.products);
      }
    } catch (err) {
      console.error("Error resetting filters", err);
    } finally {
      setLoadingProds(false);
    }
  };

  const fallbackProducts = [
    { id: 'f1', name: 'Combo Familiar Premium', price: 85.00, image_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&h=300', category_name: 'Alimentos' },
    { id: 'f2', name: 'Caja de Pollo 40lb', price: 45.00, image_url: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=400&h=300', category_name: 'Carnes' },
    { id: 'f3', name: 'Split 1 Tonelada Royal', price: 350.00, image_url: 'https://images.unsplash.com/photo-1626806787426-5910811b6325?auto=format&fit=crop&w=400&h=300', category_name: 'Electro' },
    { id: 'f4', name: 'Aceite Vegetal 5L', price: 18.50, image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&h=300', category_name: 'Alimentos' }
  ];

  const displayProducts = products.length > 0 ? products : fallbackProducts;

  return (
    <div className="home-market-layout" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', width: '100%' }}>
        
        {/* Sidebar as a top bar or side bar based on width */}
        <aside className="home-categories-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={filterCardStyle}>
            <div style={{ backgroundColor: '#0b2e59', color: 'white', padding: '1rem 1.1rem', fontWeight: 800, fontSize: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Categorías</span>
              {loadingCats && <Loader2 className="animate-spin" size={16} />}
            </div>
            <div style={{ padding: '0.35rem 0', maxHeight: '420px', overflowY: 'auto' }}>
              {categories.length > 0 ? categories.map((cat) => {
                const isOpen = !!openCategories[cat.id];
                const isActive = activeCategory?.id === cat.id;
                return (
                  <div key={cat.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: isActive ? '#f8fafc' : 'transparent' }}>
                      <button 
                        type="button" 
                        onClick={() => handleCategoryClick(cat)}
                        style={{ flexGrow: 1, padding: '0.82rem 0 0.82rem 1.1rem', color: isActive ? '#0b2e59' : '#0f172a', background: 'none', border: 'none', fontSize: '0.95rem', cursor: 'pointer', textAlign: 'left', fontWeight: isActive ? 700 : 500 }}
                      >
                        {cat.name}
                      </button>
                      {cat.subcategories?.length > 0 && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleCategory(cat.id); }}
                          style={{ padding: '0.82rem 1.1rem', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          {isOpen ? <ChevronDown size={16} color="#64748b" /> : <ChevronRight size={16} color="#64748b" />}
                        </button>
                      )}
                    </div>
                  </div>
                );
              }) : (
                <div style={{ padding: '1rem', color: '#64748b', fontSize: '0.85rem', textAlign: 'center' }}>Cargando catálogo...</div>
              )}
            </div>
          </div>
        </aside>

        <main className="home-main-content" style={{ gridColumn: 'span 2' }}>
          <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '24px', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0b2e59', marginBottom: '0.4rem' }}>
                  {activeCategory ? activeCategory.name : 'Lo más buscado esta semana'}
                </h2>
                <p style={{ color: '#64748b', fontSize: '1rem', fontWeight: 500 }}>
                  {activeCategory ? `Productos seleccionados en ${activeCategory.name}` : 'Descubre las mejores ofertas para enviar a Cuba hoy.'}
                </p>
              </div>
              {activeCategory && (
                <button onClick={clearFilter} style={{ fontSize: '0.9rem', color: '#0b2e59', fontWeight: 700, background: '#f1f5f9', border: 'none', padding: '0.6rem 1rem', borderRadius: '12px', cursor: 'pointer' }}>
                  Ver destacados
                </button>
              )}
            </div>

            {loadingProds ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8rem 0', gap: '1rem' }}>
                <Loader2 className="animate-spin" size={48} color="#0b2e59" />
                <p style={{ color: '#64748b', fontWeight: 500 }}>Sincronizando inventario...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {displayProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                
                {products.length === 0 && !activeCategory && (
                  <div style={{ marginTop: '2.5rem', padding: '1.5rem', backgroundColor: '#f0fdf4', borderRadius: '16px', border: '1px solid #dcfce7', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ backgroundColor: '#22c55e', color: 'white', padding: '0.6rem', borderRadius: '12px' }}>
                      <Tag size={20} />
                    </div>
                    <div>
                      <h4 style={{ color: '#166534', fontWeight: 800, fontSize: '0.95rem' }}>Bienvenido a MercadoCuba</h4>
                      <p style={{ color: '#15803d', fontSize: '0.85rem', marginBottom: 0 }}>Estamos actualizando nuestro inventario en tiempo real. ¡Pronto verás más opciones!</p>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Info banners inside main card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginTop: '3rem' }}>
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
        </main>
      </div>
    </div>
  );
};

const Home = () => {
  const { user } = useAuth();
  return <div>{user ? <AuthenticatedHome /> : <PublicHome />}</div>;
};

export default Home;
