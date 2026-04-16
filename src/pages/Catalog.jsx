import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../lib/catalog';
import { Search, Filter, Loader2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const activeCategory = searchParams.get('cat');
  const activeSubcategory = searchParams.get('sub');
  const searchQuery = searchParams.get('q') || '';
  
  const [searchInput, setSearchInput] = useState(searchQuery);

  useEffect(() => {
    async function fetchFilteredProducts() {
      setLoading(true);
      const res = await getProducts({
        category: activeCategory,
        subcategory: activeSubcategory,
        q: searchQuery
      });
      if (res.ok) {
        setProducts(res.products);
      }
      setLoading(false);
    }
    fetchFilteredProducts();
  }, [activeCategory, activeSubcategory, searchQuery]);

  const fallbackProducts = [
    { id: 'f1', name: 'Combo Familiar Premium', price: 85.00, image_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&h=300', category_name: 'Alimentos' },
    { id: 'f2', name: 'Caja de Pollo 40lb', price: 45.00, image_url: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=400&h=300', category_name: 'Carnes' },
    { id: 'f3', name: 'Split 1 Tonelada Royal', price: 350.00, image_url: 'https://images.unsplash.com/photo-1626806787426-5910811b6325?auto=format&fit=crop&w=400&h=300', category_name: 'Electro' },
    { id: 'f4', name: 'Aceite Vegetal 5L', price: 18.50, image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&h=300', category_name: 'Alimentos' }
  ];

  const isFiltering = activeCategory || activeSubcategory || searchQuery;
  const displayProducts = (products.length === 0 && !isFiltering) ? fallbackProducts : products;

  return (
    <div className="container" style={{ padding: 'var(--spacing-8) var(--spacing-4)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--spacing-8)' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0b2e59', marginBottom: '0.5rem' }}>
            Nuestro Catálogo
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 500 }}>
            {activeCategory ? `Filtrando por: ${activeCategory}` : 'Selección de productos premium para envíos a Cuba.'}
            {activeSubcategory && ` / ${activeSubcategory}`}
          </p>
        </div>
      </div>
      
      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4" style={{ marginBottom: 'var(--spacing-8)' }}>
        <div style={{ display: 'flex', backgroundColor: 'white', borderRadius: '16px', padding: '0.6rem 1.25rem', alignItems: 'center', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)', flex: 1 }}>
          <Search color="#64748b" size={20} style={{ marginRight: '0.75rem' }} />
          <input 
            type="text" 
            placeholder="¿Qué buscas para tu familia? Ej: Pollo, Split, Aceite..." 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const newParams = new URLSearchParams(searchParams);
                if (searchInput.trim()) newParams.set('q', searchInput);
                else newParams.delete('q');
                setSearchParams(newParams);
              }
            }}
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '1.05rem', color: '#0f172a', fontWeight: 500 }}
          />
          <button 
            onClick={() => {
              const newParams = new URLSearchParams(searchParams);
              if (searchInput.trim()) newParams.set('q', searchInput);
              else newParams.delete('q');
              setSearchParams(newParams);
            }}
            style={{ background: '#0b2e59', color: 'white', border: 'none', borderRadius: '12px', padding: '0.6rem 1.5rem', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', marginLeft: '0.5rem', transition: 'transform 0.2s' }}
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10rem 0', gap: '1rem' }}>
          <Loader2 className="animate-spin" size={56} color="#0b2e59" />
          <p style={{ color: '#64748b', fontWeight: 600, fontSize: '1.1rem' }}>Sincronizando productos...</p>
        </div>
      ) : displayProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {displayProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '8rem 2rem', backgroundColor: '#f8fafc', borderRadius: '24px', border: '2px dashed #e2e8f0' }}>
          <Filter size={64} style={{ margin: '0 auto 1.5rem', opacity: 0.15, color: '#0b2e59' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Búsqueda sin resultados</h3>
          <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '1.05rem', maxWidth: '400px', margin: '0 auto 2rem' }}>No encontramos productos que coincidan con tu búsqueda actual.</p>
          <button 
            className="btn" 
            style={{ backgroundColor: '#0b2e59', color: 'white', padding: '1rem 2.5rem', borderRadius: '14px', fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(11, 46, 89, 0.2)' }}
            onClick={() => { setSearchInput(''); setSearchParams({}); }}
          >
            Ver catálogo completo
          </button>
        </div>
      )}
    </div>
  );
};

export default Catalog;
