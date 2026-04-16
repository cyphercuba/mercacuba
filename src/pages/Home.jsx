import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Truck, MessageCircle, Tag, DollarSign, ChevronDown, ChevronRight, ShieldCheck, Clock, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getCategories, getProducts } from '../lib/catalog';
import ProductCard from '../components/ProductCard';
import { fullHierarchyFallback, publicCatalogCats } from '../data/catalogFallback';

const priceRanges = ['Menos de US$25', 'US$25 a US$50', 'US$50 a US$100', 'US$100 a US$250', 'Más de US$250'];

const filterCardStyle = {
  backgroundColor: 'white',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
  overflow: 'hidden',
};

const PublicHome = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await getProducts({ featured: true, limit: 4 });
        if (res.ok) setFeaturedProducts(res.products || []);
      } catch (err) {
        console.error("Error fetching featured for public home", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  const premiumCats = [
    { name: 'Cárnicos', slug: 'carnicos', img: '/assets/categories/carnicos.png' },
    { name: 'Huevos & Lácteos', slug: 'huevos-lacteos', img: '/assets/categories/huevos-lacteos.png' },
    { name: 'Despensa', slug: 'despensa', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2000&auto=format&fit=crop' },
    { name: 'Aseo & Cuidado', slug: 'aseo-cuidado-personal', img: '/assets/categories/aseo-cuidado-personal.png' },
    { name: 'Combos Familiares', slug: 'combos', img: '/assets/reference/categories/combos.png' },
    { name: 'Dulces & Helados', slug: 'dulces-helados', img: '/assets/categories/dulces-helados.png' },
    { name: 'Electrodomésticos', slug: 'electrodomesticos', img: '/assets/categories/electrodomesticos.png' },
    { name: 'Bebidas & Licores', slug: 'bebidas', img: '/assets/categories/bebidas.png' },
    { name: 'Agro', slug: 'agro', img: '/assets/categories/agro.png' },
    { name: 'Farmacia', slug: 'farmacia', img: '/assets/categories/farmacia.png' },
    { name: 'Ferretería', slug: 'ferreteria', img: '/assets/categories/ferreteria.png' },
    { name: 'Hogar & Confort', slug: 'hogar-mobiliario', img: '/assets/categories/hogar-mobiliario.png' },
    { name: 'Pescados & Mariscos', slug: 'pescados-mariscos', img: '/assets/categories/pescados-mariscos.png' },
    { name: 'Cenas & Bufets', slug: 'cenas-bufets', img: '/assets/categories/cenas-bufets.png' },
    { name: 'Comida Rápida', slug: 'alimentos-preelaborados', img: '/assets/categories/alimentos-preelaborados.png' },
    { name: 'Limpieza', slug: 'limpieza-utiles', img: '/assets/categories/limpieza-utiles.png' },
    { name: 'Regalos', slug: 'regalos', img: '/assets/categories/regalos.png' },
    { name: 'Piezas & Accesorios', slug: 'piezas-accesorios', img: '/assets/categories/piezas-accesorios.png' },
    { name: 'Infantiles & Escolar', slug: 'infantiles-escolares', img: '/assets/categories/infantiles-escolares.png' },
    { name: 'Moda & Accesorios', slug: 'moda-accesorios', img: '/assets/categories/moda-accesorios.png' },
    { name: 'Para el Bebé', slug: 'bebe', img: '/assets/categories/bebe.png' },
    { name: 'Más Categorías', slug: 'otros', img: '/assets/categories/otros.png' },
  ];

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
      {/* 1. CATALOG ONLY */}
      {/* 1. CIRCULAR CATALOG */}
      <section style={{ padding: '0 1rem' }}>
        <div className="catalog-grid">
          {premiumCats.map((cat, i) => (
            <Link key={i} to={`/cuenta`} className="catalog-card">
              <div className="catalog-card-image-container">
                <img src={cat.img} alt={cat.name} />
              </div>
              <h4 className="catalog-card-title">{cat.name}</h4>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

const AuthenticatedHome = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [loadingProds, setLoadingProds] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isCatMenuOpen, setIsCatMenuOpen] = useState(false);

  useEffect(() => {
    async function loadInitialData() {
      setLoadingCats(true);
      try {
        const catRes = await getCategories();
        if (catRes.ok) setCategories(catRes.categories || []);
      } catch (err) {
        console.error("Error loading categories", err);
      } finally {
        setLoadingCats(false);
      }

      setLoadingProds(true);
      try {
        const prodRes = await getProducts({ featured: true, limit: 12 });
        if (prodRes.ok) setProducts(prodRes.products || []);
      } catch (err) {
        console.error("Error loading products", err);
      } finally {
        setLoadingProds(false);
      }
    }
    loadInitialData();
  }, []);

  const handleCategoryClick = async (category) => {
    setActiveCategory(category);
    setIsCatMenuOpen(false);
    setLoadingProds(true);
    try {
      const prodRes = await getProducts({ category: category.slug, limit: 12 });
      if (prodRes.ok) setProducts(prodRes.products || []);
    } catch (err) {
      console.error("Error loading category products", err);
    } finally {
      setLoadingProds(false);
    }
  };

  const clearFilter = async () => {
    setActiveCategory(null);
    setIsCatMenuOpen(false);
    setLoadingProds(true);
    try {
      const prodRes = await getProducts({ featured: true, limit: 12 });
      if (prodRes.ok) setProducts(prodRes.products || []);
    } catch (err) {
      console.error("Error resetting filters", err);
    } finally {
      setLoadingProds(false);
    }
  };

  const displayProducts = (products?.length > 0) ? products : [
    { id: 'f1', name: 'Producto en Espera', price: 0.00, image_url: null, category_name: 'Catálogo' },
    { id: 'f2', name: 'Novedad Próximamente', price: 0.00, image_url: null, category_name: 'Catálogo' },
  ];
  const displayCategories = (categories?.length > 0) ? categories : fullHierarchyFallback;

  return (
    <div className="authenticated-home-grid">
      <main className="home-market-main-area">
        
        {/* Horizontal Category Navigator */}
        <div style={{ position: 'relative', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setIsCatMenuOpen(!isCatMenuOpen)}
              className="luxury-card"
              style={{ padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800, color: '#0b2e59', cursor: 'pointer', border: '1px solid #e2e8f0' }}
            >
              Categorías {isCatMenuOpen ? <ChevronDown size={18} style={{ transform: 'rotate(180deg)', transition: 'transform 0.3s' }} /> : <ChevronDown size={18} style={{ transition: 'transform 0.3s' }} />}
            </button>

            {isCatMenuOpen && (
              <div 
                className="glass-card"
                style={{ position: 'absolute', top: 'calc(100% + 10px)', left: 0, width: '280px', maxHeight: '450px', overflowY: 'auto', zIndex: 100, borderRadius: '20px', padding: '0.75rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
              >
                <div 
                  onClick={clearFilter}
                  style={{ padding: '0.75rem 1rem', borderRadius: '12px', cursor: 'pointer', fontWeight: 700, color: !activeCategory ? '#0b2e59' : '#64748b', backgroundColor: !activeCategory ? '#f1f5f9' : 'transparent', marginBottom: '4px' }}
                >
                  Todas las categorías
                </div>
                {displayCategories.map(cat => (
                  <div 
                    key={cat.id} 
                    onClick={() => handleCategoryClick(cat)}
                    style={{ padding: '0.75rem 1rem', borderRadius: '12px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', color: activeCategory?.id === cat.id ? '#0b2e59' : '#1e293b', backgroundColor: activeCategory?.id === cat.id ? '#f1f5f9' : 'transparent', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    {cat.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {activeCategory && (
            <div style={{ backgroundColor: '#0b2e59', color: 'white', padding: '0.5rem 1rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              {activeCategory.name}
              <button onClick={clearFilter} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex' }}>
                &times;
              </button>
            </div>
          )}
        </div>

        {/* Featured / Results Header */}
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
          </div>
        </div>

        {/* Product Grid */}
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
      </main>
    </div>
  );
};

const Home = () => {
  const { user } = useAuth();
  return <div className="home-container-wrapper" style={{ paddingTop: '2rem' }}>{user ? <AuthenticatedHome /> : <PublicHome />}</div>;
};

export default Home;
