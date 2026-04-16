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

  return (
    <div className="container" style={{ padding: 'var(--spacing-8) var(--spacing-4)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--spacing-8)' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0b2e59', marginBottom: '0.5rem' }}>
            Catálogo de Productos
          </h1>
          <p style={{ color: '#64748b' }}>
            {activeCategory ? `Filtrando por: ${activeCategory}` : 'Explora nuestra amplia variedad de productos'}
            {activeSubcategory && ` / ${activeSubcategory}`}
          </p>
        </div>
      </div>
      
      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4" style={{ marginBottom: 'var(--spacing-8)' }}>
        
        {/* Search Bar */}
        <div style={{ display: 'flex', backgroundColor: 'white', borderRadius: '16px', padding: '0.5rem 1.25rem', alignItems: 'center', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', flex: 1 }}>
          <Search color="#64748b" size={20} style={{ marginRight: '0.75rem' }} />
          <input 
            type="text" 
            placeholder="Buscar por nombre, descripción..." 
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
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '1rem', color: '#0f172a' }}
          />
          <button 
            onClick={() => {
              const newParams = new URLSearchParams(searchParams);
              if (searchInput.trim()) newParams.set('q', searchInput);
              else newParams.delete('q');
              setSearchParams(newParams);
            }}
            style={{ background: '#0b2e59', color: 'white', border: 'none', borderRadius: '10px', padding: '0.4rem 1rem', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', marginLeft: '0.5rem' }}
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10rem 0', gap: '1rem' }}>
          <Loader2 className="animate-spin" size={48} color="#0b2e59" />
          <p style={{ color: '#64748b', fontWeight: 500 }}>Cargando catálogo...</p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '8rem 2rem', backgroundColor: '#f8fafc', borderRadius: '16px', border: '2px dashed #e2e8f0' }}>
          <Filter size={64} style={{ margin: '0 auto var(--spacing-4)', opacity: 0.2, color: '#0b2e59' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem' }}>No se encontraron productos</h3>
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Prueba con otros términos de búsqueda o elimina los filtros para ver más resultados.</p>
          <button 
            className="btn" 
            style={{ backgroundColor: '#0b2e59', color: 'white', padding: '0.75rem 2rem', borderRadius: '12px', fontWeight: 600, border: 'none', cursor: 'pointer' }}
            onClick={() => { setSearchInput(''); setSearchParams({}); }}
          >
            Limpiar Filtros
          </button>
        </div>
      )}
    </div>
  );
};

export default Catalog;

